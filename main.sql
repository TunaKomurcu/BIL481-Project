CREATE DATABASE IF NOT EXISTS main;
USE main;

SET SQL_SAFE_UPDATES = 0;


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_mail VARCHAR(100) ,  
    user_total INT,
    user_r_t INT,
    user_maturity INT
);


CREATE TABLE IF NOT EXISTS user_output (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_mail VARCHAR(100) NOT NULL,
    user_pdf_link TEXT,
    user_recommendation TEXT,
    FOREIGN KEY (user_mail) REFERENCES users(user_mail) ON DELETE CASCADE
);
ALTER TABLE user_output ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE user_output ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
SHOW TABLES;

SELECT * FROM users;
SELECT * FROM user_output;

