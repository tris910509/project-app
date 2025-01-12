let produkIdCounter = JSON.parse(localStorage.getItem("produkIdCounter")) || 1;
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
const kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
const itemData = JSON.parse(localStorage.getItem("itemData")) || [];
const supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Fungsi untuk menghasilkan ID unik produk
function generateProductId() {
    const id = `PROD-${produkIdCounter++}`;
    localStorage.setItem("produkIdCounter", JSON.stringify(produkIdCounter));
    return id;
}

// Fungsi untuk menyimpan data produk ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("produkData", JSON.stringify(produkData));
}


// Load Dropdown Data
function muatDropdowns() {
    const kategoriDropdown = document.getElementById("kategori");
    const itemDropdown = document.getElementById("item");
    const supplierDropdown = document.getElementById("supplier");

    kategoriDropdown.innerHTML = '<option value="" disabled selected>Pilih kategori</option>';
    itemDropdown.innerHTML = '<option value="" disabled selected>Pilih item</option>';
    supplierDropdown.innerHTML = '<option value="" disabled selected>Pilih supplier</option>';

    kategoriData.forEach((kategori) => {
        kategoriDropdown.innerHTML += `<option value="${kategori.id}">${kategori.nama}</option>`;
    });

    itemData.forEach((item) => {
        itemDropdown.innerHTML += `<option value="${item.id}">${item.nama}</option>`;
    });

    supplierData.forEach((supplier) => {
        supplierDropdown.innerHTML += `<option value="${supplier.id}">${supplier.nama}</option>`;
    });
}

// Hitung Harga Akhir
document.getElementById("diskonTipe").addEventListener("change", function () {
    document.getElementById("diskon").disabled = this.value === "";
    hitungHargaAkhir();
});

document.getElementById("diskon").addEventListener("input", hitungHargaAkhir);
document.getElementById("harga").addEventListener("input", hitungHargaAkhir);

function hitungHargaAkhir() {
    const harga = parseFloat(document.getElementById("harga").value) || 0;
    const diskonTipe = document.getElementById("diskonTipe").value;
    const diskon = parseFloat(document.getElementById("diskon").value) || 0;
    let hargaAkhir = harga;

    if (diskonTipe === "Rupiah") {
        hargaAkhir = harga - diskon;
    } else if (diskonTipe === "Persen") {
        hargaAkhir = harga - (harga * diskon / 100);
    }

    document.getElementById("hargaAkhir").value = Math.max(hargaAkhir, 0);
}

// Simpan Produk
document.getElementById("produkForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const produk = {
        id: "PROD-" + Date.now(),
        nama: document.getElementById("namaProduk").value,
        kategoriId: document.getElementById("kategori").value,
        itemId: document.getElementById("item").value,
        supplierId: document.getElementById("supplier").value,
        harga: parseFloat(document.getElementById("harga").value),
        diskonTipe: document.getElementById("diskonTipe").value,
        diskon: parseFloat(document.getElementById("diskon").value) || 0,
        hargaAkhir: parseFloat(document.getElementById("hargaAkhir").value),
        stok: parseInt(document.getElementById("stok").value),
    };

    produkData.push(produk);
    tampilkanProduk();
    this.reset();
    document.getElementById("hargaAkhir").value = "";
});

// Tampilkan Produk
function tampilkanProduk() {
    const produkTable = document.getElementById("produkTable");
    produkTable.innerHTML = "";

    produkData.forEach((produk) => {
        const kategori = kategoriData.find((k) => k.id === produk.kategoriId)?.nama || "Tidak Ditemukan";
        const item = itemData.find((i) => i.id === produk.itemId)?.nama || "Tidak Ditemukan";
        const supplier = supplierData.find((s) => s.id === produk.supplierId)?.nama || "Tidak Ditemukan";

        produkTable.innerHTML += `
            <tr>
                <td>${produk.id}</td>
                <td>${produk.nama}</td>
                <td>${kategori}</td>
                <td>${item}</td>
                <td>Rp${produk.harga}</td>
                <td>${produk.diskonTipe} ${produk.diskon}</td>
                <td>Rp${produk.hargaAkhir}</td>
                <td>${produk.stok}</td>
                <td>${supplier}</td>
                <td>
                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;

        
muatDropdowns();   
tampilkanProduk();
