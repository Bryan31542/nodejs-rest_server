const { Socket } = require("socket.io");
const { checkJTW } = require("../helpers");

const socketController = async (socket = new Socket()) => {
  const token = socket.handshake.headers["x-token"];
  const user = await checkJTW(token);

  if (!user) {
    return socket.disconnect();
  }

  console.log(`${user.name} se ha conectado`);
};

module.exports = socketController;
