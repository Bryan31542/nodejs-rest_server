const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/users";
    this.authPath = "/api/auth";

    // Connect to database
    this.connectToDatabase();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Public folder
    this.app.use(express.static("public"));
  }

  async connectToDatabase() {
    await dbConnection();
  }

  routes() {
    this.app.use(`${this.authPath}`, require("../routes/auth"));
    this.app.use(`${this.userPath}`, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
