let transaksiData = JSON.parse(localStorage.getItem("transaksiData")) || [];

// Muat transaksi dan tampilkan laporan
function tampilkanLaporan(transaksiData) {
    const laporanTable = document.getElementById("laporanTable");
    const totalTransaksi = transaksiData.reduce((acc, transaksi) => acc + transaksi.total, 0);
    
    // Tampilkan rincian transaksi
    laporanTable.innerHTML = "";
    transaksiData.forEach((transaksi) => {
        laporanTable.innerHTML += `
            <tr>
                <td>${transaksi.pelanggan}</td>
                <td>${transaksi.produk}</td>
                <td>${transaksi.jumlah}</td>
                <td>${transaksi.total}</td>
                <td><span class="badge ${transaksi.statusPembayaran === 'Lunas' ? 'bg-success' : 'bg-danger'}">${transaksi.statusPembayaran}</span></td>
                <td>${transaksi.tanggal}</td>
            </tr>
        `;
    });

    // Tampilkan total transaksi
    tampilkanChart(transaksiData);

    // Menampilkan total transaksi di bawah tabel
    const total = document.createElement("div");
    total.classList.add("mt-4");
    total.innerHTML = `<h4>Total Transaksi: ${totalTransaksi}</h4>`;
    laporanTable.parentElement.appendChild(total);
}

// Filter transaksi berdasarkan tanggal
function filterLaporan() {
    const filterTanggal = document.getElementById("filterTanggal").value;
    
    const filteredData = filterTanggal 
        ? transaksiData.filter((transaksi) => transaksi.tanggal === filterTanggal)
        : transaksiData;

    tampilkanLaporan(filteredData);
}

// Menampilkan grafik statistik transaksi
function tampilkanChart(transaksiData) {
    const ctx = document.getElementById("laporanChart").getContext("2d");

    const labels = transaksiData.map((transaksi) => transaksi.tanggal);
    const data = transaksiData.map((transaksi) => transaksi.total);
    
    // Membuat Chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Transaksi',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Grafik Laporan Transaksi'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tanggal'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Transaksi'
                    }
                }
            }
        }
    });
}

// Muat laporan saat halaman pertama kali dimuat
tampilkanLaporan(transaksiData);
