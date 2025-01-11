// Simulasi data kategori, item, dan supplier
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [
];

let itemData = JSON.parse(localStorage.getItem("itemData")) || [
];

let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [
];

let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

// Muat data kategori, item, dan supplier
function muatData() {
    const kategoriSelect = document.getElementById("kategoriProduk");
    const itemSelect = document.getElementById("itemProduk");
    const supplierSelect = document.getElementById("supplierProduk");

    kategoriSelect.innerHTML = "";
    itemSelect.innerHTML = "";
    supplierSelect.innerHTML = "";

    kategoriData.forEach((kategori, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = kategori.nama;
        kategoriSelect.appendChild(option);
    });

    itemData.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.nama;
        itemSelect.appendChild(option);
    });

    supplierData.forEach((supplier, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = supplier.nama;
        supplierSelect.appendChild(option);
    });
}

// Fungsi untuk menyimpan produk
function simpanProduk(event) {
    event.preventDefault();

    const namaProduk = document.getElementById("namaProduk").value;
    const kategoriIndex = document.getElementById("kategoriProduk").value;
    const itemIndex = document.getElementById("itemProduk").value;
    const supplierIndex = document.getElementById("supplierProduk").value;
    const hargaProduk = parseInt(document.getElementById("hargaProduk").value);
    const stokProduk = parseInt(document.getElementById("stokProduk").value);

    const produk = {
        nama: namaProduk,
        kategori: kategoriData[kategoriIndex].nama,
        item: itemData[itemIndex].nama,
        supplier: supplierData[supplierIndex].nama,
        harga: hargaProduk,
        stok: stokProduk
    };

    produkData.push(produk);
    localStorage.setItem("produkData", JSON.stringify(produkData));

    tampilkanAlert("Produk berhasil ditambahkan.", "success");
    tampilkanProduk();
    document.getElementById("formProduk").reset();
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

// Fungsi untuk menampilkan produk
function tampilkanProduk() {
    const tabelProduk = document.getElementById("tabelProduk").getElementsByTagName('tbody')[0];
    tabelProduk.innerHTML = "";

    produkData.forEach((produk, index) => {
        const row = tabelProduk.insertRow();
        row.innerHTML = `
            <td>${produk.nama}</td>
            <td>${produk.kategori}</td>
            <td>${produk.item}</td>
            <td>${produk.supplier}</td>
            <td>Rp${produk.harga}</td>
            <td>${produk.stok}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduk(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" onclick="hapusProduk(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// Fungsi untuk menghapus produk
function hapusProduk(index) {
    produkData.splice(index, 1);
    localStorage.setItem("produkData", JSON.stringify(produkData));
    tampilkanProduk();
}

// Fungsi untuk mengedit produk
function editProduk(index) {
    const produk = produkData[index];
    document.getElementById("namaProduk").value = produk.nama;
    document.getElementById("kategoriProduk").value = kategoriData.findIndex(k => k.nama === produk.kategori);
    document.getElementById("itemProduk").value = itemData.findIndex(i => i.nama === produk.item);
    document.getElementById("supplierProduk").value = supplierData.findIndex(s => s.nama === produk.supplier);
    document.getElementById("hargaProduk").value = produk.harga;
    document.getElementById("stokProduk").value = produk.stok;

    // Hapus produk yang lama
    produkData.splice(index, 1);
    localStorage.setItem("produkData", JSON.stringify(produkData));
    tampilkanProduk();
}

// Muat data saat halaman pertama kali dimuat
muatData();
tampilkanProduk();
