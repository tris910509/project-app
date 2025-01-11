document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;
        const role = document.getElementById("registerRole").value;

        // Cek apakah username sudah ada
        if (users.some((user) => user.name === username)) {
            registerMessage.textContent = "Username sudah digunakan!";
            registerMessage.classList.add("text-danger");
            return;
        }

        // Tambahkan pengguna baru
        const newUser = {
            id: `USER-${Date.now()}`,
            name: username,
            password,
            role,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        registerMessage.textContent = "Registrasi berhasil!";
        registerMessage.classList.add("text-success");
        registerForm.reset();
    });
});
