// Data Dummy
let pelangganData = [];

// Simpan Pelanggan
document.getElementById("pelangganForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const pelanggan = {
        id: "PLGN-" + Date.now(),
        nama: document.getElementById("namaPelanggan").value,
        email: document.getElementById("emailPelanggan").value,
        tanggalLahir: document.getElementById("tanggalLahir").value,
        noHandphone: document.getElementById("noHandphone").value,
        alamat: document.getElementById("alamatPelanggan").value,
    };

    pelangganData.push(pelanggan);
    tampilkanPelanggan();
    this.reset();
    tampilkanAlert("Pelanggan berhasil ditambahkan!", "success");
});

// Tampilkan Pelanggan
function tampilkanPelanggan() {
    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";

    pelangganData.forEach((pelanggan, index) => {
        pelangganTable.innerHTML += `
            <tr>
                <td>${pelanggan.id}</td>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.email}</td>
                <td>${pelanggan.tanggalLahir}</td>
                <td>${pelanggan.noHandphone}</td>
                <td>${pelanggan.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPelanggan(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusPelanggan(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Edit Pelanggan
function editPelanggan(index) {
    const pelanggan = pelangganData[index];
    document.getElementById("namaPelanggan").value = pelanggan.nama;
    document.getElementById("emailPelanggan").value = pelanggan.email;
    document.getElementById("tanggalLahir").value = pelanggan.tanggalLahir;
    document.getElementById("noHandphone").value = pelanggan.noHandphone;
    document.getElementById("alamatPelanggan").value = pelanggan.alamat;

    pelangganData.splice(index, 1);
    tampilkanPelanggan();
    tampilkanAlert("Silakan edit data pelanggan di formulir!", "info");
}

// Hapus Pelanggan
function hapusPelanggan(index) {
    pelangganData.splice(index, 1);
    tampilkanPelanggan();
    tampilkanAlert("Pelanggan berhasil dihapus!", "danger");
}

// Cari Pelanggan
document.getElementById("searchPelanggan").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filteredData = pelangganData.filter((pelanggan) =>
        pelanggan.nama.toLowerCase().includes(keyword)
    );
    tampilkanPelangganFiltered(filteredData);
});

function tampilkanPelangganFiltered(filteredData) {
    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";

    filteredData.forEach((pelanggan) => {
        pelangganTable.innerHTML += `
            <tr>
                <td>${pelanggan.id}</td>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.email}</td>
                <td>${pelanggan.tanggalLahir}</td>
                <td>${pelanggan.noHandphone}</td>
                <td>${pelanggan.alamat}</td>
                <td>
                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
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

// Muat Data Awal
document.addEventListener("DOMContentLoaded", tampilkanPelanggan);
