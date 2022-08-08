var url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "https://rest-server2.herokuapp.com/api/auth/";

let user = null;
let socket = null;

// HTMLs Refs
const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessages = document.querySelector("#ulMessages");
const btnOut = document.querySelector("#btnOut");

// Validate JWT in localStorage
const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("Token no valido");
  }

  const res = await fetch(url, {
    headers: { "x-token": token },
  });

  const { user: userDB, token: tokenDB } = await res.json();

  localStorage.setItem("token", tokenDB);
  user = userDB;

  document.title = `Chat - ${user.name}`;

  await connectSocket();
};

const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });

  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });

  socket.on("receive-messages", () => {
    // TODO
  });

  socket.on("active-users", (payload) => {
    console.log(payload);
  });

  socket.on("private-message", () => {
    // TODO
  });
};

const main = async () => {
  await validateJWT();
};

main();
