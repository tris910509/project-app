// Simpan data sementara
let keranjang = [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

// Muat dropdown pelanggan dan produk
function muatDropdowns() {
    const pelangganDropdown = document.getElementById("pelanggan");
    const produkDropdown = document.getElementById("produk");

    pelangganDropdown.innerHTML = `<option value="" selected>Pilih Pelanggan</option>`;
    pelangganData.forEach((pelanggan) => {
        pelangganDropdown.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });

    produkDropdown.innerHTML = `<option value="" selected>Pilih Produk</option>`;
    produkData.forEach((produk) => {
        produkDropdown.innerHTML += `<option value="${produk.id}">${produk.nama} (Stok: ${produk.stok})</option>`;
    });
}

// Tambah ke keranjang
document.getElementById("tambahKeranjang").addEventListener("click", function () {
    const produkId = document.getElementById("produk").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (!produkId || jumlah <= 0) {
        alert("Pilih produk dan masukkan jumlah yang valid!");
        return;
    }

    const produk = produkData.find((p) => p.id === produkId);

    if (produk.stok < jumlah) {
        alert("Stok tidak mencukupi!");
        return;
    }

    keranjang.push({ ...produk, jumlah, total: produk.harga * jumlah });
    produk.stok -= jumlah; // Kurangi stok
    muatDropdowns(); // Perbarui stok di dropdown
    tampilkanKeranjang();
});

// Tampilkan keranjang
function tampilkanKeranjang() {
    const keranjangTable = document.getElementById("keranjangTable");
    keranjangTable.innerHTML = "";

    let totalBelanja = 0;

    keranjang.forEach((item, index) => {
        totalBelanja += item.total;
        keranjangTable.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>Rp${item.total}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="hapusDariKeranjang(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    if (keranjang.length === 0) {
        keranjangTable.innerHTML = `<tr><td colspan="5" class="text-center">Keranjang Kosong</td></tr>`;
    }

    document.getElementById("totalBelanja").textContent = `Rp${totalBelanja}`;
}

// Hapus dari keranjang
function hapusDariKeranjang(index) {
    const produk = keranjang[index];
    const produkAsli = produkData.find((p) => p.id === produk.id);
    produkAsli.stok += produk.jumlah; // Kembalikan stok
    keranjang.splice(index, 1);
    muatDropdowns();
    tampilkanKeranjang();
}

// Selesaikan transaksi
document.getElementById("selesaikanTransaksi").addEventListener("click", function () {
    const pelangganId = document.getElementById("pelanggan").value;

    if (!pelangganId || keranjang.length === 0) {
        alert("Pilih pelanggan dan tambahkan item ke keranjang!");
        return;
    }

    const total = keranjang.reduce((sum, item) => sum + item.total, 0);
    const tanggal = new Date().toISOString().split("T")[0];

    transaksiData.push({
        id: `TRX-${Date.now()}`,
        tanggal,
        pelangganId,
        pelanggan: pelangganData.find((p) => p.id === pelangganId).nama,
        total,
        status: "Lunas",
        items: keranjang,
    });

    localStorage.setItem("transaksiData", JSON.stringify(transaksiData));
    keranjang = [];
    tampilkanKeranjang();
    tampilkanRiwayat();
    alert("Transaksi berhasil diselesaikan!");
});

// Tampilkan riwayat transaksi
function tampilkanRiwayat() {
    const riwayatTable = document.getElementById("riwayatTransaksi");
    riwayatTable.innerHTML = "";

    if (transaksiData.length === 0) {
        riwayatTable.innerHTML = `<tr><td colspan="4" class="text-center">Belum ada transaksi</td></tr>`;
        return;
    }

    transaksiData.forEach((trx) => {
        riwayatTable.innerHTML += `
            <tr>
                <td>${trx.tanggal}</td>
                <td>${trx.pelanggan}</td>
                <td>Rp${trx.total}</td>
                <td>${trx.status}</td>
            </tr>
        `;
    });
}

// Muat awal
muatDropdowns();
tampilkanRiwayat();
