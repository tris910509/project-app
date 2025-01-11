let keranjang = [];
let transaksiData = [];
const produkData = [
];
const pelangganData = [
];

// Populate data ke dropdown
function initForm() {
    const pelangganSelect = document.getElementById("pelanggan");
    const produkSelect = document.getElementById("produk");

    pelangganData.forEach((pelanggan) => {
        pelangganSelect.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });

    produkData.forEach((produk) => {
        produkSelect.innerHTML += `<option value="${produk.id}">${produk.nama}</option>`;
    });
}

// Tambah item ke keranjang
document.getElementById("tambahKeranjang").addEventListener("click", function () {
    const produkId = document.getElementById("produk").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const produk = produkData.find((p) => p.id === produkId);

    if (!produkId || !jumlah || jumlah <= 0) {
        alert("Pilih produk dan masukkan jumlah yang valid!");
        return;
    }

    if (produk.stok < jumlah) {
        alert("Stok produk tidak mencukupi!");
        return;
    }

    keranjang.push({
        id: produk.id,
        nama: produk.nama,
        harga: produk.harga,
        jumlah,
        total: produk.harga * jumlah,
    });

    produk.stok -= jumlah;
    tampilkanKeranjang();
});

// Tampilkan keranjang
function tampilkanKeranjang() {
    const keranjangTable = document.getElementById("keranjangTable");
    keranjangTable.innerHTML = "";

    let subtotal = 0;

    keranjang.forEach((item, index) => {
        subtotal += item.total;
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

    const pajak = subtotal * 0.1;
    const diskon = parseFloat(document.getElementById("diskon").value || 0) / 100 * subtotal;
    const totalBayar = subtotal + pajak - diskon;

    document.getElementById("subtotal").textContent = `Rp${subtotal}`;
    document.getElementById("pajak").textContent = `Rp${pajak}`;
    document.getElementById("potongan").textContent = `Rp${diskon}`;
    document.getElementById("totalBayar").textContent = `Rp${totalBayar}`;
}

// Hapus item dari keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}
