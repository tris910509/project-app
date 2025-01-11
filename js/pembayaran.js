// Data metode pembayaran disimpan di localStorage
let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

// Fungsi untuk menyimpan metode pembayaran
function simpanPembayaran(event) {
    event.preventDefault();

    const namaPembayaran = document.getElementById("namaPembayaran").value;
    const jenisPembayaran = document.getElementById("jenisPembayaran").value;
    const nomorRekening = document.getElementById("nomorRekening").value;
    const keteranganPembayaran = document.getElementById("keteranganPembayaran").value;

    const pembayaran = {
        nama: namaPembayaran,
        jenis: jenisPembayaran,
        nomorRekening: nomorRekening,
        keterangan: keteranganPembayaran
    };

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));

    tampilkanAlert("Metode Pembayaran berhasil ditambahkan.", "success");
    tampilkanPembayaran();
    document.getElementById("formPembayaran").reset();
}

// Fungsi untuk menampilkan alert
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

// Fungsi untuk menampilkan data metode pembayaran
function tampilkanPembayaran() {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName('tbody')[0];
    tabelPembayaran.innerHTML = "";

    pembayaranData.forEach((pembayaran, index) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.nama}</td>
            <td>${pembayaran.jenis}</td>
            <td>${pembayaran.nomorRekening || '-'}</td>
            <td>${pembayaran.keterangan || '-'}</td>
            <td>
                <button class="btn btn-warning" onclick="editPembayaran(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" onclick="hapusPembayaran(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// Fungsi untuk menghapus metode pembayaran
function hapusPembayaran(index) {
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Fungsi untuk mengedit metode pembayaran
function editPembayaran(index) {
    const pembayaran = pembayaranData[index];
    document.getElementById("namaPembayaran").value = pembayaran.nama;
    document.getElementById("jenisPembayaran").value = pembayaran.jenis;
    document.getElementById("nomorRekening").value = pembayaran.nomorRekening;
    document.getElementById("keteranganPembayaran").value = pembayaran.keterangan;

    // Hapus pembayaran yang lama
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Muat data saat halaman pertama kali dimuat
tampilkanPembayaran();

// Data metode pembayaran disimpan di localStorage
let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

// Fungsi untuk menyimpan metode pembayaran
function simpanPembayaran(event) {
    event.preventDefault();

    const namaPembayaran = document.getElementById("namaPembayaran").value;
    const jenisPembayaran = document.getElementById("jenisPembayaran").value;
    const nomorRekening = document.getElementById("nomorRekening").value;
    const keteranganPembayaran = document.getElementById("keteranganPembayaran").value;

    const pembayaran = {
        nama: namaPembayaran,
        jenis: jenisPembayaran,
        nomorRekening: nomorRekening,
        keterangan: keteranganPembayaran
    };

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));

    tampilkanAlert("Metode Pembayaran berhasil ditambahkan.", "success");
    tampilkanPembayaran();
    document.getElementById("formPembayaran").reset();
}

// Fungsi untuk menampilkan alert
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

// Fungsi untuk menampilkan data metode pembayaran
function tampilkanPembayaran() {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName('tbody')[0];
    tabelPembayaran.innerHTML = "";

    pembayaranData.forEach((pembayaran, index) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.nama}</td>
            <td>${pembayaran.jenis}</td>
            <td>${pembayaran.nomorRekening || '-'}</td>
            <td>${pembayaran.keterangan || '-'}</td>
            <td>
                <button class="btn btn-warning" onclick="editPembayaran(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" onclick="hapusPembayaran(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// Fungsi untuk menghapus metode pembayaran
function hapusPembayaran(index) {
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Fungsi untuk mengedit metode pembayaran
function editPembayaran(index) {
    const pembayaran = pembayaranData[index];
    document.getElementById("namaPembayaran").value = pembayaran.nama;
    document.getElementById("jenisPembayaran").value = pembayaran.jenis;
    document.getElementById("nomorRekening").value = pembayaran.nomorRekening;
    document.getElementById("keteranganPembayaran").value = pembayaran.keterangan;

    // Hapus pembayaran yang lama
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Muat data saat halaman pertama kali dimuat
tampilkanPembayaran();

