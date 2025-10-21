CREATE DATABASE techno_spark;
USE techno_spark;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE business_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    business_name VARCHAR(200),
    industry VARCHAR(100),
    country VARCHAR(100),
    stage ENUM('idea', 'validation', 'early', 'growth'),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE analyses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    analysis_type VARCHAR(50),
    data JSON,
    results JSON,
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);