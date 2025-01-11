let userData = JSON.parse(localStorage.getItem("userData")) || [];

// Tambah User
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const userRole = document.getElementById("userRole").value;

    const newUser = {
        id: `U${Date.now()}`,
        nama: username,
        peran: userRole,
    };

    userData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userData));

    tampilkanAlert("User berhasil ditambahkan!", "success");
    tampilkanUser();
    document.getElementById("userForm").reset();
});

// Tampilkan User
function tampilkanUser() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    userData.forEach((user) => {
        userTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nama}</td>
                <td>${user.peran}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusUser('${user.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Edit User
function editUser(id) {
    const user = userData.find((u) => u.id === id);
    if (user) {
        document.getElementById("username").value = user.nama;
        document.getElementById("userRole").value = user.peran;
        hapusUser(id); // Hapus agar data baru menggantikan
    }
}

// Hapus User
function hapusUser(id) {
    userData = userData.filter((u) => u.id !== id);
    localStorage.setItem("userData", JSON.stringify(userData));
    tampilkanAlert("User berhasil dihapus!", "danger");
    tampilkanUser();
}

// Tampilkan Alert
function tampilkanAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 3000);
}

// Muat data saat halaman pertama kali dimuat
tampilkanUser();
