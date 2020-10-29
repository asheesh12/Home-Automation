module.exports = (function() {
  this.sockets = {}; // List of all active users
  this.addSocket = addSocket;
  this.removeSocket = removeSocket;
  this.sendMessage = sendMessage;

  /**
   * Adds a socket
   * @author Asheesh Bhuria
   * @param {String} socketId 
   * @param {Object} socket 
   */
  function addSocket(socketId, socket) {
    if (!socketId) return;
    sockets[socketId] = socket;
  }

  /**
   * Removes a socket
   * @author Asheesh Bhuria
   * @param {String} socketId 
   */
  function removeSocket(socketId) {
    delete sockets[socketId];
  }

  /**
   * Sends a message to the client via websockets
   * @author Asheesh Bhuria
   * @param {String} socketId 
   * @param {String} data 
   */
  function sendMessage(socketId, data) {
    let socket = sockets[socketId];
    socket.emit(data)
  }
})();

