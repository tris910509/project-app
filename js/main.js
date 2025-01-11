const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "kasir", password: "kasir123", role: "kasir" },
    { username: "operator", password: "operator123", role: "operator" },
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Username atau password salah!");
    }
});
