class Message {
  constructor(uid, name, message) {
    this.uid = uid;
    this.name = name;
    this.message = message;
  }
}

class PrivateMessage {
  constructor(from, to, message) {
    this.from = from;
    this.to = to;
    this.message = message;
  }
}

class ChatMessages {
  constructor() {
    this.messages = [];
    this.users = {};
  }

  get lastTen() {
    this.messages = this.messages.slice(0, 10);
    return this.messages;
  }

  get usersArray() {
    return Object.values(this.users);
  }

  sendMessage(uid, name, message) {
    this.messages.unshift(new Message(uid, name, message));
  }

  sendPrivateMessage(from, to, message) {
    this.messages.unshift(new PrivateMessage(from, to, message));
  }

  getPrivateMessage(from, to) {
    return this.messages.filter((message) => {
      return message.from === from && message.to === to;
    });
  }

  connectUser(user) {
    this.users[user.id] = user;
  }

  disconnectUser(id) {
    delete this.users[id];
  }
}

module.exports = ChatMessages;
