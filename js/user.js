let userIdCounter = JSON.parse(localStorage.getItem("userIdCounter")) || 1;
let userData = JSON.parse(localStorage.getItem("userData")) || [];

// ID Generator
function generateUserId() {
    const id = `USER-${userIdCounter++}`;
    localStorage.setItem("userIdCounter", JSON.stringify(userIdCounter));
    return id;
}

// Simpan Data ke Local Storage
function saveToLocalStorage() {
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Tampilkan input peran manual jika peran adalah "Other"
function toggleOtherRoleInput() {
    const peranUser = document.getElementById("peranUser").value;
    const otherRoleInputContainer = document.getElementById("otherRoleInputContainer");
    if (peranUser === "perOther") {
        otherRoleInputContainer.style.display = "block";
    } else {
        otherRoleInputContainer.style.display = "none";
        document.getElementById("otherRole").value = "";
    }
}

// Tambahkan User
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const editUserId = document.getElementById("editUserId").value;

    const peran = document.getElementById("peranUser").value === "perOther"
        ? document.getElementById("otherRole").value
        : document.getElementById("peranUser").options[document.getElementById("peranUser").selectedIndex].text;

    const user = {
        id: editUserId || generateUserId(),
        nama: document.getElementById("namaUser").value,
        peran: peran,
        noHp: document.getElementById("noHpUser").value,
        alamat: document.getElementById("alamatUser").value,
        status: document.getElementById("userSwitch").checked ? "Aktif" : "Nonaktif",
    };

    if (editUserId) {
        const index = userData.findIndex((u) => u.id === editUserId);
        userData[index] = user;
        document.getElementById("saveUserButton").innerHTML = '<i class="fas fa-save"></i> Simpan User';
    } else {
        userData.push(user);
    }

    saveToLocalStorage();
    tampilkanUser();
    alert("User berhasil disimpan!");
    this.reset();
    toggleOtherRoleInput();
});

// Tampilkan User
function tampilkanUser() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";
    userData.forEach((user, index) => {
        userTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nama}</td>
                <td>${user.peran}</td>
                <td>${user.noHp}</td>
                <td>${user.alamat}</td>
                <td>${user.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusUser(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Filter User
function filterUser() {
    const filter = document.getElementById("filterUserStatus").value;
    const filteredData = filter ? userData.filter((user) => user.status === filter) : userData;
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";
    filteredData.forEach((user, index) => {
        userTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nama}</td>
                <td>${user.peran}</td>
                <td>${user.noHp}</td>
                <td>${user.alamat}</td>
                <td>${user.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusUser(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Hapus User
function hapusUser(index) {
    if (confirm("Yakin ingin menghapus user ini?")) {
        userData.splice(index, 1);
        saveToLocalStorage();
        tampilkanUser();
    }
}

// Edit User
function editUser(index) {
    const user = userData[index];
    document.getElementById("editUserId").value = user.id;
    document.getElementById("namaUser").value = user.nama;
    document.getElementById("noHpUser").value = user.noHp;
    document.getElementById("alamatUser").value = user.alamat;
    document.getElementById("userSwitch").checked = user.status === "Aktif";
    if (["Super Admin", "Admin Perusahaan", "Kasir"].includes(user.peran)) {
        document.getElementById("peranUser").value = user.peran.toLowerCase();
        toggleOtherRoleInput();
    } else {
        document.getElementById("peranUser").value = "perOther";
        toggleOtherRoleInput();
        document.getElementById("otherRole").value = user.peran;
    }
    document.getElementById("saveUserButton").innerHTML = '<i class="fas fa-save"></i> Perbarui User';
}

tampilkanUser();
