let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

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
