// Importing required modules
const io = require('socket.io')(8000);

// Object to store user details
const users = {};

// Socket.IO event listeners
io.on("connection", socket => {
    // Event: When a new user joins
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        // Notify all connected users about the new user
        socket.broadcast.emit('user-joined', name);
    });

    // Event: When a user sends a message
    socket.on('send', message => {
        // Broadcast the message to all users except the sender
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // Event: When a user disconnects
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            // Notify all connected users about the disconnected user
            socket.broadcast.emit('leave', users[socket.id]);
            delete users[socket.id];
        }
    });
    
    // Error handling
    socket.on('error', error => {
       console.error('Socket error:', error);
      });
   });
   
