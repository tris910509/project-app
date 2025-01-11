let laporanData = JSON.parse(localStorage.getItem("laporanData")) || [];

// Tampilkan laporan
function tampilkanLaporan() {
    const laporanTable = document.getElementById("laporanTable");
    laporanTable.innerHTML = "";

    laporanData.forEach((laporan) => {
        laporanTable.innerHTML += `
            <tr>
                <td>${laporan.id}</td>
                <td>${laporan.tanggal}</td>
                <td>
                    <ul>
                        ${laporan.transaksi
                            .map(
                                (item) =>
                                    `<li>${item.nama} - ${item.jumlah} pcs (Rp${item.subtotal})</li>`
                            )
                            .join("")}
                    </ul>
                </td>
            </tr>
        `;
    });
}

// Muat data saat halaman pertama kali dimuat
tampilkanLaporan();
