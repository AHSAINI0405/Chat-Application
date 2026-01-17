async function register() {
  await fetch(`${API}/api/auth/register`, {
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
