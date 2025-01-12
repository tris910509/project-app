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

    const supplier = {
        id: generateSupplierId(),
        nama: document.getElementById("namaSupplier").value,
        noHp: document.getElementById("noHpSupplier").value,
        perusahaan: document.getElementById("namaPerusahaan").value,
        alamat: document.getElementById("alamatSupplier").value,
        status: document.getElementById("statusSupplier").checked ? "Aktif" : "Nonaktif",
    };

    supplierData.push(supplier);
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
}

// Menangani Filter Supplier
document.getElementById("filterInput").addEventListener("input", function () {
    const filterValue = this.value.toLowerCase();
    const filteredData = supplierData.filter((supplier) =>
        supplier.nama.toLowerCase().includes(filterValue)
    );
    tampilkanSupplier(filteredData);
});

// Inisialisasi Data
tampilkanSupplier();
