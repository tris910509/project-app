let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let kategoriData = JSON.parse(localStorage.getItem("kategoriData")) || [];
let itemData = JSON.parse(localStorage.getItem("itemData")) || [];
let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Inisialisasi pilihan dropdown
function inisialisasiDropdown() {
    const kategoriSelect = document.getElementById("kategoriProduk");
    const itemSelect = document.getElementById("itemProduk");
    const supplierSelect = document.getElementById("supplierProduk");

    kategoriSelect.innerHTML = '<option value="">Pilih Kategori</option>';
    itemSelect.innerHTML = '<option value="">Pilih Item</option>';
    supplierSelect.innerHTML = '<option value="">Pilih Supplier</option>';

    kategoriData.forEach(k => {
        kategoriSelect.innerHTML += `<option value="${k.id}">${k.nama}</option>`;
    });

    itemData.forEach(i => {
        itemSelect.innerHTML += `<option value="${i.id}">${i.nama}</option>`;
    });

    supplierData.forEach(s => {
        supplierSelect.innerHTML += `<option value="${s.id}">${s.nama}</option>`;
    });
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
    const diskonAktif = document.getElementById("aktifkanDiskon").checked;
    let diskon = 0, tipeDiskon = "", hargaDiskon = harga;

    if (diskonAktif) {
        tipeDiskon = document.getElementById("tipeDiskon").value;
        diskon = parseFloat(document.getElementById("nilaiDiskon").value);
        if (tipeDiskon === "rupiah") {
            hargaDiskon = harga - diskon;
        } else if (tipeDiskon === "persen") {
            hargaDiskon = harga - (harga * (diskon / 100));
        }
    }

    if (!nama || !kategori || !item || !supplier || isNaN(harga) || isNaN(stok)) {
        alert("Mohon isi semua data dengan benar!");
        return;
    }

    const id = `PROD-${Date.now()}`;
    produkData.push({ id, nama, kategori, item, supplier, harga, stok, tipeDiskon, diskon, hargaDiskon });
    localStorage.setItem("produkData", JSON.stringify(produkData));
    document.getElementById("formProduk").reset();
    document.getElementById("diskonContainer").classList.add("d-none");
    updateTabelProduk();
}

// Update tabel produk
function updateTabelProduk() {
    const tbody = document.querySelector("#tabelProduk tbody");
    tbody.innerHTML = "";

    produkData.forEach((produk, index) => {
        const kategoriNama = kategoriData.find(k => k.id === produk.kategori)?.nama || "-";
        const itemNama = itemData.find(i => i.id === produk.item)?.nama || "-";
        const supplierNama = supplierData.find(s => s.id === produk.supplier)?.nama || "-";

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${produk.nama}</td>
                <td>${kategoriNama}</td>
                <td>${itemNama}</td>
                <td>${supplierNama}</td>
                <td>Rp ${produk.harga.toLocaleString()}</td>
                <td>${produk.stok}</td>
                <td>${produk.diskon > 0 ? `${produk.diskon} ${produk.tipeDiskon === "rupiah" ? "Rp" : "%"}` : "-"}</td>
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

// Diskon switch
document.getElementById("aktifkanDiskon").addEventListener("change", function () {
    document.getElementById("diskonContainer").classList.toggle("d-none", !this.checked);
});

// Inisialisasi
inisialisasiDropdown();
updateTabelProduk();
document.getElementById("formProduk").addEventListener("submit", simpanProduk);
