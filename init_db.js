const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});


connection.connect((err) => {
    if (err) {
        console.error('Error while connecting to the server.', err);
        return;
    }
    console.log('Connected to database MySQL.');

   
    connection.query('CREATE DATABASE IF NOT EXISTS touristic_website', (err) => {
        if (err) {
            console.error('Error while creating the database', err);
            return;
        }
        console.log('Η The database was succesfully created.');

        connection.changeUser({database: 'touristic_website'}, (err) => {
            if (err) {
                console.error('Error while changing data', err);
                return;
            }

            
            const createVisitorsTable = `
                CREATE TABLE IF NOT EXISTS visitors (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            connection.query(createVisitorsTable, (err) => {
                if (err) {
                    console.error('Error while creating the table visitors:', err);
                    return;
                }
                console.log('Table visitors created succesfully.');
            });

            // Δημιουργία πίνακα users
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    sex ENUM('male', 'female') NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            connection.query(createUsersTable, (err) => {
                if (err) {
                    console.error('Error while creating the table users:', err);
                    return;
                }
                console.log('Table users created succesfully or already exists.');
            });
        });
    });
});
