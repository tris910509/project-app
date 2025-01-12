let pelangganData = [];
let pelangganIdCounter = 1;

// Fungsi Membuat ID Pelanggan Unik
function generateIdPelanggan() {
    return `CUST-${pelangganIdCounter++}`;
}

// Tambahkan Pelanggan Baru
document.getElementById("pelangganForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const pelanggan = {
        id: generateIdPelanggan(),
        nama: document.getElementById("namaPelanggan").value,
        peran: document.getElementById("peranPelanggan").value,
        noHandphone: document.getElementById("noHandphone").value,
        alamat: document.getElementById("alamatPelanggan").value,
        status: document.getElementById("statusSwitch").checked ? "Aktif" : "Nonaktif",
    };

    pelangganData.push(pelanggan);
    tampilkanAlert("Pelanggan berhasil ditambahkan!", "success");
    tampilkanPelanggan();
    this.reset();
});

// Tampilkan Daftar Pelanggan
function tampilkanPelanggan() {
    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";

    pelangganData.forEach((pelanggan, index) => {
        pelangganTable.innerHTML += `
            <tr>
                <td>${pelanggan.id}</td>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.peran}</td>
                <td>${pelanggan.noHandphone}</td>
                <td>${pelanggan.alamat}</td>
                <td>${pelanggan.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPelanggan(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusPelanggan(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Hapus Pelanggan
function hapusPelanggan(index) {
    pelangganData.splice(index, 1);
    tampilkanAlert("Pelanggan berhasil dihapus!", "danger");
    tampilkanPelanggan();
}

// Filter Pelanggan
function filterPelanggan() {
    const peranFilter = document.getElementById("filterPeran").value;
    const statusFilter = document.getElementById("filterStatus").value;

    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";

    pelangganData
        .filter((pelanggan) => 
            (!peranFilter || pelanggan.peran === peranFilter) &&
            (!statusFilter || pelanggan.status === statusFilter)
        )
        .forEach((pelanggan, index) => {
            pelangganTable.innerHTML += `
                <tr>
                    <td>${pelanggan.id}</td>
                    <td>${pelanggan.nama}</td>
                    <td>${pelanggan.peran}</td>
                    <td>${pelanggan.noHandphone}</td>
                    <td>${pelanggan.alamat}</td>
                    <td>${pelanggan.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editPelanggan(${index})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="hapusPelanggan(${index})"><i class="fas fa-trash"></i></button>
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
