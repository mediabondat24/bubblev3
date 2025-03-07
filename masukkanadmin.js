// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { TikTokConnectionWrapper, getGlobalConnectionCount } = require('./connectionWrapper');
const { clientBlocked } = require('./limiter');
const bcrypt = require('bcryptjs');
const app = express();
const httpServer = createServer(app);
const uploadDir = path.join(__dirname, 'public', 'uploads', 'images');
app.use(express.json()); // Menggunakan middleware built-in dari Express
app.use(express.urlencoded({ extended: true })); // Menggunakan middleware built-in dari Express

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET,  // Menggunakan nilai dari .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Jangan lupa set ke `true` jika menggunakan HTTPS
}));

// Enable cross-origin resource sharing (CORS)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

// Database connection setup
function createConnection() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Event handler for database error
    db.on('error', (err) => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Lost connection to database. Reconnecting...');
            createConnection(); // Retry connection
        } else {
            throw err; // For other errors, throw exception
        }
    });

    // Attempt to connect to the database
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(createConnection, 2000); // Retry after 2 seconds
        } else {
            console.log('Database connected.');
        }
    });

    return db;
}


// Membuat password yang di-hash
const password = 'admin_password';  // Gantilah dengan password yang diinginkan
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    // Setelah password di-hash, kamu bisa memasukkan admin baru ke database
    db.query("INSERT INTO admins (nama, whatsapp, username, password, role) VALUES (?, ?, ?, ?, ?)", 
        ['Raifas Kreatif Agency', '082334810232', 'Raifa', Banyuwangi2025@#$, 'superadmin'], 
        (err, results) => {
            if (err) {
                console.error('Error inserting admin:', err);
                return;
            }
            console.log('Admin added successfully');
        });
});
