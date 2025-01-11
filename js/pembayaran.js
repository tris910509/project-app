let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

// Fungsi untuk menampilkan data transaksi di tabel
function tampilkanTransaksi() {
    const tabelTransaksi = document.getElementById("tabelTransaksi").getElementsByTagName("tbody")[0];
    tabelTransaksi.innerHTML = "";

    transaksiData.forEach((transaksi, index) => {
        const row = tabelTransaksi.insertRow();
        row.innerHTML = `
            <td>${transaksi.id}</td>
            <td>${transaksi.namaTransaksi}</td>
            <td>${transaksi.total}</td>
            <td>${transaksi.status}</td>
            <td>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalPembayaran" onclick="bukaPembayaran('${transaksi.id}')">Pembayaran</button>
            </td>
        `;
    });
}

// Buka modal pembayaran dengan data transaksi
function bukaPembayaran(idTransaksi) {
    const transaksi = transaksiData.find((t) => t.id === idTransaksi);
    document.getElementById("metodePembayaran").value = "Tunai";
    toggleNonTunaiFields();
    tampilkanPembayaran(transaksi.id);
}

// Tampilkan data pembayaran dalam modal
function tampilkanPembayaran(idTransaksi) {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName("tbody")[0];
    tabelPembayaran.innerHTML = "";

    const pembayaranTerkait = pembayaranData.filter((p) => p.idTransaksi === idTransaksi);

    pembayaranTerkait.forEach((pembayaran) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.idPembayaran}</td>
            <td>${pembayaran.metodePembayaran}</td>
            <td>${pembayaran.total}</td>
            <td>${pembayaran.status}</td>
        `;
    });
}

// Toggle field untuk pembayaran non-tunai
function toggleNonTunaiFields() {
    const metode = document.getElementById("metodePembayaran").value;
    document.getElementById("nonTunaiFields").style.display = metode === "Non-Tunai" ? "block" : "none";
}

// Proses pembayaran
function prosesPembayaran() {
    const metode = document.getElementById("metodePembayaran").value;
    const pembayaran = {
        idPembayaran: "PAY-" + Date.now(),
        idTransaksi: document.getElementById("tabelTransaksi").getAttribute("data-id-transaksi"),
        metodePembayaran: metode,
        total: 10000, // Ambil dari data transaksi
        status: metode === "Tunai" ? "Lunas" : "Belum Konfirmasi",
    };

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran(pembayaran.idTransaksi);
    alert("Pembayaran berhasil diproses.");
}

tampilkanTransaksi();
