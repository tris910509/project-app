let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];

// Muat transaksi yang ada
function muatTransaksi() {
    const transaksiSelect = document.getElementById("transaksiSelect");

    transaksiSelect.innerHTML = `<option value="" disabled selected>Pilih transaksi</option>`;

    if (transaksiData.length === 0) {
        transaksiSelect.innerHTML += `<option value="" disabled>No Transaksi Available</option>`;
    } else {
        transaksiData.forEach((transaksi, index) => {
            transaksiSelect.innerHTML += `
                <option value="${index}">
                    ${transaksi.pelanggan} - ${transaksi.produk} - ${transaksi.jumlah} x ${transaksi.harga} = ${transaksi.total}
                </option>
            `;
        });
    }
}

// Proses Pembayaran
function prosesPembayaran() {
    const transaksiSelect = document.getElementById("transaksiSelect");
    const jumlahBayar = parseFloat(document.getElementById("jumlahBayar").value);
    const transaksiIndex = transaksiSelect.value;

    if (!transaksiIndex || isNaN(jumlahBayar) || jumlahBayar <= 0) {
        tampilkanAlert("Silakan pilih transaksi dan masukkan jumlah bayar yang valid.", "warning");
        return;
    }

    const transaksi = transaksiData[transaksiIndex];
    if (jumlahBayar >= transaksi.total) {
        // Pembayaran Lunas
        transaksi.statusPembayaran = "Lunas";
        localStorage.setItem("transaksiData", JSON.stringify(transaksiData));

        tampilkanAlert("Pembayaran berhasil. Transaksi lunas.", "success");
        tampilkanStatusPembayaran("Lunas", transaksi.total);
    } else {
        // Pembayaran Belum Lunas
        transaksi.statusPembayaran = "Belum Lunas";
        localStorage.setItem("transaksiData", JSON.stringify(transaksiData));

        tampilkanAlert("Pembayaran tidak cukup. Transaksi belum lunas.", "danger");
        tampilkanStatusPembayaran("Belum Lunas", transaksi.total);
    }
}

// Tampilkan status pembayaran
function tampilkanStatusPembayaran(status, total) {
    const statusPembayaran = document.getElementById("statusPembayaran");
    statusPembayaran.innerHTML = `
        <h4>Status Pembayaran: <span class="text-${status === 'Lunas' ? 'success' : 'danger'}">${status}</span></h4>
        <p>Total Pembayaran: ${total}</p>
    `;
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

// Muat transaksi saat halaman dimuat
muatTransaksi();
