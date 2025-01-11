let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let keranjang = [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];

// Peran pelanggan
document.getElementById("peran").addEventListener("change", function () {
    const peran = this.value;
    const pelangganInput = document.getElementById("pelangganInput");
    const filterButton = document.getElementById("filterPelanggan");

    if (peran === "Umum") {
        pelangganInput.placeholder = "Masukkan Nama Pelanggan Baru";
        filterButton.disabled = true;
    } else {
        pelangganInput.placeholder = "Masukkan ID/Nama Pelanggan";
        filterButton.disabled = false;
    }
});

// Tambah pelanggan baru untuk peran "Umum"
function tambahPelangganBaru(nama) {
    const pelangganBaru = {
        id: `PLG-${Date.now()}`,
        nama,
    };
    pelangganData.push(pelangganBaru);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));
    return pelangganBaru;
}

// Filter pelanggan untuk peran "CosMem" dan "PelMem"
document.getElementById("filterPelanggan").addEventListener("click", function () {
    const input = document.getElementById("pelangganInput").value.toLowerCase();
    const pelanggan = pelangganData.find(
        (p) => p.id.toLowerCase() === input || p.nama.toLowerCase().includes(input)
    );

    if (pelanggan) {
        alert(`Pelanggan ditemukan: ${pelanggan.nama}`);
    } else {
        alert("Pelanggan tidak ditemukan!");
    }
});

// Selesaikan transaksi
document.getElementById("selesaikanTransaksi").addEventListener("click", function () {
    const peran = document.getElementById("peran").value;
    const pelangganInput = document.getElementById("pelangganInput").value;
    let pelanggan;

    if (peran === "Umum") {
        pelanggan = tambahPelangganBaru(pelangganInput);
    } else {
        pelanggan = pelangganData.find(
            (p) => p.id.toLowerCase() === pelangganInput.toLowerCase() || p.nama.toLowerCase().includes(pelangganInput)
        );
        if (!pelanggan) {
            alert("Pelanggan tidak ditemukan!");
            return;
        }
    }

    // Simpan transaksi
    const total = keranjang.reduce((sum, item) => sum + item.total, 0);
    transaksiData.push({
        id: `TRX-${Date.now()}`,
        tanggal: new Date().toISOString().split("T")[0],
        pelangganId: pelanggan.id,
        pelanggan: pelanggan.nama,
        total,
        status: "Lunas",
        items: keranjang,
    });
    localStorage.setItem("transaksiData", JSON.stringify(transaksiData));
    alert("Transaksi selesai!");
});
