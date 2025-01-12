let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Simpan supplier
function simpanSupplier(event) {
    event.preventDefault();

    const nama = document.getElementById("namaSupplier").value.trim();
    const noHandphone = document.getElementById("noHandphone").value.trim();
    const namaPerusahaan = document.getElementById("namaPerusahaan").value.trim();
    const alamat = document.getElementById("alamatSupplier").value.trim();
    const statusAktif = document.getElementById("statusAktif").checked;

    if (!nama || !noHandphone || !namaPerusahaan || !alamat) {
        alert("Mohon isi semua data dengan benar!");
        return;
    }

    const id = `SUP-${Date.now()}`;
    supplierData.push({ id, nama, noHandphone, namaPerusahaan, alamat, status: statusAktif ? "Aktif" : "Non-Aktif" });
    localStorage.setItem("supplierData", JSON.stringify(supplierData));
    document.getElementById("formSupplier").reset();
    updateTabelSupplier();
}

// Update tabel supplier
function updateTabelSupplier() {
    const tbody = document.querySelector("#tabelSupplier tbody");
    tbody.innerHTML = "";

    supplierData.forEach((supplier, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${supplier.nama}</td>
                <td>${supplier.noHandphone}</td>
                <td>${supplier.namaPerusahaan}</td>
                <td>${supplier.alamat}</td>
                <td>${supplier.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSupplier('${supplier.id}')">Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Edit supplier
function editSupplier(id) {
    const supplier = supplierData.find(s => s.id === id);
    if (!supplier) return;

    document.getElementById("namaSupplier").value = supplier.nama;
    document.getElementById("noHandphone").value = supplier.noHandphone;
    document.getElementById("namaPerusahaan").value = supplier.namaPerusahaan;
    document.getElementById("alamatSupplier").value = supplier.alamat;
    document.getElementById("statusAktif").checked = supplier.status === "Aktif";

    // Hapus data lama dan simpan perubahan
    hapusSupplier(id);
}

// Hapus supplier
function hapusSupplier(id) {
    if (confirm("Yakin ingin menghapus supplier ini?")) {
        supplierData = supplierData.filter(s => s.id !== id);
        localStorage.setItem("supplierData", JSON.stringify(supplierData));
        updateTabelSupplier();
    }
}

// Inisialisasi
document.getElementById("formSupplier").addEventListener("submit", simpanSupplier);
updateTabelSupplier();
