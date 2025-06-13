const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../public')));

// File upload setup
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Temporary data storage
let users = [];
let messages = {};
let activeCalls = [];

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // User joins
    socket.on('join', (userData) => {
        users.push({ ...userData, socketId: socket.id });
        io.emit('userList', users);
    });

    // Chat messages
    socket.on('sendMessage', (messageData) => {
        const { chatId, sender, text } = messageData;
        const timestamp = new Date().toISOString();
        
        if (!messages[chatId]) messages[chatId] = [];
        messages[chatId].push({ sender, text, timestamp });
        
        io.emit('newMessage', { chatId, sender, text, timestamp });
    });

    // Call signaling
    socket.on('offer', (data) => {
        const { to, offer } = data;
        io.to(to).emit('offer', { from: socket.id, offer });
    });

    socket.on('answer', (data) => {
        const { to, answer } = data;
        io.to(to).emit('answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', (data) => {
        const { to, candidate } = data;
        io.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    // Shorts upload
    socket.on('uploadShort', (shortData) => {
        // In a real app, you would process and store the file
        const { userId, mediaUrl } = shortData;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        io.emit('newShort', { userId, mediaUrl, expiresAt });
    });

    // Disconnect
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('userList', users);
        console.log('User disconnected:', socket.id);
    });
});

// API Routes
app.post('/api/upload', upload.single('media'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // In a real app, you would upload to cloud storage
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Clean up uploads directory periodically
    setInterval(() => {
        const uploadsDir = path.join(__dirname, 'uploads');
        fs.readdir(uploadsDir, (err, files) => {
            if (err) return;
            
            const now = Date.now();
            files.forEach(file => {
                const filePath = path.join(uploadsDir, file);
                const stat = fs.statSync(filePath);
                if (now - stat.mtimeMs > 24 * 60 * 60 * 1000) {
                    fs.unlinkSync(filePath);
                }
            });
        });
    }, 60 * 60 * 1000); // Every hour
});
      
