let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];


//=======================================================

// Muat data pelanggan
function muatPelanggan() {
    const pelangganSelect = document.getElementById("pelanggan");
    pelangganSelect.innerHTML = "";

    pelangganData.forEach((pelanggan, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${pelanggan.nama} (${pelanggan.email})`;
        pelangganSelect.appendChild(option);
    });
}

// Muat data produk
function muatProduk() {
    const produkSelect = document.getElementById("produk");
    produkSelect.innerHTML = "";

    produkData.forEach((produk, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${produk.nama} - Rp${produk.harga}`;
        produkSelect.appendChild(option);
    });
}

// Fungsi untuk mengubah form berdasarkan peran pelanggan
function ubahFormPelanggan() {
    const peran = document.getElementById("peranPelanggan").value;
    const formManual = document.getElementById("formManual");
    const formAuto = document.getElementById("formAuto");

    if (peran === "Umum") {
        formManual.classList.remove("d-none");
        formAuto.classList.add("d-none");
    } else {
        formManual.classList.add("d-none");
        formAuto.classList.remove("d-none");
    }
}

// Fungsi untuk menyimpan transaksi
function simpanTransaksi(event) {
    event.preventDefault();

    const peran = document.getElementById("peranPelanggan").value;
    let pelanggan;
    if (peran === "Umum") {
        pelanggan = {
            nama: document.getElementById("namaPelangganManual").value,
            email: document.getElementById("emailPelangganManual").value,
            noHandphone: document.getElementById("noHandphonePelangganManual").value,
            alamat: document.getElementById("alamatPelangganManual").value
        };
    } else {
        const pelangganIndex = document.getElementById("pelanggan").value;
        pelanggan = pelangganData[pelangganIndex];
    }

    const produkIndex = document.getElementById("produk").value;
    const produk = produkData[produkIndex];
    const jumlah = parseInt(document.getElementById("jumlahProduk").value);
    const harga = produk.harga;
    const total = harga * jumlah;

    const transaksi = {
        pelanggan: pelanggan.nama,
        email: pelanggan.email,
        produk: produk.nama,
        jumlah,
        harga,
        total,
        tanggal: new Date().toLocaleDateString()
    };

    transaksiData.push(transaksi);
    localStorage.setItem("transaksiData", JSON.stringify(transaksiData));

    tampilkanAlert("Transaksi berhasil disimpan.", "success");
    tampilkanTransaksi();
    document.getElementById("formTransaksi").reset();
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

// Fungsi untuk menampilkan transaksi
function tampilkanTransaksi() {
    const tabelTransaksi = document.getElementById("tabelTransaksi").getElementsByTagName('tbody')[0];
    tabelTransaksi.innerHTML = "";

    transaksiData.forEach((transaksi, index) => {
        const row = tabelTransaksi.insertRow();
        row.innerHTML = `
            <td>${transaksi.pelanggan} (${transaksi.email})</td>
            <td>${transaksi.produk}</td>
            <td>${transaksi.jumlah}</td>
            <td>Rp${transaksi.harga}</td>
            <td>Rp${transaksi.total}</td>
            <td>${transaksi.tanggal}</td>
            <td><button class="btn btn-danger" onclick="hapusTransaksi(${index})">Hapus</button></td>
        `;
    });
}

// Fungsi untuk menghapus transaksi
function hapusTransaksi(index) {
    transaksiData.splice(index, 1);
    localStorage.setItem("transaksiData", JSON.stringify(transaksiData));
    tampilkanTransaksi();
}

// Muat data saat halaman pertama kali dimuat
muatPelanggan();
muatProduk();
tampilkanTransaksi();


//=======================================================
// Tampilkan data transaksi
function tampilkanTransaksi() {
    const tabelTransaksi = document.getElementById("tabelTransaksi").getElementsByTagName('tbody')[0];
    tabelTransaksi.innerHTML = "";

    transaksiData.forEach((transaksi, index) => {
        const row = tabelTransaksi.insertRow();
        row.innerHTML = `
            <td>${transaksi.id}</td>
            <td>${transaksi.namaPelanggan}</td>
            <td>${transaksi.total}</td>
            <td>${transaksi.status}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="bukaModalPembayaran(${index})">
                    <i class="fas fa-money-check"></i> Pembayaran
                </button>
            </td>
        `;
    });
}

// Buka modal pembayaran
function bukaModalPembayaran(index) {
    const transaksi = transaksiData[index];
    document.getElementById("idTransaksiModal").value = transaksi.id;
    document.getElementById("metodeBayar").value = "";
    document.getElementById("nonTunaiFields").style.display = "none";
    const modal = new bootstrap.Modal(document.getElementById("modalPembayaran"));
    modal.show();
}

// Toggle input untuk metode non tunai
function toggleNonTunaiFields() {
    const metode = document.getElementById("metodeBayar").value;
    const nonTunaiFields = document.getElementById("nonTunaiFields");
    nonTunaiFields.style.display = metode === "Non Tunai" ? "block" : "none";
}

// Proses pembayaran
function prosesPembayaran(event) {
    event.preventDefault();

    const idTransaksi = document.getElementById("idTransaksiModal").value;
    const metodeBayar = document.getElementById("metodeBayar").value;

    const pembayaran = {
        idTransaksi: idTransaksi,
        metodeBayar: metodeBayar,
        namaPembayaran: document.getElementById("namaPembayaran").value || "-",
        jenisPembayaran: document.getElementById("jenisPembayaran").value || "-",
        nomorRekening: document.getElementById("nomorRekening").value || "-",
        buktiPembayaran: document.getElementById("buktiPembayaran").files[0]?.name || "-",
        keterangan: document.getElementById("keteranganPembayaran").value || "-",
        status: metodeBayar === "Tunai" ? "Lunas" : "Proses",
    };

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));

    // Update status transaksi
    const transaksi = transaksiData.find((t) => t.id === idTransaksi);
    if (transaksi) {
        transaksi.status = pembayaran.status;
        localStorage.setItem("transaksiData", JSON.stringify(transaksiData));
    }

    tampilkanTransaksi();
    alert("Pembayaran berhasil diproses!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalPembayaran"));
    modal.hide();
}

// Inisialisasi
muatPelanggan();
muatProduk();
tampilkanTransaksi();
