document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userForm = document.getElementById("userForm");
    const userTable = document.getElementById("userTable");

    const renderUsers = () => {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            userTable.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("userName").value;
        const role = document.getElementById("userRole").value;

        if (!name || !role) {
            alert("Semua bidang harus diisi!");
            return;
        }

        const id = `USER-${Date.now()}`;
        const newUser = { id, name, role };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
        userForm.reset();
    });

    window.deleteUser = (index) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    };

    renderUsers();
});
