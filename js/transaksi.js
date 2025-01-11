let keranjang = [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];

// Muat dropdown Pelanggan dan Produk
function muatDropdown() {
    const pelangganDropdown = document.getElementById("pelanggan");
    const produkDropdown = document.getElementById("produk");

    pelangganDropdown.innerHTML = `<option value="" disabled selected>Pilih pelanggan</option>`;
    produkDropdown.innerHTML = `<option value="" disabled selected>Pilih produk</option>`;

    pelangganData.forEach((pelanggan) => {
        pelangganDropdown.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });

    produkData.forEach((produk) => {
        produkDropdown.innerHTML += `<option value="${produk.id}">${produk.nama} - Rp${produk.harga}</option>`;
    });
}

// Tambah ke keranjang
document.getElementById("transaksiForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const produkId = document.getElementById("produk").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);

    const produk = produkData.find((p) => p.id === produkId);

    if (!produk || produk.stok < jumlah) {
        tampilkanAlert("Stok tidak mencukupi!", "danger");
        return;
    }

    const subtotal = produk.harga * jumlah;

    keranjang.push({
        id: produk.id,
        nama: produk.nama,
        harga: produk.harga,
        jumlah: jumlah,
        subtotal: subtotal,
    });

    tampilkanKeranjang();
    document.getElementById("transaksiForm").reset();
});

// Tampilkan keranjang
function tampilkanKeranjang() {
    const keranjangTable = document.getElementById("keranjangTable");
    keranjangTable.innerHTML = "";

    let total = 0;
    keranjang.forEach((item, index) => {
        total += item.subtotal;
        keranjangTable.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>Rp${item.subtotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="hapusKeranjang(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalHarga").textContent = `Rp${total}`;
}

// Hapus dari keranjang
function hapusKeranjang(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

// Proses pembayaran
document.getElementById("prosesPembayaran").addEventListener("click", function () {
    if (keranjang.length === 0) {
        tampilkanAlert("Keranjang kosong!", "danger");
        return;
    }

    keranjang.forEach((item) => {
        const produk = produkData.find((p) => p.id === item.id);
        if (produk) {
            produk.stok -= item.jumlah;
        }
    });

    localStorage.setItem("produkData", JSON.stringify(produkData));
    simpanLaporan(keranjang);
    tampilkanAlert("Pembayaran berhasil diproses!", "success");
    keranjang = [];
    tampilkanKeranjang();
});

// Simpan ke laporan
function simpanLaporan(transaksi) {
    let laporanData = JSON.parse(localStorage.getItem("laporanData")) || [];
    laporanData.push({
        id: `TRX${Date.now()}`,
        tanggal: new Date().toLocaleString(),
        transaksi: transaksi,
    });

    localStorage.setItem("laporanData", JSON.stringify(laporanData));
}

// Tampilkan alert
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

// Muat data saat halaman pertama kali dimuat
muatDropdown();
tampilkanKeranjang();
