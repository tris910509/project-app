let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];
// Keranjang Belanja
let keranjang = [];
let subtotal = 0;

// Load Produk ke Dropdown
document.addEventListener("DOMContentLoaded", () => {
    const produkSelect = document.getElementById("produkTransaksi");
    produkData.forEach((produk) => {
        const option = document.createElement("option");
        option.value = produk.id;
        option.textContent = produk.nama;
        produkSelect.appendChild(option);
    });
});

// Toggle Input Berdasarkan Peran
function togglePeranFields() {
    const peran = document.getElementById("peranTransaksi").value;
    const umumFields = document.getElementById("umumFields");

    if (peran === "Umum") {
        umumFields.style.display = "block";
    } else {
        umumFields.style.display = "none";
    }
}

// Pilih Produk dan Tampilkan Detail
function pilihProduk() {
    const produkId = document.getElementById("produkTransaksi").value;
    const produk = produkData.find((p) => p.id == produkId);

    if (produk) {
        document.getElementById("produkInfo").style.display = "block";
        document.getElementById("namaProduk").textContent = produk.nama;
        document.getElementById("itemProduk").textContent = produk.item;
        document.getElementById("hargaProduk").textContent = produk.harga.toLocaleString();
        document.getElementById("stokProduk").textContent = produk.stok;
    } else {
        document.getElementById("produkInfo").style.display = "none";
    }
}

// Simpan Produk ke Keranjang
function simpanKeKeranjang() {
    const produkId = document.getElementById("produkTransaksi").value;
    const produk = produkData.find((p) => p.id == produkId);

    if (!produk) {
        alert("Silakan pilih produk terlebih dahulu.");
        return;
    }

    const jumlah = parseInt(prompt("Masukkan jumlah:", "1"), 10);
    if (isNaN(jumlah) || jumlah <= 0 || jumlah > produk.stok) {
        alert("Jumlah tidak valid atau melebihi stok.");
        return;
    }

    const potongan = prompt("Potongan Harga (Rp / Persen): Contoh '5000' atau '10%' (Opsional)", "0");
    let potonganRp = 0;

    if (potongan.includes("%")) {
        const persen = parseFloat(potongan.replace("%", ""));
        if (!isNaN(persen) && persen > 0) {
            potonganRp = (produk.harga * jumlah * persen) / 100;
        }
    } else {
        potonganRp = parseFloat(potongan) || 0;
    }

    const total = produk.harga * jumlah - potonganRp;

    keranjang.push({
        id: produk.id,
        nama: produk.nama,
        item: produk.item,
        harga: produk.harga,
        jumlah: jumlah,
        potongan: potonganRp,
        total: total,
    });

    produk.stok -= jumlah;
    updateKeranjang();
}

// Update Tabel Keranjang
function updateKeranjang() {
    const tabelBody = document.querySelector("#tabelKeranjang tbody");
    tabelBody.innerHTML = "";

    subtotal = 0;
    keranjang.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.item}</td>
            <td>${item.harga.toLocaleString()}</td>
            <td>${item.jumlah}</td>
            <td>${item.potongan.toLocaleString()}</td>
            <td>${item.total.toLocaleString()}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="hapusItemKeranjang(${index})">Hapus</button>
            </td>
        `;
        tabelBody.appendChild(row);

        subtotal += item.total;
    });

    document.getElementById("subtotal").textContent = subtotal.toLocaleString();
    document.getElementById("jumlahBayar").textContent = subtotal.toLocaleString();
    document.getElementById("kembalian").textContent = "0";
}

// Hapus Item dari Keranjang
function hapusItemKeranjang(index) {
    const item = keranjang[index];
    const produk = produkData.find((p) => p.id == item.id);
    if (produk) {
        produk.stok += item.jumlah;
    }

    keranjang.splice(index, 1);
    updateKeranjang();
}

// Proses Pembayaran
function prosesPembayaran() {
    const metode = document.getElementById("metodePembayaran").value;
    if (metode === "Tunai") {
        const bayar = parseInt(prompt("Masukkan jumlah uang yang dibayarkan:", "0"), 10);
        if (isNaN(bayar) || bayar < subtotal) {
            alert("Pembayaran tidak mencukupi.");
            return;
        }

        const kembalian = bayar - subtotal;
        document.getElementById("kembalian").textContent = kembalian.toLocaleString();

        alert("Pembayaran berhasil! Transaksi selesai.");
        resetTransaksi();
    } else {
        const namaPembayaran = document.getElementById("namaPembayaran").value;
        const jenisPembayaran = document.getElementById("jenisPembayaran").value;
        const nomorRekening = document.getElementById("nomorRekening").value;

        if (!namaPembayaran || !jenisPembayaran || !nomorRekening) {
            alert("Lengkapi semua data pembayaran non-tunai.");
            return;
        }

        alert("Pembayaran non-tunai diproses! Transaksi selesai.");
        resetTransaksi();
    }
}

// Reset Transaksi
function resetTransaksi() {
    keranjang = [];
    subtotal = 0;
    document.getElementById("formTransaksi").reset();
    document.getElementById("produkInfo").style.display = "none";
    document.getElementById("nonTunaiFields").style.display = "none";
    updateKeranjang();
}

// Toggle Non-Tunai Fields
function toggleNonTunaiFields() {
    const metode = document.getElementById("metodePembayaran").value;
    const nonTunaiFields = document.getElementById("nonTunaiFields");

    if (metode === "Non-Tunai") {
        nonTunaiFields.style.display = "block";
    } else {
        nonTunaiFields.style.display = "none";
    }
}

    

// Muat data saat halaman pertama kali dimuat
muatPelanggan();
muatProduk();
tampilkanTransaksi();
