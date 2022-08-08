const { Socket } = require("socket.io");
const { checkJTW } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers["x-token"];
  const user = await checkJTW(token);

  if (!user) {
    return socket.disconnect();
  }

  // Connect user to chatMessages
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArray);

  // Cleaning when someone disconnect
  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArray);
  });

  socket.on("send-message", ({ uid, message }) => {
    chatMessages.sendMessage(user.id, user.name, message);
    io.emit("receive-messages", chatMessages.lastTen);
  });
};

module.exports = socketController;
