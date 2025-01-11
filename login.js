document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        alert(`Selamat datang, ${user.name}!`);
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect berdasarkan peran
        switch (user.role) {
            case "admin":
                window.location.href = "dashboard_admin.html";
                break;
            case "kasir":
                window.location.href = "dashboard_kasir.html";
                break;
            case "pelanggan":
                window.location.href = "dashboard_pelanggan.html";
                break;
            default:
                alert("Peran tidak dikenali!");
        }
    } else {
        alert("Username atau password salah!");
    }
});
