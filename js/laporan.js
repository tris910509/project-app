let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];

function muatPelangganDropdown() {
    const filterPelanggan = document.getElementById("filterPelanggan");
    filterPelanggan.innerHTML = `<option value="" selected>Semua Pelanggan</option>`;

    pelangganData.forEach((pelanggan) => {
        filterPelanggan.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });
}

// Tampilkan laporan berdasarkan filter
function tampilkanLaporan(filter = {}) {
    const laporanTable = document.getElementById("laporanTable");
    laporanTable.innerHTML = "";

    let totalTransaksi = 0;
    let totalPendapatan = 0;
    let totalPelanggan = new Set();

    const dataTampil = transaksiData.filter((data) => {
        let cocok = true;
        if (filter.tanggal && data.tanggal !== filter.tanggal) cocok = false;
        if (filter.pelanggan && data.pelangganId !== filter.pelanggan) cocok = false;
        if (filter.status && data.status !== filter.status) cocok = false;
        return cocok;
    });

    if (dataTampil.length === 0) {
        laporanTable.innerHTML = `<tr><td colspan="6" class="text-center">Tidak ada data</td></tr>`;
        return;
    }

    dataTampil.forEach((data) => {
        totalTransaksi++;
        totalPendapatan += data.total;
        totalPelanggan.add(data.pelangganId);

        laporanTable.innerHTML += `
            <tr>
                <td>${data.tanggal}</td>
                <td>${data.pelanggan}</td>
                <td>${data.produk}</td>
                <td>${data.jumlah}</td>
                <td>Rp${data.total}</td>
                <td>${data.status}</td>
            </tr>
        `;
    });

    document.getElementById("totalTransaksi").textContent = totalTransaksi;
    document.getElementById("totalPendapatan").textContent = `Rp${totalPendapatan}`;
    document.getElementById("totalPelanggan").textContent = totalPelanggan.size;
}

// Ekspor laporan ke CSV
document.getElementById("exportCsv").addEventListener("click", function () {
    const csvData = transaksiData.map((data) => {
        return [
            data.tanggal,
            data.pelanggan,
            data.produk,
            data.jumlah,
            `Rp${data.total}`,
            data.status,
        ].join(",");
    });

    const csvFile = new Blob([["Tanggal,Pelanggan,Produk,Jumlah,Total Harga,Status\n"].concat(csvData).join("\n")], {
        type: "text/csv",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvFile);
    link.download = "laporan.csv";
    link.click();
});

// Form filter
document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const filterTanggal = document.getElementById("filterTanggal").value;
    const filterPelanggan = document.getElementById("filterPelanggan").value;
    const filterStatus = document.getElementById("filterStatus").value;

    tampilkanLaporan({
        tanggal: filterTanggal,
        pelanggan: filterPelanggan,
        status: filterStatus,
    });
});

muatPelangganDropdown();
tampilkanLaporan();
