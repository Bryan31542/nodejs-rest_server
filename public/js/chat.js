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

  socket.on("receive-messages", paintMessages);

  socket.on("active-users", paintUsers);

  socket.on("private-message", () => {
    // TODO
  });
};

const paintUsers = (users = []) => {
  let usersHTML = "";

  users.forEach(({ name, uid }) => {
    usersHTML += `
      <li>
        <p>
          <h5 class="text-success"> ${name} </h5>
          <span class="fs-6 text-muted"> ${uid} </span>
        </p>
      </li>
      `;
  });

  ulUsers.innerHTML = usersHTML;
};

txtMessage.addEventListener("keyup", ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }

  if (message.length === 0) {
    return;
  }

  socket.emit("send-message", { message, uid });

  txtMessage.value = "";
});

const paintMessages = (messages = []) => {
  let messagesHTML = "";

  messages.forEach(({ name, message }) => {
    messagesHTML += `
      <li>
        <p>
          <span class="text-primary"> ${name} </span>
          <span> ${message} </span>
        </p>
      </li>
      `;
  });

  ulMessages.innerHTML = messagesHTML;
};

const main = async () => {
  await validateJWT();
};

main();
