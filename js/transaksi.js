// Dropdown pelanggan berdasarkan peran
document.getElementById("peran").addEventListener("change", function () {
    const peran = this.value;
    const inputManual = document.getElementById("inputManual");
    const inputHandphone = document.getElementById("inputHandphone");
    const inputAlamat = document.getElementById("inputAlamat");
    const dropdownPelanggan = document.getElementById("dropdownPelanggan");

    if (peran === "Umum") {
        inputManual.classList.remove("d-none");
        inputHandphone.classList.remove("d-none");
        inputAlamat.classList.remove("d-none");
        dropdownPelanggan.classList.add("d-none");
    } else {
        inputManual.classList.add("d-none");
        inputHandphone.classList.add("d-none");
        inputAlamat.classList.add("d-none");
        dropdownPelanggan.classList.remove("d-none");
        muatDropdownPelanggan(peran);
    }
});

// Muat dropdown pelanggan sesuai peran
function muatDropdownPelanggan(peran) {
    const pelangganDropdown = document.getElementById("pelanggan");
    pelangganDropdown.innerHTML = `<option value="" selected>Pilih Pelanggan</option>`;

    const filteredPelanggan = pelangganData.filter((pelanggan) => pelanggan.peran === peran);
    filteredPelanggan.forEach((pelanggan) => {
        pelangganDropdown.innerHTML += `<option value="${pelanggan.id}">${pelanggan.nama}</option>`;
    });
}

// Tambah ke fitur pelanggan jika peran Umum
function tambahPelangganManual() {
    const nama = document.getElementById("namaPelanggan").value.trim();
    const noHandphone = document.getElementById("noHandphone").value.trim();
    const alamat = document.getElementById("alamatPelanggan").value.trim();

    if (!nama || !noHandphone || !alamat) {
        alert("Harap lengkapi data pelanggan!");
        return null;
    }

    const pelangganBaru = {
        id: `PLGN-${Date.now()}`,
        nama,
        noHandphone,
        alamat,
        peran: "Umum",
    };

    pelangganData.push(pelangganBaru);
    localStorage.setItem("pelangganData", JSON.stringify(pelangganData));
    return pelangganBaru;
}

// Selesaikan transaksi dengan validasi peran
document.getElementById("selesaikanTransaksi").addEventListener("click", function () {
    const peran = document.getElementById("peran").value;

    let pelanggan;
    if (peran === "Umum") {
        pelanggan = tambahPelangganManual();
        if (!pelanggan) return;
    } else {
        const pelangganId = document.getElementById("pelanggan").value;
        if (!pelangganId) {
            alert("Pilih pelanggan!");
            return;
        }
        pelanggan = pelangganData.find((p) => p.id === pelangganId);
    }

    // Lanjutkan proses transaksi
    console.log("Proses transaksi untuk pelanggan:", pelanggan);
});
