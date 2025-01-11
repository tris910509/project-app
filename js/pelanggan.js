let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];

// Fungsi untuk memuat data pelanggan
function muatPelanggan() {
    const tabelPelanggan = document.getElementById("tabelPelanggan").getElementsByTagName('tbody')[0];
    tabelPelanggan.innerHTML = "";

    pelangganData.forEach((pelanggan, index) => {
        const row = tabelPelanggan.insertRow();
        row.innerHTML = `
            <td>${pelanggan.nama}</td>
            <td>${pelanggan.email}</td>
            <td>${pelanggan.peran}</td>
            <td>${pelanggan.diskon} ${pelanggan.diskonTipe}</td>
            <td>${pelanggan.keterangan || '-'}</td>
            <td><button class="btn btn-danger" onclick="hapusPelanggan(${index})">Hapus</button></td>
        `;
    });
}

// Fungsi untuk menambah pelanggan baru
function simpanPelanggan(event) {
    event.preventDefault();

    const nama = document.getElementById("namaPelanggan").value;
    const email = document.getElementById("emailPelanggan").value;
    const peran = document.getElementById("peranPelanggan").value;
    const diskon = parseFloat(document.getElementById("diskonPelanggan").value) || 0;
    const diskonSwitch = document.getElementById("diskonSwitch").checked;
    const keterangan = document.getElementById("keteranganPelanggan").value;

    const diskonTipe = diskonSwitch ? "Rupiah" : "Persen";

    if (!nama || !email || isNaN(diskon)) {
        tampilkanAlert("Semua field harus diisi dengan benar.", "danger");
        return;
    }

    // Simpan data pelanggan
    const pelanggan = { nama, email, peran, diskon, diskonTipe, keterangan };
    pelangganData.push(pelanggan);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));

    tampilkanAlert("Data pelanggan berhasil disimpan.", "success");
    muatPelanggan();

    document.getElementById("formPelanggan").reset();
}

// Fungsi untuk menghapus pelanggan
function hapusPelanggan(index) {
    pelangganData.splice(index, 1);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));
    muatPelanggan();
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

// Fungsi untuk toggle tipe diskon (Rupiah/Persen)
function toggleDiskonType() {
    const diskonSwitch = document.getElementById("diskonSwitch");
    const diskonLabel = diskonSwitch.nextElementSibling;

    if (diskonSwitch.checked) {
        diskonLabel.innerText = "Rupiah";
    } else {
        diskonLabel.innerText = "Persen";
    }
}

// Muat pelanggan saat halaman pertama kali dimuat
muatPelanggan();
tampilkanPelanggan();
