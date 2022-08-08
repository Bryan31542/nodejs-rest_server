var url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/"
  : "https://rest-server2.herokuapp.com/api/auth/";

let user = null;
let socket = null;

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
};

const main = async () => {
  await validateJWT();
};

main();

//const socket = io();
