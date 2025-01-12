// Variabel untuk menyimpan ID kategori yang unik dan data kategori
let kategoriIdCounter = JSON.parse(localStorage.getItem("kategoriIdCounter")) || 1;
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];

// Fungsi untuk menghasilkan ID unik untuk setiap kategori
function generateKategoriId() {
    const id = `KAT-${kategoriIdCounter++}`;
    localStorage.setItem("kategoriIdCounter", JSON.stringify(kategoriIdCounter)); // Update counter ID
    return id;
}

// Fungsi untuk menyimpan data kategori ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("kategoriData", JSON.stringify(kategoriData));
}

// Menangani event submit form kategori
document.getElementById("kategoriForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const editKategoriId = document.getElementById("editKategoriId").value; // Ambil ID kategori jika sedang diedit

    const kategori = {
        id: editKategoriId || generateKategoriId(), // Jika sedang mengedit, gunakan ID yang sudah ada
        nama: document.getElementById("namaKategori").value, // Nama kategori dari input
        status: document.getElementById("statusKategori").checked ? "Aktif" : "Nonaktif", // Status kategori dari switch
    };

    if (editKategoriId) {
        const index = kategoriData.findIndex((k) => k.id === editKategoriId); // Cari kategori yang sedang diedit
        kategoriData[index] = kategori; // Update kategori yang diedit
        document.getElementById("saveKategoriButton").innerHTML = '<i class="fas fa-save"></i> Simpan Kategori';
    } else {
        kategoriData.push(kategori); // Tambahkan kategori baru ke array kategoriData
    }

    saveToLocalStorage(); // Simpan data ke LocalStorage
    tampilkanKategori(); // Tampilkan kategori yang sudah diupdate
    alertMessage("Kategori berhasil disimpan!", "success"); // Menampilkan alert sukses
    this.reset(); // Reset form setelah simpan
});

// Menampilkan daftar kategori dalam tabel
function tampilkanKategori() {
    const kategoriTable = document.getElementById("kategoriTable");
    kategoriTable.innerHTML = ""; // Kosongkan tabel sebelum menampilkan data
    kategoriData.forEach((kategori, index) => {
        kategoriTable.innerHTML += `
            <tr>
                <td>${kategori.id}</td>
                <td>${kategori.nama}</td>
                <td>${kategori.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editKategori(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusKategori(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Menghapus kategori
function hapusKategori(index) {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
        kategoriData.splice(index, 1); // Hapus kategori dari array
        saveToLocalStorage(); // Simpan perubahan ke LocalStorage
        tampilkanKategori(); // Tampilkan kategori yang telah diperbarui
        alertMessage("Kategori berhasil dihapus!", "danger"); // Menampilkan alert sukses
    }
}

// Mengedit kategori
function editKategori(index) {
    const kategori = kategoriData[index];
    document.getElementById("editKategoriId").value = kategori.id; // Set ID kategori yang sedang diedit
    document.getElementById("namaKategori").value = kategori.nama; // Set nama kategori
    document.getElementById("statusKategori").checked = kategori.status === "Aktif"; // Set status kategori
    document.getElementById("saveKategoriButton").innerHTML = '<i class="fas fa-save"></i> Perbarui Kategori'; // Ganti tombol jadi perbarui
}

// Menampilkan alert
function alertMessage(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Menampilkan daftar kategori ketika halaman dimuat
tampilkanKategori();
