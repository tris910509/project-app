let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];

// Tambah Pelanggan
document.getElementById("pelangganForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaPelanggan = document.getElementById("namaPelanggan").value;
    const emailPelanggan = document.getElementById("emailPelanggan").value;
    const noHpPelanggan = document.getElementById("noHpPelanggan").value;

    const newPelanggan = {
        id: `P${Date.now()}`,
        nama: namaPelanggan,
        email: emailPelanggan,
        noHp: noHpPelanggan,
    };

    pelangganData.push(newPelanggan);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));

    tampilkanAlert("Pelanggan berhasil ditambahkan!", "success");
    tampilkanPelanggan();
    document.getElementById("pelangganForm").reset();
});

// Tampilkan Pelanggan
function tampilkanPelanggan() {
    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";

    pelangganData.forEach((pelanggan) => {
        pelangganTable.innerHTML += `
            <tr>
                <td>${pelanggan.id}</td>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.email}</td>
                <td>${pelanggan.noHp}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPelanggan('${pelanggan.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusPelanggan('${pelanggan.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Edit Pelanggan
function editPelanggan(id) {
    const pelanggan = pelangganData.find((p) => p.id === id);
    if (pelanggan) {
        document.getElementById("namaPelanggan").value = pelanggan.nama;
        document.getElementById("emailPelanggan").value = pelanggan.email;
        document.getElementById("noHpPelanggan").value = pelanggan.noHp;
        hapusPelanggan(id); // Hapus agar data baru menggantikan
    }
}

// Hapus Pelanggan
function hapusPelanggan(id) {
    pelangganData = pelangganData.filter((p) => p.id !== id);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));
    tampilkanAlert("Pelanggan berhasil dihapus!", "danger");
    tampilkanPelanggan();
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
tampilkanPelanggan();
