let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];

// Tambah Kategori
document.getElementById("kategoriForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaKategori = document.getElementById("namaKategori").value;

    const newKategori = {
        id: `KAT${Date.now()}`,
        nama: namaKategori,
    };

    kategoriData.push(newKategori);
    localStorage.setItem("kategoriData", JSON.stringify(kategoriData));

    tampilkanAlert("Kategori berhasil ditambahkan!", "success");
    tampilkanKategori();
    document.getElementById("kategoriForm").reset();
});

// Tampilkan Kategori
function tampilkanKategori() {
    const kategoriTable = document.getElementById("kategoriTable");
    kategoriTable.innerHTML = "";

    kategoriData.forEach((kategori) => {
        kategoriTable.innerHTML += `
            <tr>
                <td>${kategori.id}</td>
                <td>${kategori.nama}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editKategori('${kategori.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusKategori('${kategori.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Edit Kategori
function editKategori(id) {
    const kategori = kategoriData.find((k) => k.id === id);
    if (kategori) {
        document.getElementById("namaKategori").value = kategori.nama;
        hapusKategori(id);
    }
}

// Hapus Kategori
function hapusKategori(id) {
    kategoriData = kategoriData.filter((k) => k.id !== id);
    localStorage.setItem("kategoriData", JSON.stringify(kategoriData));
    tampilkanAlert("Kategori berhasil dihapus!", "danger");
    tampilkanKategori();
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
tampilkanKategori();
