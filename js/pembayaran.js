let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

// Membuat ID Pembayaran unik
function generateIdPembayaran() {
    return "PB" + Date.now();
}

// Menampilkan data pembayaran di tabel
function tampilkanPembayaran() {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName("tbody")[0];
    tabelPembayaran.innerHTML = "";

    pembayaranData.forEach((data, index) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${data.idPembayaran}</td>
            <td>${data.idTransaksi}</td>
            <td>${data.namaTransaksi}</td>
            <td>Rp ${data.totalHarusDibayar.toLocaleString()}</td>
            <td>${data.status}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editPembayaran(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusPembayaran(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// Tambah data pembayaran
function tambahPembayaran(event) {
    event.preventDefault();

    const idPembayaran = document.getElementById("idPembayaran").value || generateIdPembayaran();
    const idTransaksi = document.getElementById("idTransaksi").value;
    const namaTransaksi = document.getElementById("namaTransaksi").value;
    const totalHarusDibayar = parseFloat(document.getElementById("totalHarusDibayar").value);
    const status = document.getElementById("statusPembayaran").value;

    // Validasi
    if (!idTransaksi || !namaTransaksi || !totalHarusDibayar || !status) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const pembayaranBaru = {
        idPembayaran,
        idTransaksi,
        namaTransaksi,
        totalHarusDibayar,
        status,
    };

    pembayaranData.push(pembayaranBaru);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
    document.getElementById("formPembayaran").reset();
    alert("Data pembayaran berhasil ditambahkan.");
}

// Hapus data pembayaran
function hapusPembayaran(index) {
    if (confirm("Yakin ingin menghapus data pembayaran ini?")) {
        pembayaranData.splice(index, 1);
        localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
        tampilkanPembayaran();
    }
}

// Edit data pembayaran
function editPembayaran(index) {
    const data = pembayaranData[index];
    document.getElementById("idPembayaran").value = data.idPembayaran;
    document.getElementById("idTransaksi").value = data.idTransaksi;
    document.getElementById("namaTransaksi").value = data.namaTransaksi;
    document.getElementById("totalHarusDibayar").value = data.totalHarusDibayar;
    document.getElementById("statusPembayaran").value = data.status;

    // Hapus data lama
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Inisialisasi tabel
tampilkanPembayaran();
