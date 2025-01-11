document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validasi pengguna
        const user = users.find((user) => user.name === username && user.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "dashboard.html"; // Arahkan ke dashboard setelah login berhasil
        } else {
            loginMessage.textContent = "Username atau password salah!";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Anda harus login terlebih dahulu!");
        window.location.href = "login.html";
    } else {
        console.log(`Selamat datang, ${loggedInUser.name}`);
    }
});
