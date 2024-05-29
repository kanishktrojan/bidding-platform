const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible to the router
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = server;
