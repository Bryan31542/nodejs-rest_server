function handleCredentialResponse(response) {
  // Google Token : ID_TOKEN
  const body = { id_token: response.credential };
  var url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/google"
    : "https://rest-server2.herokuapp.com/api/auth/google";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
    })
    .catch(console.warn);
}

const signOut = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  console.log("User signed out.");

  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
