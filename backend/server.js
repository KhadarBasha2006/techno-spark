const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techno_spark'
});

// User registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if user exists
        const [users] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const [result] = await db.promise().query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        
        const token = jwt.sign({ userId: result.insertId }, JWT_SECRET);
        res.json({ token, user: { id: result.insertId, name, email } });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const [users] = await db.promise().query('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.userId]);
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.userId = user.userId;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});