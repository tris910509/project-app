let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];

// Muat pelanggan dan produk
function muatPelangganProduk() {
    const pelangganDropdown = document.getElementById("pelanggan");
    const produkDropdown = document.getElementById("produk");

    const pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
    const produkData = JSON.parse(localStorage.getItem("produkData")) || [];

    pelangganDropdown.innerHTML = `<option value="" disabled selected>Pilih pelanggan</option>`;
    produkDropdown.innerHTML = `<option value="" disabled selected>Pilih produk</option>`;

    pelangganData.forEach((pelanggan) => {
        pelangganDropdown.innerHTML += `<option value="${pelanggan.nama}">${pelanggan.nama}</option>`;
    });

    produkData.forEach((produk) => {
        produkDropdown.innerHTML += `<option value="${produk.id}" data-harga="${produk.harga}">${produk.nama}</option>`;
    });
}

// Tambah ke Keranjang
document.getElementById("transaksiForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const produkSelect = document.getElementById("produk");
    const pelangganSelect = document.getElementById("pelanggan");
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const produk = produkSelect.options[produkSelect.selectedIndex];
    const harga = parseFloat(produk.dataset.harga);
    const total = jumlah * harga;

    keranjang.push({
        pelanggan: pelangganSelect.value,
        produk: produk.text,
        jumlah: jumlah,
        harga: harga,
        total: total,
    });

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
    document.getElementById("transaksiForm").reset();
});

// Tampilkan Keranjang
function tampilkanKeranjang() {
    const keranjangTable = document.getElementById("keranjangTable");
    keranjangTable.innerHTML = "";

    let totalBayar = 0;

    keranjang.forEach((item, index) => {
        keranjangTable.innerHTML += `
            <tr>
                <td>${item.produk}</td>
                <td>${item.jumlah}</td>
                <td>${item.harga}</td>
                <td>${item.total}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="hapusDariKeranjang(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
        totalBayar += item.total;
    });

    document.getElementById("totalBayar").textContent = totalBayar;
}

// Hapus dari Keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

// Proses Pembayaran
function prosesPembayaran() {
    if (keranjang.length === 0) {
        tampilkanAlert("Keranjang kosong!", "warning");
        return;
    }

    transaksiData.push(...keranjang);
    localStorage.setItem("transaksiData", JSON.stringify(transaksiData));
    keranjang = [];
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    tampilkanAlert("Pembayaran berhasil diproses!", "success");
    tampilkanKeranjang();
}

// Tampilkan Alert
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

// Muat data awal
muatPelangganProduk();
tampilkanKeranjang();
