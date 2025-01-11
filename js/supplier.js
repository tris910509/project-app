let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Tambah Supplier
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaSupplier = document.getElementById("namaSupplier").value;
    const kontakSupplier = document.getElementById("kontakSupplier").value;

    const newSupplier = {
        id: `SUP${Date.now()}`,
        nama: namaSupplier,
        kontak: kontakSupplier,
    };

    supplierData.push(newSupplier);
    localStorage.setItem("supplierData", JSON.stringify(supplierData));

    tampilkanAlert("Supplier berhasil ditambahkan!", "success");
    tampilkanSupplier();
    document.getElementById("supplierForm").reset();
});

// Tampilkan Supplier
function tampilkanSupplier() {
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = "";

    supplierData.forEach((supplier) => {
        supplierTable.innerHTML += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.nama}</td>
                <td>${supplier.kontak}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSupplier('${supplier.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Edit Supplier
function editSupplier(id) {
    const supplier = supplierData.find((s) => s.id === id);
    if (supplier) {
        document.getElementById("namaSupplier").value = supplier.nama;
        document.getElementById("kontakSupplier").value = supplier.kontak;
        hapusSupplier(id); // Hapus data lama
    }
}

// Hapus Supplier
function hapusSupplier(id) {
    supplierData = supplierData.filter((s) => s.id !== id);
    localStorage.setItem("supplierData", JSON.stringify(supplierData));
    tampilkanAlert("Supplier berhasil dihapus!", "danger");
    tampilkanSupplier();
}

// Tampilkan Alert
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

// Muat data saat halaman pertama kali dimuat
tampilkanSupplier();
