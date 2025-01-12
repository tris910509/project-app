// Variabel penyimpanan data
let produkIdCounter = JSON.parse(localStorage.getItem("produkIdCounter")) || 1;
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
let itemData = JSON.parse(localStorage.getItem("itemData")) || [];
let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Fungsi untuk menghasilkan ID unik
function generateProdukId() {
    const id = `PROD-${produkIdCounter++}`;
    localStorage.setItem("produkIdCounter", JSON.stringify(produkIdCounter)); // Simpan ID counter
    return id;
}

// Fungsi untuk menyimpan produk ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("produkData", JSON.stringify(produkData));
}

// Mengisi dropdown kategori, item, dan supplier
function populateDropdowns() {
    const kategoriSelect = document.getElementById("kategoriProduk");
    const itemSelect = document.getElementById("itemProduk");
    const supplierSelect = document.getElementById("supplierProduk");

    kategoriSelect.innerHTML = kategoriData.map(k => `<option value="${k.id}">${k.nama}</option>`).join("");
    itemSelect.innerHTML = itemData.map(i => `<option value="${i.id}">${i.nama}</option>`).join("");
    supplierSelect.innerHTML = supplierData.map(s => `<option value="${s.id}">${s.nama}</option>`).join("");
}

// Menangani submit form produk
document.getElementById("produkForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const editProdukId = document.getElementById("editProdukId").value;

    const produk = {
        id: editProdukId || generateProdukId(),
        nama: document.getElementById("namaProduk").value,
        kategori: document.getElementById("kategoriProduk").value,
        item: document.getElementById("itemProduk").value,
        supplier: document.getElementById("supplierProduk").value,
        harga: parseFloat(document.getElementById("hargaProduk").value),
        stok: parseInt(document.getElementById("stokProduk").value, 10),
    };

    if (editProdukId) {
        const index = produkData.findIndex(p => p.id === editProdukId);
        produkData[index] = produk;
        document.getElementById("saveProdukButton").innerHTML = '<i class="fas fa-save"></i> Simpan Produk';
    } else {
        produkData.push(produk);
    }

    saveToLocalStorage();
    tampilkanProduk();
    alertMessage("Produk berhasil disimpan!", "success");
    this.reset();
});

// Menampilkan daftar produk
function tampilkanProduk() {
    const produkTable = document.getElementById("produkTable");
    produkTable.innerHTML = produkData.map(produk => {
        const kategori = kategoriData.find(k => k.id === produk.kategori)?.nama || "Tidak Diketahui";
        const item = itemData.find(i => i.id === produk.item)?.nama || "Tidak Diketahui";
        const supplier = supplierData.find(s => s.id === produk.supplier)?.nama || "Tidak Diketahui";

        return `
            <tr>
                <td>${produk.id}</td>
                <td>${produk.nama}</td>
                <td>${kategori}</td>
                <td>${item}</td>
                <td>${supplier}</td>
                <td>Rp ${produk.harga.toLocaleString()}</td>
                <td>${produk.stok}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduk('${produk.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusProduk('${produk.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    }).join("");
}

// Menghapus produk
function hapusProduk(id) {
    if (confirm("Yakin ingin menghapus produk ini?")) {
        produkData = produkData.filter(p => p.id !== id);
        saveToLocalStorage();
        tampilkanProduk();
        alertMessage("Produk berhasil dihapus!", "danger");
    }
}

// Mengedit produk
function editProduk(id) {
    const produk = produkData.find(p => p.id === id);
    document.getElementById("editProdukId").value = produk.id;
    document.getElementById("namaProduk").value = produk.nama;
    document.getElementById("kategoriProduk").value = produk.kategori;
    document.getElementById("itemProduk").value = produk.item;
    document.getElementById("supplierProduk").value = produk.supplier;
    document.getElementById("hargaProduk").value = produk.harga;
    document.getElementById("stokProduk").value = produk.stok;
    document.getElementById("saveProdukButton").innerHTML = '<i class="fas fa-save"></i> Perbarui Produk';
}

// Menampilkan alert
function alertMessage(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Inisialisasi
populateDropdowns();
tampilkanProduk();
