document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const user = users.find((u) => u.name === username && u.password === password);

        if (user) {
            alert(`Selamat datang, ${user.name}! Anda masuk sebagai ${user.role}.`);
            window.location.href = "dashboard.html";
        } else {
            alert("Nama pengguna atau kata sandi salah!");
        }
    });
});
