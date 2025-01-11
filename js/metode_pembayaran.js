let pembayaranData = JSON.parse(localStorage.getItem("pembayaranData")) || [];

// Tampilkan form berdasarkan tipe pembayaran
function tampilkanForm() {
    const tipePembayaran = document.getElementById("tipePembayaran").value;
    document.getElementById("formTunai").classList.toggle("d-none", tipePembayaran !== "tunai");
    document.getElementById("formNonCash").classList.toggle("d-none", tipePembayaran !== "non-cash");
}

// Simpan data pembayaran
function simpanPembayaran(event) {
    event.preventDefault();

    const tipePembayaran = document.getElementById("tipePembayaran").value;
    let pembayaran = { tipe: tipePembayaran };

    if (tipePembayaran === "tunai") {
        const jumlahDibayar = parseFloat(document.getElementById("jumlahDibayar").value);
        const totalTagihan = parseFloat(document.getElementById("totalTagihan").value);
        pembayaran.status = jumlahDibayar >= totalTagihan ? "Lunas" : "Belum Lunas";
        pembayaran.jumlahDibayar = jumlahDibayar;
        pembayaran.totalTagihan = totalTagihan;
    } else if (tipePembayaran === "non-cash") {
        pembayaran.nama = document.getElementById("namaPembayaran").value;
        pembayaran.jenis = document.getElementById("jenisPembayaran").value;
        pembayaran.nomorRekening = document.getElementById("nomorRekening").value;
        pembayaran.bukti = document.getElementById("buktiPembayaran").value.split("\\").pop(); // Nama file bukti
        pembayaran.keterangan = document.getElementById("keteranganPembayaran").value || "-";
        pembayaran.status = "Menunggu Konfirmasi";
    }

    pembayaranData.push(pembayaran);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
    alert("Metode pembayaran berhasil disimpan.");
    document.getElementById("formPembayaran").reset();
}

// Tampilkan data di tabel
function tampilkanPembayaran() {
    const tabelPembayaran = document.getElementById("tabelPembayaran").getElementsByTagName('tbody')[0];
    tabelPembayaran.innerHTML = "";

    pembayaranData.forEach((pembayaran, index) => {
        const row = tabelPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.tipe === "tunai" ? "Tunai" : "Non-Cash"}</td>
            <td>${pembayaran.nama || "-"}</td>
            <td>${pembayaran.jenis || "-"}</td>
            <td>${pembayaran.nomorRekening || "-"}</td>
            <td>${pembayaran.status}</td>
            <td>
                <button class="btn btn-danger" onclick="hapusPembayaran(${index})">Hapus</button>
            </td>
        `;
    });
}

// Hapus data pembayaran
function hapusPembayaran(index) {
    pembayaranData.splice(index, 1);
    localStorage.setItem("pembayaranData", JSON.stringify(pembayaranData));
    tampilkanPembayaran();
}

tampilkanPembayaran();
