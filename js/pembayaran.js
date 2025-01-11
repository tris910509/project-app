let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];
let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || []; // Data transaksi

// Generate ID Pembayaran otomatis
function generateIdPembayaran() {
    return "PAY-" + Date.now();
}

// Update total harus dibayar berdasarkan ID Transaksi
function updateTotal() {
    const idTransaksi = document.getElementById("idTransaksi").value;
    const transaksi = transaksiData.find((t) => t.id === idTransaksi);
    if (transaksi) {
        document.getElementById("namaTransaksi").value = transaksi.namaTransaksi;
        document.getElementById("totalBayar").value = transaksi.total;
    }
}

// Simpan data pembayaran
function simpanPembayaran(event) {
    event.preventDefault();

    const pembayaran = {
        idPembayaran: generateIdPembayaran(),
        idTransaksi: document.getElementById("idTransaksi").value,
        namaTransaksi: document.getElementById("namaTransaksi").value,
        total: parseFloat(document.getElementById("totalBayar").value),
        status: document.getElementById("statusPembayaran").value,
    };

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
    alert("Data pembayaran berhasil disimpan.");
    document.getElementById("formPembayaran").reset();
    document.getElementById("idPembayaran").value = generateIdPembayaran();
}

// Tampilkan data di tabel
function tampilkanPembayaran() {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName('tbody')[0];
    tabelPembayaran.innerHTML = "";

    pembayaranData.forEach((pembayaran, index) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.idTransaksi}</td>
            <td>${pembayaran.namaTransaksi}</td>
            <td>${pembayaran.namaProduk || "-"}</td>
            <td>${pembayaran.total}</td>
            <td>${pembayaran.status}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="updateStatus(${index}, 'Lunas')">Lunas</button>
                <button class="btn btn-warning btn-sm" onclick="updateStatus(${index}, 'Pending')">Pending</button>
                <button class="btn btn-danger btn-sm" onclick="hapusPembayaran(${index})">Hapus</button>
            </td>
        `;
    });
}

// Perbarui status pembayaran
function updateStatus(index, status) {
    pembayaranData[index].status = status;
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Hapus data pembayaran
function hapusPembayaran(index) {
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

// Isi dropdown ID Transaksi dari data transaksi
function isiDropdownTransaksi() {
    const dropdown = document.getElementById("idTransaksi");
    transaksiData.forEach((transaksi) => {
        const option = document.createElement("option");
        option.value = transaksi.id;
        option.textContent = transaksi.id + " - " + transaksi.namaTransaksi;
        dropdown.appendChild(option);
    });
}

document.getElementById("idPembayaran").value = generateIdPembayaran();
isiDropdownTransaksi();
tampilkanPembayaran();
