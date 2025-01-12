let kategoriData = [];
let kategoriIdCounter = 1;

// Fungsi Membuat ID Kategori Unik
function generateIdKategori() {
    return `CAT-${kategoriIdCounter++}`;
}

// Tambahkan Kategori Baru
document.getElementById("kategoriForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const kategori = {
        id: generateIdKategori(),
        nama: document.getElementById("namaKategori").value,
        status: document.getElementById("statusSwitch").checked ? "Aktif" : "Nonaktif",
    };

    kategoriData.push(kategori);
    tampilkanAlert("Kategori berhasil ditambahkan!", "success");
    tampilkanKategori();
    this.reset();
});

// Tampilkan Daftar Kategori
function tampilkanKategori() {
    const kategoriTable = document.getElementById("kategoriTable");
    kategoriTable.innerHTML = "";

    kategoriData.forEach((kategori, index) => {
        kategoriTable.innerHTML += `
            <tr>
                <td>${kategori.id}</td>
                <td>${kategori.nama}</td>
                <td>${kategori.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editKategori(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusKategori(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Hapus Kategori
function hapusKategori(index) {
    kategoriData.splice(index, 1);
    tampilkanAlert("Kategori berhasil dihapus!", "danger");
    tampilkanKategori();
}

// Filter Kategori
function filterKategori() {
    const statusFilter = document.getElementById("filterStatus").value;

    const kategoriTable = document.getElementById("kategoriTable");
    kategoriTable.innerHTML = "";

    kategoriData
        .filter((kategori) => !statusFilter || kategori.status === statusFilter)
        .forEach((kategori, index) => {
            kategoriTable.innerHTML += `
                <tr>
                    <td>${kategori.id}</td>
                    <td>${kategori.nama}</td>
                    <td>${kategori.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editKategori(${index})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="hapusKategori(${index})"><i class="fas fa-trash"></i></button>
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
