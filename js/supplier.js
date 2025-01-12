let supplierIdCounter = JSON.parse(localStorage.getItem("supplierIdCounter")) || 1;
let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];

// Fungsi untuk menghasilkan ID unik supplier
function generateSupplierId() {
    const id = `SUP-${supplierIdCounter++}`;
    localStorage.setItem("supplierIdCounter", JSON.stringify(supplierIdCounter));
    return id;
}

// Fungsi untuk menyimpan data supplier ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("supplierData", JSON.stringify(supplierData));
}

// Menangani Submit Form Supplier
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("editSupplierId").value;
    const nama = document.getElementById("namaSupplier").value;
    const noHp = document.getElementById("noHpSupplier").value;
    const perusahaan = document.getElementById("namaPerusahaan").value;
    const alamat = document.getElementById("alamatSupplier").value;
    const status = document.getElementById("statusSupplier").checked ? "Aktif" : "Nonaktif";

    if (id) {
        // Edit data
        const supplierIndex = supplierData.findIndex((supplier) => supplier.id === id);
        supplierData[supplierIndex] = { id, nama, noHp, perusahaan, alamat, status };
        document.getElementById("formTitle").textContent = "Form Supplier";
        document.getElementById("cancelEditButton").classList.add("d-none");
        alertMessage("Data supplier berhasil diperbarui!", "success");
    } else {
        // Tambah data baru
        const supplier = {
            id: generateSupplierId(),
            nama,
            noHp,
            perusahaan,
            alamat,
            status,
        };
        supplierData.push(supplier);
        alertMessage("Supplier berhasil ditambahkan!", "success");
    }

    saveToLocalStorage();
    tampilkanSupplier();
    this.reset();
});

// Menampilkan Data Supplier
function tampilkanSupplier() {
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = "";
    supplierData.forEach((supplier) => {
        supplierTable.innerHTML += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.nama}</td>
                <td>${supplier.noHp}</td>
                <td>${supplier.perusahaan}</td>
                <td>${supplier.alamat}</td>
                <td>${supplier.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSupplier('${supplier.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Menghapus Data Supplier
function hapusSupplier(id) {
    supplierData = supplierData.filter((s) => s.id !== id);
    saveToLocalStorage();
    tampilkanSupplier();
    alertMessage("Supplier berhasil dihapus!", "danger");
}

// Mengedit Data Supplier
function editSupplier(id) {
    const supplier = supplierData.find((s) => s.id === id);

    document.getElementById("editSupplierId").value = supplier.id;
    document.getElementById("namaSupplier").value = supplier.nama;
    document.getElementById("noHpSupplier").value = supplier.noHp;
    document.getElementById("namaPerusahaan").value = supplier.perusahaan;
    document.getElementById("alamatSupplier").value = supplier.alamat;
    document.getElementById("statusSupplier").checked = supplier.status === "Aktif";

    document.getElementById("formTitle").textContent = "Edit Supplier";
    document.getElementById("cancelEditButton").classList.remove("d-none");
}

// Membatalkan Edit
document.getElementById("cancelEditButton").addEventListener("click", function () {
    document.getElementById("supplierForm").reset();
    document.getElementById("editSupplierId").value = "";
    document.getElementById("formTitle").textContent = "Form Supplier";
    this.classList.add("d-none");
});

// Menampilkan Alert
function alertMessage(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 3000);
}

// Inisialisasi Data
tampilkanSupplier();
