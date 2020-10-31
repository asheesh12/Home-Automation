const socketApp = require('express')();
const socketServer = require('http').createServer(socketApp);
socketServer.listen(8080);
const io = require('socket.io')(socketServer);
const socketService = require('./services/socket.service');

io.sockets.on('connection', socket => {
    socket.on('subscribe', socketService.onSocketSubscribeEvent(socket));
    socket.on('unsubscribe', socketService.onSocketUnsubscribeEvent(socket));
});

module.exports = socketServer; // For testing purposes