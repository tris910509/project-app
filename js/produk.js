let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

// Populasi dropdown relasi data
function populateDropdowns() {
    const kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
    const itemData = JSON.parse(localStorage.getItem("itemData")) || [];
    const supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

    const kategoriDropdown = document.getElementById("kategoriProduk");
    const itemDropdown = document.getElementById("itemProduk");
    const supplierDropdown = document.getElementById("supplierProduk");

    kategoriDropdown.innerHTML = `<option value="">Pilih Kategori</option>` + 
        kategoriData.map(k => `<option value="${k.id}">${k.nama}</option>`).join("");

    itemDropdown.innerHTML = `<option value="">Pilih Item</option>` + 
        itemData.map(i => `<option value="${i.id}">${i.nama}</option>`).join("");

    supplierDropdown.innerHTML = `<option value="">Pilih Supplier</option>` + 
        supplierData.map(s => `<option value="${s.id}">${s.nama}</option>`).join("");
}

// Simpan produk
function simpanProduk(event) {
    event.preventDefault();

    const nama = document.getElementById("namaProduk").value.trim();
    const kategori = document.getElementById("kategoriProduk").value;
    const item = document.getElementById("itemProduk").value;
    const supplier = document.getElementById("supplierProduk").value;
    const harga = parseFloat(document.getElementById("hargaProduk").value);
    const stok = parseInt(document.getElementById("stokProduk").value);
    const diskonAktif = document.getElementById("diskonSwitch").checked;
    const tipeDiskon = document.getElementById("tipeDiskon").value;
    const nilaiDiskon = parseFloat(document.getElementById("nilaiDiskon").value) || 0;

    if (!nama || !kategori || !item || !supplier || isNaN(harga) || harga <= 0 || isNaN(stok) || stok < 0) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    let hargaDiskon = harga;
    if (diskonAktif) {
        hargaDiskon = tipeDiskon === "rupiah" ? harga - nilaiDiskon : harga - (harga * (nilaiDiskon / 100));
        if (hargaDiskon < 0) hargaDiskon = 0;
    }

    const id = `PROD-${Date.now()}`;
    produkData.push({ id, nama, kategori, item, supplier, harga, stok, hargaDiskon });
    localStorage.setItem("produkData", JSON.stringify(produkData));

    document.getElementById("formProduk").reset();
    document.getElementById("diskonFields").classList.add("d-none");
    updateTabelProduk();
}

// Update tabel produk
function updateTabelProduk() {
    const tbody = document.querySelector("#tabelProduk tbody");
    tbody.innerHTML = "";

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
        tbody.innerHTML += row;
    });
}

// Hapus produk
function hapusProduk(id) {
    if (confirm("Yakin ingin menghapus produk ini?")) {
        produkData = produkData.filter(p => p.id !== id);
        localStorage.setItem("produkData", JSON.stringify(produkData));
        updateTabelProduk();
    }
}

// Diskon switch toggle
document.getElementById("diskonSwitch").addEventListener("change", function () {
    const diskonFields = document.getElementById("diskonFields");
    if (this.checked) {
        diskonFields.classList.remove("d-none");
    } else {
        diskonFields.classList.add("d-none");
    }
});

// Inisialisasi
populateDropdowns();
updateTabelProduk();
document.getElementById("formProduk").addEventListener("submit", simpanProduk);
