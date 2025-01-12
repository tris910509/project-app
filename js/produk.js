let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

function muatDropdowns() {
    const kategoriDropdown = document.getElementById("kategori");
    const supplierDropdown = document.getElementById("supplier");

    kategoriDropdown.innerHTML = `<option value="" disabled selected>Pilih kategori</option>`;
    supplierDropdown.innerHTML = `<option value="" disabled selected>Pilih supplier</option>`;

    kategoriData.forEach((kategori) => {
        kategoriDropdown.innerHTML += `<option value="${kategori.id}">${kategori.nama}</option>`;
    });

    supplierData.forEach((supplier) => {
        supplierDropdown.innerHTML += `<option value="${supplier.id}">${supplier.nama}</option>`;
    });
}

// Tambah produk baru
document.getElementById("produkForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaProduk = document.getElementById("namaProduk").value.trim();
    const kategoriId = document.getElementById("kategori").value;
    const harga = parseInt(document.getElementById("harga").value);
    const stok = parseInt(document.getElementById("stok").value);
    const supplierId = document.getElementById("supplier").value;

    if (!namaProduk || !kategoriId || harga < 0 || stok < 0 || !supplierId) {
        tampilkanAlert("Semua bidang harus diisi dengan benar!", "danger");
        return;
    }

    const produkBaru = {
        id: "PROD-" + Date.now(),
        nama: namaProduk,
        kategoriId: kategoriId,
        harga: harga,
        stok: stok,
        supplierId: supplierId,
    };

    produkData.push(produkBaru);
    localStorage.setItem("produkData", JSON.stringify(produkData));
    tampilkanProduk();
    tampilkanAlert("Produk berhasil ditambahkan!", "success");
    document.getElementById("produkForm").reset();
});

// Tampilkan produk
function tampilkanProduk(filter = "") {
    const produkTable = document.getElementById("produkTable");
    produkTable.innerHTML = "";

    const produkTampil = produkData.filter((p) =>
        p.nama.toLowerCase().includes(filter.toLowerCase())
    );

    produkTampil.forEach((produk) => {
        const kategori = kategoriData.find((k) => k.id === produk.kategoriId);
        const supplier = supplierData.find((s) => s.id === produk.supplierId);

        const stokClass = produk.stok <= 5 ? "text-danger" : "";
        produkTable.innerHTML += `
            <tr>
                <td>${produk.id}</td>
                <td>${produk.nama}</td>
                <td>${kategori ? kategori.nama : "Tidak Ditemukan"}</td>
                <td>Rp${produk.harga}</td>
                <td class="${stokClass}">${produk.stok}</td>
                <td>${supplier ? supplier.nama : "Tidak Ditemukan"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduk('${produk.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusProduk('${produk.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Edit produk
function editProduk(id) {
    const produk = produkData.find((p) => p.id === id);
    if (!produk) return;

    document.getElementById("namaProduk").value = produk.nama;
    document.getElementById("kategori").value = produk.kategoriId;
    document.getElementById("harga").value = produk.harga;
    document.getElementById("stok").value = produk.stok;
    document.getElementById("supplier").value = produk.supplierId;

    produkData = produkData.filter((p) => p.id !== id);
    localStorage.setItem("produkData", JSON.stringify(produkData));
}

// Hapus produk
function hapusProduk(id) {
    produkData = produkData.filter((p) => p.id !== id);
    localStorage.setItem("produkData", JSON.stringify(produkData));
    tampilkanProduk();
    tampilkanAlert("Produk berhasil dihapus!", "success");
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

// Cari produk
document.getElementById("searchProduk").addEventListener("input", function () {
    tampilkanProduk(this.value);
});

muatDropdowns();
tampilkanProduk();
