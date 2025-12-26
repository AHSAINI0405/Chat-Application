async function register() {
  await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: uname.value,
      email: email.value,
      password: password.value
    })
  });
  location.href = "login.html";
}
