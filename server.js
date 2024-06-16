const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/plan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'plan.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// API Route for Login
app.post('/api/login', (req, res) => {
    const { username, password, sex } = req.body;
    console.log('Login Request Data:', req.body); // Log request data for debugging
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ? AND sex = ?';
    connection.query(sql, [username, password, sex], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ success: false, message: 'Server error' });
            return;
        }
        if (results.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
