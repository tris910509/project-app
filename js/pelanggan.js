let pelangganIdCounter = JSON.parse(localStorage.getItem("pelangganIdCounter")) || 1;
let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];

// Fungsi untuk menghasilkan ID unik pelanggan
function generatePelangganId() {
    const id = `PLGN-${pelangganIdCounter++}`;
    localStorage.setItem("pelangganIdCounter", JSON.stringify(pelangganIdCounter));
    return id;
}

// Fungsi untuk menyimpan data pelanggan ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));
}

// Event Listener untuk Switch Diskon
document.getElementById("diskonSwitch").addEventListener("change", function () {
    document.getElementById("diskonFields").style.display = this.checked ? "block" : "none";
    document.getElementById("nilaiDiskon").value = "";
});

// Menangani Submit Form Pelanggan
document.getElementById("pelangganForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const pelanggan = {
        id: generatePelangganId(),
        nama: document.getElementById("namaPelanggan").value,
        peran: document.getElementById("peranPelanggan").value,
        noHp: document.getElementById("noHpPelanggan").value,
        alamat: document.getElementById("alamatPelanggan").value,
        diskon: document.getElementById("diskonSwitch").checked
            ? {
                jenis: document.getElementById("jenisDiskon").value,
                nilai: document.getElementById("nilaiDiskon").value,
            }
            : null,
        status: document.getElementById("statusPelanggan").checked ? "Aktif" : "Nonaktif",
    };

    pelangganData.push(pelanggan);
    saveToLocalStorage();
    tampilkanPelanggan();
    this.reset();
    document.getElementById("diskonFields").style.display = "none";
});

// Menampilkan Data Pelanggan
function tampilkanPelanggan() {
    const pelangganTable = document.getElementById("pelangganTable");
    pelangganTable.innerHTML = "";
    pelangganData.forEach((pelanggan) => {
        pelangganTable.innerHTML += `
            <tr>
                <td>${pelanggan.id}</td>
                <td>${pelanggan.nama}</td>
                <td>${pelanggan.peran}</td>
                <td>${pelanggan.noHp}</td>
                <td>${pelanggan.alamat}</td>
                <td>${pelanggan.diskon ? `${pelanggan.diskon.nilai} ${pelanggan.diskon.jenis}` : "Tidak Ada"}</td>
                <td>${pelanggan.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="hapusPelanggan('${pelanggan.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Menghapus Data Pelanggan
function hapusPelanggan(id) {
    pelangganData = pelangganData.filter((p) => p.id !== id);
    saveToLocalStorage();
    tampilkanPelanggan();
}

// Menangani Filter Pelanggan
document.getElementById("filterInput").addEventListener("input", function () {
    const filterValue = this.value.toLowerCase();
    const filteredData = pelangganData.filter((pelanggan) =>
        pelanggan.nama.toLowerCase().includes(filterValue)
    );
    tampilkanPelanggan(filteredData);
});

// Inisialisasi Data
tampilkanPelanggan();
