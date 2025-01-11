let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];
let pelangganData = JSON.parse(localStorage.getItem("pelangganData")) || [];
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

function muatDropdowns() {
    const filterPelanggan = document.getElementById("filterPelanggan");
    const filterProduk = document.getElementById("filterProduk");

    filterPelanggan.innerHTML = `<option value="" selected>Semua Pelanggan</option>`;
    pelangganData.forEach((pelanggan) => {
        filterPelanggan.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });

    filterProduk.innerHTML = `<option value="" selected>Semua Produk/Kategori</option>`;
    produkData.forEach((produk) => {
        filterProduk.innerHTML += `<option value="${produk.id}">${produk.nama}</option>`;
    });
}

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
        if (filter.produk && data.produkId !== filter.produk) cocok = false;
        return cocok;
    });

    if (dataTampil.length === 0) {
        laporanTable.innerHTML = `<tr><td colspan="6" class="text-center">Tidak ada data</td></tr>`;
        return;
    }

    let produkStat = {};

    dataTampil.forEach((data) => {
        totalTransaksi++;
        totalPendapatan += data.total;
        totalPelanggan.add(data.pelangganId);

        if (!produkStat[data.produk]) produkStat[data.produk] = 0;
        produkStat[data.produk] += data.total;

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

    renderCharts(produkStat);
}

function renderCharts(produkStat) {
    const barCtx = document.getElementById("barChart").getContext("2d");
    const pieCtx = document.getElementById("pieChart").getContext("2d");

    new Chart(barCtx, {
        type: "bar",
        data: {
            labels: Object.keys(produkStat),
            datasets: [
                {
                    label: "Pendapatan",
                    data: Object.values(produkStat),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
            ],
        },
    });

    new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: Object.keys(produkStat),
            datasets: [
                {
                    label: "Pendapatan",
                    data: Object.values(produkStat),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        },
    });
}

document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    tampilkanLaporan({
        tanggal: document.getElementById("filterTanggal").value,
        pelanggan: document.getElementById("filterPelanggan").value,
        status: document.getElementById("filterStatus").value,
        produk: document.getElementById("filterProduk").value,
    });
});

muatDropdowns();
tampilkanLaporan();
