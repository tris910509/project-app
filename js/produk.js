// Inisialisasi Data Produk
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

// Fungsi untuk memuat dropdown
function populateProdukDropdowns() {
    const kategoriSelect = document.getElementById("kategoriProduk");
    const itemSelect = document.getElementById("itemProduk");
    const supplierSelect = document.getElementById("supplierProduk");

    // Ambil data dari LocalStorage
    const kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
    const itemData = JSON.parse(localStorage.getItem("itemData")) || [];
    const supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

    // Isi dropdown
    kategoriSelect.innerHTML = kategoriData.map(
        kategori => `<option value="${kategori.id}">${kategori.nama}</option>`
    ).join("");

    itemSelect.innerHTML = itemData.map(
        item => `<option value="${item.id}">${item.nama}</option>`
    ).join("");

    supplierSelect.innerHTML = supplierData.map(
        supplier => `<option value="${supplier.id}">${supplier.nama}</option>`
    ).join("");
}

// Fungsi untuk menyimpan produk
function simpanProduk(event) {
    event.preventDefault();

    const id = `PROD-${Date.now()}`;
    const nama = document.getElementById("namaProduk").value;
    const kategori = document.getElementById("kategoriProduk").value;
    const item = document.getElementById("itemProduk").value;
    const supplier = document.getElementById("supplierProduk").value;
    const harga = parseFloat(document.getElementById("hargaProduk").value);
    const stok = parseInt(document.getElementById("stokProduk").value);
    const diskonAktif = document.getElementById("diskonSwitch").checked;
    const tipeDiskon = document.getElementById("tipeDiskon").value;
    const nilaiDiskon = parseFloat(document.getElementById("nilaiDiskon").value) || 0;

    let hargaDiskon = harga;
    if (diskonAktif) {
        hargaDiskon = tipeDiskon === "rupiah" ? harga - nilaiDiskon : harga - (harga * (nilaiDiskon / 100));
        if (hargaDiskon < 0) hargaDiskon = 0;
    }

    produkData.push({
        id,
        nama,
        kategori,
        item,
        supplier,
        harga,
        stok,
        diskonAktif,
        tipeDiskon,
        nilaiDiskon,
        hargaDiskon
    });

    localStorage.setItem("produkData", JSON.stringify(produkData));
    document.getElementById("formProduk").reset();
    updateTabelProduk();
}

// Fungsi untuk memperbarui tabel produk
function updateTabelProduk() {
    const tabelBody = document.querySelector("#tabelProduk tbody");
    tabelBody.innerHTML = "";

    produkData.forEach((produk, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${produk.nama}</td>
                <td>${produk.kategori}</td>
                <td>${produk.item}</td>
                <td>${produk.supplier}</td>
                <td>Rp ${produk.harga.toLocaleString()}</td>
                <td>${produk.stok}</td>
                <td>Rp ${produk.hargaDiskon.toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduk('${produk.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusProduk('${produk.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tabelBody.innerHTML += row;
    });
}

// Fungsi untuk menghapus produk
function hapusProduk(id) {
    produkData = produkData.filter(produk => produk.id !== id);
    localStorage.setItem("produkData", JSON.stringify(produkData));
    updateTabelProduk();
}

// Event Listeners
document.getElementById("formProduk").addEventListener("submit", simpanProduk);
document.getElementById("diskonSwitch").addEventListener("change", function () {
    const isChecked = this.checked;
    document.getElementById("tipeDiskon").disabled = !isChecked;
    document.getElementById("nilaiDiskon").disabled = !isChecked;
});

// Panggil fungsi saat halaman dimuat
populateProdukDropdowns();
updateTabelProduk();
