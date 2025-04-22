// server.js
require('dotenv').config();
const express = require('express');
const moment = require('moment'); // Pastikan moment.js telah diinstal
const mysql = require('mysql2');
const session = require('express-session');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');  // Import fs
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { TikTokConnectionWrapper, getGlobalConnectionCount } = require('./connectionWrapper');
const { clientBlocked } = require('./limiter');
const bcrypt = require('bcryptjs');
const app = express();
const httpServer = createServer(app);
const uploadDir = path.join(__dirname, 'public', 'uploads', 'images');
const imageUploadDir = path.join(__dirname, 'public', 'uploads', 'images');
const audioUploadDir = path.join(__dirname, 'public', 'uploads', 'audio');
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
        origin: 'https://bubblephoto.online'
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

const db = createConnection();

setInterval(() => {
    io.emit('statistic', { globalConnectionCount: getGlobalConnectionCount() });
}, 5000);

// Serve frontend files
app.use(express.static('public'));

// Route to home page (login page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page-login.html'));
});

// Route for register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page-register.html'));
});

// Route for login page (just in case)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page-login.html'));
});
app.get('/masuk-pak', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'masuk-pak.html'));
});

app.get('/daftar-pak', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'daftar-pak.html'));
});

// Handle new WebSocket connections (TikTok Stream)
io.on('connection', (socket) => {
    let tiktokConnectionWrapper;

    console.info('New connection from origin', socket.handshake.headers['origin'] || socket.handshake.headers['referer']);

    socket.on('setUniqueId', (uniqueId, options) => {
        // Clean options for security
        if (typeof options === 'object' && options) {
            delete options.requestOptions;
            delete options.websocketOptions;
        } else {
            options = {};
        }

        // Use sessionId if provided in .env
        if (process.env.SESSIONID) {
            options.sessionId = process.env.SESSIONID;
            console.info('Using SessionId');
        }

        // Check rate limit
        if (process.env.ENABLE_RATE_LIMIT && clientBlocked(io, socket)) {
            socket.emit('tiktokDisconnected', 'You have opened too many connections or made too many connection requests. Please reduce the number of connections/requests.');
            return;
        }

        // Connect to TikTok stream
        try {
            tiktokConnectionWrapper = new TikTokConnectionWrapper(uniqueId, options, true);
            tiktokConnectionWrapper.connect();
        } catch (err) {
            socket.emit('tiktokDisconnected', err.toString());
            return;
        }

        // Handle TikTok stream events
        tiktokConnectionWrapper.once('connected', state => socket.emit('tiktokConnected', state));
        tiktokConnectionWrapper.once('disconnected', reason => socket.emit('tiktokDisconnected', reason));

        // Redirect messages
        tiktokConnectionWrapper.connection.on('streamEnd', () => socket.emit('streamEnd'));
        tiktokConnectionWrapper.connection.on('roomUser', msg => socket.emit('roomUser', msg));
        tiktokConnectionWrapper.connection.on('member', msg => socket.emit('member', msg));
        tiktokConnectionWrapper.connection.on('chat', msg => socket.emit('chat', msg));
        tiktokConnectionWrapper.connection.on('gift', msg => socket.emit('gift', msg));
        tiktokConnectionWrapper.connection.on('social', msg => socket.emit('social', msg));
        tiktokConnectionWrapper.connection.on('like', msg => socket.emit('like', msg));
        tiktokConnectionWrapper.connection.on('questionNew', msg => socket.emit('questionNew', msg));
        tiktokConnectionWrapper.connection.on('linkMicBattle', msg => socket.emit('linkMicBattle', msg));
        tiktokConnectionWrapper.connection.on('linkMicArmies', msg => socket.emit('linkMicArmies', msg));
        tiktokConnectionWrapper.connection.on('liveIntro', msg => socket.emit('liveIntro', msg));
        tiktokConnectionWrapper.connection.on('emote', msg => socket.emit('emote', msg));
        tiktokConnectionWrapper.connection.on('envelope', msg => socket.emit('envelope', msg));
        tiktokConnectionWrapper.connection.on('subscribe', msg => socket.emit('subscribe', msg));
    });

    socket.on('disconnect', () => {
        if (tiktokConnectionWrapper) {
            tiktokConnectionWrapper.disconnect();
        }
    });
});

// Emit global connection statistics


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Menggunakan folder public/uploads/images/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname).toLowerCase());  // Nama file dengan timestamp
    }
});

// Filter file berdasarkan tipe MIME dan ekstensi file
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpg|jpeg|png|gif/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, JPEG, PNG, GIF are allowed.'));
        }
    }
});




// Route untuk handle registration
app.post('/register', async (req, res) => {
    const { nama, whatsapp, jenis_anggota, username_tiktok1, paket, payment_method } = req.body;

    let harga = 0;
    let masaAktif = 0;
    if (paket === '1') {
        harga = 50000;
        masaAktif = 1; // 1 Bulan
    } else if (paket === '2') {
        harga = 100000;
        masaAktif = 3; // 3 Bulan
    }

    
let paymentData = {
    merchant_code: process.env.TRIPAY_MERCHANT_CODE,
    order_ref: 'ORDER_' + Date.now(),  // Generate order_ref unik
    amount: harga,
    payment_type: payment_method,  // Menggunakan payment_type sesuai pilihan
    customer_name: nama,
    customer_email: '',
    customer_phone: whatsapp,
    callback_url: process.env.TRIPAY_CALLBACK_URL,  // URL callback untuk menerima pembayaran
};

// Hanya menambahkan 'method' jika pembayaran menggunakan metode tertentu
if (['OVO', 'DANA', 'QRIS', 'SHOPEEPAY'].includes(payment_method)) {
    paymentData.method = payment_method;
}

const tripayRequest = {
    method: 'POST',
    url: 'https://tripay.co.id/api-sandbox/transaction/create',
    headers: {
        'Authorization': `Bearer ${process.env.TRIPAY_API_KEY}`,
        'Content-Type': 'application/json',
    },
    data: paymentData,
};

try {
    const tripayResponse = await axios(tripayRequest);

    // Simpan data pendaftaran pengguna dan order tripay ke database
    const sql = 'INSERT INTO users (nama, whatsapp, jenis_anggota, username_tiktok1, status, paket, harga, masa_aktif, tripay_order_ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nama, whatsapp, jenis_anggota, username_tiktok1, 'Tidak Aktif', paket, harga, masaAktif, tripayResponse.data.data.order_ref], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Error registering user.' });
        }

        // Mengembalikan URL pembayaran Tripay untuk redirect
        return res.json({
            success: true,
            message: 'Registration successful. Please proceed to payment.',
            paymentUrl: tripayResponse.data.data.payment_url, // URL pembayaran dari Tripay
        });
    });
} catch (error) {
    console.error('Tripay API error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ success: false, message: 'Error with payment gateway.' });
}

});





app.post('/payment/callback', (req, res) => {
    const { order_ref, status_code, status_message } = req.body;

    // Jika status pembayaran sukses
    if (status_code === '00') {
        const updateSql = 'UPDATE users SET status = "Aktif", activated_at = NOW(), expired_at = DATE_ADD(NOW(), INTERVAL 1 MONTH) WHERE tripay_order_ref = ?';
        db.query(updateSql, [order_ref], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error updating payment status' });
            }
            res.json({ success: true, message: 'Payment successful. User activated.' });
        });
    } else {
        res.status(400).json({ success: false, message: 'Payment failed' });
    }
});


const settingsUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if (ext === '.mp3') {
                cb(null, audioUploadDir);
            } else {
                cb(null, imageUploadDir);
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowed = /\.(jpg|jpeg|png|gif|mp3)$/i;
        allowed.test(ext) ? cb(null, true) : cb(new Error('Format file tidak didukung.'));
    }
}).fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'mp3File', maxCount: 1 },
    { name: 'mp3GiftKecil', maxCount: 1 },
    { name: 'mp3GiftSedang', maxCount: 1 },
    { name: 'mp3GiftSuperSedang', maxCount: 1 },
    { name: 'mp3GiftBesar', maxCount: 1 },
    { name: 'mp3GiftSuperBesar', maxCount: 1 },
    { name: 'mp3GiftLuarBiasa', maxCount: 1 }
]);

// API simpan setting
app.post('/api/save-settings', (req, res) => {
    if (!req.session.user?.id) {
        return res.status(401).json({ message: 'Anda belum login.' });
    }

    const userId = req.session.user.id;

    settingsUpload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Upload file gagal.' });
        }

        const newYoutubeLink = req.body.youtubeLink?.trim();
        const newBackgroundImage = req.files['backgroundImage']?.[0]?.filename;
        const newMp3File = req.files['mp3File']?.[0]?.filename;
        const newMp3GiftKecil = req.files['mp3GiftKecil']?.[0]?.filename;
        const newMp3GiftSedang = req.files['mp3GiftSedang']?.[0]?.filename;
        const newMp3GiftSuperSedang = req.files['mp3GiftSuperSedang']?.[0]?.filename;
        const newMp3GiftBesar = req.files['mp3GiftBesar']?.[0]?.filename;
        const newMp3GiftSuperBesar = req.files['mp3GiftSuperBesar']?.[0]?.filename;
        const newMp3GiftLuarBiasa = req.files['mp3GiftLuarBiasa']?.[0]?.filename;

        const selectSql = 'SELECT * FROM setting WHERE user_id = ?';
        db.query(selectSql, [userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Gagal membaca data lama.' });
            }

            const existing = results[0] || {};

            // Gunakan data lama jika tidak ada input baru
            const finalYoutubeLink = newYoutubeLink || existing.youtube_link || '';
            const finalBackgroundImage = newBackgroundImage || existing.background_image || '';
            const finalMp3File = newMp3File || existing.mp3_file || '';
            const finalMp3GiftKecil = newMp3GiftKecil || existing.mp3_gift_kecil || '';
            const finalMp3GiftSedang = newMp3GiftSedang || existing.mp3_gift_sedang || '';
            const finalMp3GiftSuperSedang = newMp3GiftSuperSedang || existing.mp3_gift_super_sedang || '';
            const finalMp3GiftBesar = newMp3GiftBesar || existing.mp3_gift_besar || '';
            const finalMp3GiftSuperBesar = newMp3GiftSuperBesar || existing.mp3_gift_super_besar || '';
            const finalMp3GiftLuarBiasa = newMp3GiftLuarBiasa || existing.mp3_gift_luar_biasa || '';

            // Fungsi hapus file lama jika ada yang baru
            const deleteOldFile = (filename, type) => {
                if (!filename) return;
                const dir = type === 'mp3' ? audioUploadDir : imageUploadDir;
                const fullPath = path.join(dir, filename);
                if (fs.existsSync(fullPath)) {
                    fs.unlink(fullPath, (err) => {
                        if (err) console.warn('Gagal hapus file lama:', fullPath);
                    });
                }
            };

            // Hapus file lama hanya jika file baru dikirim
            if (newBackgroundImage && existing.background_image) {
                deleteOldFile(existing.background_image, 'image');
            }
            if (newMp3File && existing.mp3_file) {
                deleteOldFile(existing.mp3_file, 'mp3');
            }

            // Hapus file untuk Gift MP3 jika ada yang baru
            if (newMp3GiftKecil && existing.mp3_gift_kecil) deleteOldFile(existing.mp3_gift_kecil, 'mp3');
            if (newMp3GiftSedang && existing.mp3_gift_sedang) deleteOldFile(existing.mp3_gift_sedang, 'mp3');
            if (newMp3GiftSuperSedang && existing.mp3_gift_super_sedang) deleteOldFile(existing.mp3_gift_super_sedang, 'mp3');
            if (newMp3GiftBesar && existing.mp3_gift_besar) deleteOldFile(existing.mp3_gift_besar, 'mp3');
            if (newMp3GiftSuperBesar && existing.mp3_gift_super_besar) deleteOldFile(existing.mp3_gift_super_besar, 'mp3');
            if (newMp3GiftLuarBiasa && existing.mp3_gift_luar_biasa) deleteOldFile(existing.mp3_gift_luar_biasa, 'mp3');

            const upsertSql = `
                INSERT INTO setting (user_id, youtube_link, background_image, mp3_file, mp3_gift_kecil, mp3_gift_sedang, mp3_gift_super_sedang, mp3_gift_besar, mp3_gift_super_besar, mp3_gift_luar_biasa)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    youtube_link = VALUES(youtube_link),
                    background_image = VALUES(background_image),
                    mp3_file = VALUES(mp3_file),
                    mp3_gift_kecil = VALUES(mp3_gift_kecil),
                    mp3_gift_sedang = VALUES(mp3_gift_sedang),
                    mp3_gift_super_sedang = VALUES(mp3_gift_super_sedang),
                    mp3_gift_besar = VALUES(mp3_gift_besar),
                    mp3_gift_super_besar = VALUES(mp3_gift_super_besar),
                    mp3_gift_luar_biasa = VALUES(mp3_gift_luar_biasa)
            `;

            const values = [
                userId, finalYoutubeLink, finalBackgroundImage, finalMp3File,
                finalMp3GiftKecil, finalMp3GiftSedang, finalMp3GiftSuperSedang, finalMp3GiftBesar, finalMp3GiftSuperBesar, finalMp3GiftLuarBiasa,
                finalYoutubeLink, finalBackgroundImage, finalMp3File,
                finalMp3GiftKecil, finalMp3GiftSedang, finalMp3GiftSuperSedang, finalMp3GiftBesar, finalMp3GiftSuperBesar, finalMp3GiftLuarBiasa
            ];

            db.query(upsertSql, values, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Gagal menyimpan pengaturan.' });
                }

                res.json({ message: 'Pengaturan berhasil diperbarui.' });
            });
        });
    });
});



app.post('/check-user', (req, res) => {
    const { nama, whatsapp } = req.body;

    // Query untuk mengecek apakah pengguna sudah terdaftar
    const sql = 'SELECT * FROM users WHERE nama = ? OR whatsapp = ?';
    db.query(sql, [nama, whatsapp], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error checking user' });
        }

        if (result.length > 0) {
            if (result[0].status === 'Aktif') {
                return res.json({ exists: true });
            } else {
                return res.json({ inactive: true });
            }
        }

        res.json({ exists: false });
    });
});

// Middleware untuk autentikasi berbasis session
// Middleware untuk autentikasi berbasis session
const isAuthenticated = (req, res, next) => {
    if (!req.session.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next(); // Lanjutkan jika pengguna terautentikasi
};



// Login Route (menggunakan session untuk menyimpan informasi pengguna)
app.post('/login', (req, res) => {
    const { whatsapp } = req.body;
    if (!whatsapp) return res.status(400).json({ message: "WhatsApp is required" });

    db.query("SELECT * FROM users WHERE whatsapp = ?", [whatsapp], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) {
            return res.status(404).json({ message: "Nomor WhatsApp tidak ditemukan. Daftar sekarang", redirectTo: "/register" });
        }

        const user = results[0];

        if (user.status !== "Aktif") {
            const message = `Hi Admin, saya sudah mendaftar aplikasi bubble photo, dengan status keanggotaan ${user.jenis_anggota} tolong segera aktifkan akun aplikasi bubble saya.`;
            return res.status(401).json({
                message: `Silakan hubungi Admin untuk mengaktifkan akun Anda.`,
                redirectTo: `https://wa.me/6282334810232?text=${encodeURIComponent(message)}`
            });
        }

        // ✅ Menyimpan informasi pengguna ke dalam session
        req.session.user = {
            id: user.id,
            nama: user.nama,
            jenis_anggota: user.jenis_anggota
        };

        res.json({ message: "Login successful" });
    });
});



// Endpoint untuk mendapatkan data pengguna berdasarkan session
// Endpoint untuk mendapatkan data pengguna berdasarkan session
app.get('/user-data', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;

    const sql = `
        SELECT 
            id, 
            nama, 
            whatsapp, 
            jenis_anggota, 
            username_tiktok1, 
            username_tiktok2, 
            username_tiktok3, 
            bukti_bayar, 
            status, 
            activated_at, 
            expired_at
        FROM users 
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data' });
        }

        if (result.length > 0 && result[0]) {
            const user = result[0];

            // Pastikan expired_at dalam format yang benar (YYYY-MM-DD)
            if (user.expired_at) {
                user.expired_at = new Date(user.expired_at).toISOString().split("T")[0]; // Format YYYY-MM-DD
            }

            // Format activated_at menjadi format 'DD MMMM YYYY'
            if (user.activated_at) {
                user.activated_at = moment(user.activated_at).format('DD MMMM YYYY'); // Format seperti '07 Maret 2025'
            }

            // Perhitungan 10 hari sejak activated_at untuk jenis_anggota 'Member'
            let editButtonVisible = true; // Default tombol edit visible
            if (user.jenis_anggota === 'Member' && user.activated_at) {
                const now = new Date();
                let activatedDate = new Date(user.activated_at);

                // Reset jam, menit, detik, dan milidetik pada tanggal sekarang dan tanggal activated_at
                activatedDate.setHours(0, 0, 0, 0); 
                now.setHours(0, 0, 0, 0);  // Reset jam untuk perbandingan yang lebih akurat

                const diffTime = now - activatedDate; // Selisih waktu dalam milidetik
                const diffDays = diffTime / (1000 * 3600 * 24); // Ubah ke hari

                // Jika sudah lebih dari 10 hari, sembunyikan tombol edit
                if (diffDays > 10) {
                    editButtonVisible = false; // Sembunyikan tombol edit jika sudah lebih dari 10 hari
                }
            }

            // Kirimkan data pengguna bersama status tombol edit
            res.json({ user, editButtonVisible });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});


 


app.post('/update-user-data', isAuthenticated, (req, res) => {
    const { nama, whatsapp, username_tiktok1, username_tiktok2, username_tiktok3 } = req.body;
    const userId = req.session.user.id;

    // Ambil data user untuk mengetahui jenis anggota dan tanggal activated_at
    db.query('SELECT jenis_anggota, activated_at, nama, whatsapp, username_tiktok1, username_tiktok2, username_tiktok3 FROM users WHERE id = ?', [userId], (err, userResult) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch user data' });
        }

        const user = userResult[0];

        // Menentukan kolom yang perlu diupdate
        let updatedData = {};

        const currentDate = new Date();
        const activatedDate = new Date(user.activated_at);
        const daysSinceActivated = Math.floor((currentDate - activatedDate) / (1000 * 60 * 60 * 24));

        // Validasi berdasarkan jenis_anggota
        if (user.jenis_anggota === 'VIP') {
            // VIP bisa edit semua data
            if (username_tiktok1 !== user.username_tiktok1) updatedData.username_tiktok1 = username_tiktok1;
            if (username_tiktok2 !== user.username_tiktok2) updatedData.username_tiktok2 = username_tiktok2;
            if (username_tiktok3 !== user.username_tiktok3) updatedData.username_tiktok3 = username_tiktok3;
        } else if (user.jenis_anggota === 'Member') {
            // Member hanya bisa edit username_tiktok1 selama 10 hari
            if (daysSinceActivated <= 10 && username_tiktok1 !== user.username_tiktok1) {
                updatedData.username_tiktok1 = username_tiktok1;
            }
        } else if (user.jenis_anggota === 'Free') {
            // Free hanya bisa mengedit nama, whatsapp, dan username_tiktok1
            if (username_tiktok1 !== user.username_tiktok1) updatedData.username_tiktok1 = username_tiktok1;
        }

        // Validasi nama dan whatsapp
        if (nama !== user.nama) updatedData.nama = nama;
        if (whatsapp !== user.whatsapp) updatedData.whatsapp = whatsapp;

        // Cek apakah ada perubahan data sebelum melakukan update
        if (Object.keys(updatedData).length === 0) {
            return res.json({ success: false, message: 'No changes made' });
        }

        // Query SQL untuk memperbarui data jika ada perubahan
        const sql = 'UPDATE users SET nama = ?, whatsapp = ?, username_tiktok1 = ?, username_tiktok2 = ?, username_tiktok3 = ? WHERE id = ?';
        db.query(sql, [updatedData.nama || user.nama, updatedData.whatsapp || user.whatsapp, updatedData.username_tiktok1 || user.username_tiktok1, updatedData.username_tiktok2 || user.username_tiktok2, updatedData.username_tiktok3 || user.username_tiktok3, userId], (err, result) => {
            if (err) {
                console.error('Error updating user data:', err);
                return res.status(500).json({ success: false, message: 'Failed to update data' });
            }

            // Cek apakah ada baris yang terpengaruh (artinya update berhasil)
            if (result.affectedRows > 0) {
                return res.json({ success: true, message: 'User data updated successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'User not found or no changes made' });
            }
        });
    });
});








const checkMembershipType = (requiredType) => {
    return (req, res, next) => {
        const user = req.session.user; // Ambil data dari session

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Periksa apakah jenis_anggota sesuai dengan yang dibutuhkan
        if (user.jenis_anggota !== requiredType) {
            return res.status(403).json({ message: `Access denied for ${requiredType} members only.` });
        }

        next(); // Jika sesuai, lanjutkan ke route berikutnya
    };
};


// Endpoint untuk memeriksa status keanggotaan pengguna
app.get('/check-membership/:membershipType', isAuthenticated, (req, res) => {
    const user = req.session.user;
    const membershipType = req.params.membershipType;

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.jenis_anggota !== membershipType) {
        return res.status(403).json({ message: `Access denied for ${membershipType} members only.` });
    }

    // Anggota valid, kembalikan response sukses
    res.json({ message: 'Membership valid' });
});




// Route untuk bubble-free (hanya bisa diakses oleh pengguna jenis_anggota Free)
app.get('/bubble-free-v1', isAuthenticated, checkMembershipType('Free'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-free-v1.html'));
});

// Route untuk bubble-vip (hanya bisa diakses oleh pengguna jenis_anggota VIP)
app.get('/bubble-vip-v1', isAuthenticated, checkMembershipType('VIP'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-vip-v1.html'));
});

// Route untuk bubble-rk-agency (hanya bisa diakses oleh pengguna jenis_anggota RK Agency)
app.get('/bubble-rk-agency-v1', isAuthenticated, checkMembershipType('RK Agency'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-rk-agency-v1.html'));
});

// Route untuk bubble-member (hanya bisa diakses oleh pengguna jenis_anggota Member)
app.get('/bubble-member-v1', isAuthenticated, checkMembershipType('Member'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-member-v1.html'));
});


// SETTING UNTUK VERSI 2
app.get('/bubble-free-v2', isAuthenticated, checkMembershipType('Free'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-free-v2.html'));
});

// Route untuk bubble-vip (hanya bisa diakses oleh pengguna jenis_anggota VIP)
app.get('/bubble-vip-v2', isAuthenticated, checkMembershipType('VIP'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-vip-v2.html'));
});

// Route untuk bubble-rk-agency (hanya bisa diakses oleh pengguna jenis_anggota RK Agency)
app.get('/bubble-rk-agency-v2', isAuthenticated, checkMembershipType('RK Agency'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-rk-agency-v2.html'));
});

// Route untuk bubble-member (hanya bisa diakses oleh pengguna jenis_anggota Member)
app.get('/bubble-member-v2', isAuthenticated, checkMembershipType('Member'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-member-v2.html'));
});



// SETTING UNTUK VERSI 23
app.get('/bubble-free-v3', isAuthenticated, checkMembershipType('Free'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-free-v3.html'));
});

// Route untuk bubble-vip (hanya bisa diakses oleh pengguna jenis_anggota VIP)
app.get('/bubble-vip-v3', isAuthenticated, checkMembershipType('VIP'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-vip-v3.html'));
});

// Route untuk bubble-rk-agency (hanya bisa diakses oleh pengguna jenis_anggota RK Agency)
app.get('/bubble-rk-agency-v3', isAuthenticated, checkMembershipType('RK Agency'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-rk-agency-v3.html'));
});

// Route untuk bubble-member (hanya bisa diakses oleh pengguna jenis_anggota Member)
app.get('/bubble-member-v3', isAuthenticated, checkMembershipType('Member'), (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'bubble-member-v3.html'));
});



// Route untuk dashboard (hanya bisa diakses oleh pengguna terautentikasi)
app.get('/dashboard.html', isAuthenticated, (req, res) => {
    const userId = req.query.id;  // Ambil ID dari query string
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Lakukan sesuatu dengan userId (misalnya, ambil data pengguna dari database)
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));  // Kirim dashboard.html setelah autentikasi
});


// Endpoint Logout
app.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.json({ message: 'Logout successful' });
    });
});
 


// Endpoint untuk mendapatkan data profil pengguna


app.get('/user/profile', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;

    const sql = `
        SELECT id, nama, whatsapp, username_tiktok1, username_tiktok2, username_tiktok3, jenis_anggota, expired_at 
        FROM users 
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user data' });
        }

        if (result.length > 0) {
            const user = result[0];

            if (user.jenis_anggota === 'Member' && user.expired_at) {
                user.expired_at = moment(user.expired_at).format('DD MMMM YYYY'); // Contoh: 06 April 2025
            } else {
                delete user.expired_at;
            }

            res.json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});




// Endpoint untuk mengupdate bukti bayar
app.post('/update-payment-proof', upload.single('bukti_bayar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Bukti bayar harus diupload' });
    }

    const userId = req.session.user.id;
    const bukti_bayar = req.file.filename;

    // Cek apakah file lama ada, jika ada, hapus file tersebut
    const sql = 'SELECT bukti_bayar FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan dalam mengambil data' });
        }

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });
        }

        const oldBuktiBayar = result[0].bukti_bayar;

        // Hapus file lama jika ada
        if (oldBuktiBayar) {
            const fs = require('fs');
            const oldFilePath = path.join(uploadDir, oldBuktiBayar);
            fs.unlink(oldFilePath, (err) => {
                if (err) console.error('Gagal menghapus file lama:', err);
            });
        }

        // Update bukti bayar di database
        const updateSql = 'UPDATE users SET bukti_bayar = ? WHERE id = ?';
        db.query(updateSql, [bukti_bayar, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Terjadi kesalahan dalam memperbarui bukti bayar' });
            }

            res.json({ success: true, message: 'Bukti bayar berhasil diperbarui' });
        });
    });
});


// Endpoint untuk mendapatkan data TikTok pengguna
app.get('/user/tiktok-data', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;  // Ambil userId dari session

    const sql = 'SELECT username_tiktok1, username_tiktok2, username_tiktok3 FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching TikTok data' });
        }

        if (result.length > 0) {
            // Kirim data TikTok pengguna dalam format JSON
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});



// Route untuk login admin

app.post('/masuk-pak', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required" });
    }

    db.query("SELECT * FROM admins WHERE username = ?", [username], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ message: "Username tidak ditemukan." });
        }

        const admin = results[0];

        // Verifikasi password menggunakan bcrypt
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Error during password comparison" });

            if (!isMatch) {
                return res.status(401).json({ message: "Password salah" });
            }

            // Menyimpan informasi admin ke session
            req.session.adminId = admin.id;
            req.session.adminName = admin.nama;
            req.session.role = admin.role;

            // Kirim response JSON untuk login sukses
            res.json({ message: "Login successful" });
        });
    });
});








// Middleware untuk autentikasi admin
// Middleware untuk memastikan admin sudah terautentikasi
const isAdminAuthenticated = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();  // Lanjutkan jika admin terautentikasi
};



app.get('/rumah-pakguru', isAdminAuthenticated, (req, res) => {
    // Memeriksa apakah admin memiliki role 'superadmin'
    if (req.session.role !== 'superadmin') {
        return res.status(403).json({ message: "Akses ditolak. Anda bukan superadmin." });
    }

    // Menampilkan halaman HTML rumah-pakguru.html
    res.sendFile(path.join(__dirname, 'public', 'rumah-pakguru.html'));
});



app.delete('/delete-user/:userId', (req, res) => {
    const userId = req.params.userId;

    // Pastikan hanya superadmin yang bisa menghapus
    // Misalnya, kita periksa user yang sedang login (ini hanya contoh)
    const isSuperAdmin = true; // Kamu bisa ganti dengan pengecekan status superadmin berdasarkan sesi atau token

    if (!isSuperAdmin) {
        return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus pengguna.' });
    }

    // Query untuk menghapus pengguna berdasarkan userId
    const query = 'DELETE FROM users WHERE id = ?';

    db.execute(query, [userId], (err, result) => {
        if (err) {
            console.error('Error menghapus pengguna:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus pengguna.' });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Pengguna berhasil dihapus.' });
        } else {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
    });
});




// API untuk memeriksa apakah admin terautentikasi
app.get('/api/check-auth', (req, res) => {
    if (!req.session.adminId) {
        return res.json({ authenticated: false });
    }
    res.json({ authenticated: true, adminName: req.session.adminName });
});


// API untuk mendapatkan data pengguna
app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ users: results });
    });
});




app.put('/update-user/:id', (req, res) => {
    const { id } = req.params;
    const { nama, whatsapp, username_tiktok1, username_tiktok2, username_tiktok3, expired_at, jenis_anggota } = req.body;

    // Memastikan nilai optional tidak menyebabkan masalah
    const updatedExpiredAt = expired_at || null;  // Jika expired_at tidak ada, set null
    const updatedUsernameTikTok2 = username_tiktok2 || null; // Jika username_tiktok2 tidak ada, set null
    const updatedUsernameTikTok3 = username_tiktok3 || null; // Jika username_tiktok3 tidak ada, set null
    const updatedJenisAnggota = jenis_anggota || 'Free'; // Menentukan default untuk jenis_anggota jika tidak disertakan

    // SQL query untuk memperbarui data pengguna, termasuk expired_at jika disertakan
    const sql = `
        UPDATE users 
        SET nama = ?, whatsapp = ?, username_tiktok1 = ?, username_tiktok2 = ?, username_tiktok3 = ?, expired_at = ?, jenis_anggota = ? 
        WHERE id = ?
    `;

    db.query(sql, [nama, whatsapp, username_tiktok1, updatedUsernameTikTok2, updatedUsernameTikTok3, updatedExpiredAt, updatedJenisAnggota, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating user data" });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'User data updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
});



app.put('/activate-user/:id', isAdminAuthenticated, (req, res) => {
    const { activated_at, expired_at } = req.body;
    const userId = req.params.id;

    // Cek apakah expired_at ada, jika tidak, set ke null
    const sql = `
        UPDATE users
        SET status = 'Aktif', activated_at = ?, expired_at = ?
        WHERE id = ?
    `;

    // Jika expired_at tidak ada (misalnya bukan Member), kita set null
    const values = expired_at ? [activated_at, expired_at, userId] : [activated_at, null, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error activating user:', err);
            return res.status(500).json({ message: "Error activating user" });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'User activated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
});





app.put('/toggle-status/:id', isAdminAuthenticated, (req, res) => {
    const { status } = req.body;
    const userId = req.params.id;

    const sql = `
        UPDATE users
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, userId], (err, result) => {
        if (err) {
            console.error('Error updating status:', err);
            return res.status(500).json({ message: "Error updating status" });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: `Status pengguna berhasil diubah menjadi ${status}` });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
});



app.put('/extend-expiration/:id', isAdminAuthenticated, (req, res) => {
    const { expired_at } = req.body;
    const userId = req.params.id;

    const sql = `
        UPDATE users
        SET expired_at = ?
        WHERE id = ?
    `;

    db.query(sql, [expired_at, userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error extending expiration" });

        if (result.affectedRows > 0) {
            return res.json({ message: 'Expiration extended successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
});

app.get('/api/dashboard-data', (req, res) => {
    const dashboardData = {};

    // Query jumlah RK Agency
    db.query("SELECT COUNT(*) AS count FROM users WHERE jenis_anggota = 'RK Agency'", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        dashboardData.rkAgencyCount = results[0].count;

        // Query jumlah VIP
        db.query("SELECT COUNT(*) AS count FROM users WHERE jenis_anggota = 'VIP'", (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }
            dashboardData.vipCount = results[0].count;

            // Query jumlah Free dan Member
            db.query("SELECT COUNT(*) AS count FROM users WHERE jenis_anggota IN ('Free', 'Member')", (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }
                dashboardData.freeMemberCount = results[0].count;

                // Query jumlah expired users
                db.query("SELECT COUNT(*) AS count FROM users WHERE expired_at < NOW()", (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: "Database error" });
                    }
                    dashboardData.expiredCount = results[0].count;

                    // Query jumlah non-active users
                    db.query("SELECT COUNT(*) AS count FROM users WHERE status = 'Tidak Aktif'", (err, results) => {
                        if (err) {
                            return res.status(500).json({ message: "Database error" });
                        }
                        dashboardData.nonActiveCount = results[0].count;

                        // Query total users
                        db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
                            if (err) {
                                return res.status(500).json({ message: "Database error" });
                            }
                            dashboardData.totalUsersCount = results[0].count;

                            res.json(dashboardData);  // Kirimkan data dashboard ke frontend
                        });
                    });
                });
            });
        });
    });
});


// Route untuk logout admin
// Route untuk logout admin
app.post('/keluar-pak', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Failed to logout" });
        res.redirect('/masuk-pak.html');  // Redirect ke halaman login setelah logout
    });
});


app.post('/api/blur-user', (req, res) => {
  const { uniqueId, profilePictureUrl } = req.body;
  const sql = `
    INSERT INTO blurred_users (tiktok_unique_id, profile_picture_url)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE profile_picture_url = VALUES(profile_picture_url)
  `;
  db.query(sql, [uniqueId, profilePictureUrl], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});



app.post('/api/unblur-user', (req, res) => {
  const { uniqueId } = req.body;
  const sql = `DELETE FROM blurred_users WHERE tiktok_unique_id = ?`;
  db.query(sql, [uniqueId], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});



app.get('/api/blurred-users', (req, res) => {
  const sql = `SELECT tiktok_unique_id FROM blurred_users`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    const list = results.map(row => row.tiktok_unique_id);
    res.json({ success: true, blurredUsers: list });
  });
});



app.get('/api/blurred-users-full', (req, res) => {
  const sql = `SELECT * FROM blurred_users ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    res.json({ success: true, users: results });
  });
});



// Start HTTP server
const port = process.env.PORT || 8081;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});