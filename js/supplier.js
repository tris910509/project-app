let supplierIdCounter = JSON.parse(localStorage.getItem("supplierIdCounter")) || 1;
let supplierData = JSON.parse(localStorage.getItem("supplierData")) || [];


// ID Generator
function generateSupplierId() {
    return `SUP-${supplierIdCounter++}`;
}

// Simpan Data ke Local Storage
function saveToLocalStorage() {
    localStorage.setItem("supplierData", JSON.stringify(supplierData));
}

// Tambahkan Supplier
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const supplier = {
        id: generateSupplierId(),
        nama: document.getElementById("namaSupplier").value,
        noHp: document.getElementById("noHpSupplier").value,
        perusahaan: document.getElementById("namaPerusahaan").value,
        alamat: document.getElementById("alamatSupplier").value,
        status: document.getElementById("supplierSwitch").checked ? "Aktif" : "Nonaktif",
    };
    saveToLocalStorage();
    supplierData.push(supplier);
    tampilkanSupplier();
    alert("Supplier berhasil ditambahkan!");
    this.reset();
});

// Tampilkan Supplier
function tampilkanSupplier() {
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = "";
    supplierData.forEach((supplier, index) => {
        supplierTable.innerHTML += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.nama}</td>
                <td>${supplier.noHp}</td>
                <td>${supplier.perusahaan}</td>
                <td>${supplier.alamat}</td>
                <td>${supplier.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSupplier(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Filter Supplier
function filterSupplier() {
    const filter = document.getElementById("filterSupplierStatus").value;
    const filteredData = filter ? supplierData.filter((supplier) => supplier.status === filter) : supplierData;
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = "";
    filteredData.forEach((supplier, index) => {
        supplierTable.innerHTML += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.nama}</td>
                <td>${supplier.noHp}</td>
                <td>${supplier.perusahaan}</td>
                <td>${supplier.alamat}</td>
                <td>${supplier.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusSupplier(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Hapus Supplier
function hapusSupplier(index) {
    if (confirm("Yakin ingin menghapus supplier ini?")) {
        supplierData.splice(index, 1);
        tampilkanSupplier();
    }
}

// Edit Supplier
function editSupplier(index) {
    const supplier = supplierData[index];
    document.getElementById("namaSupplier").value = supplier.nama;
    document.getElementById("noHpSupplier").value = supplier.noHp;
    document.getElementById("namaPerusahaan").value = supplier.perusahaan;
    document.getElementById("alamatSupplier").value = supplier.alamat;
    document.getElementById("supplierSwitch").checked = supplier.status === "Aktif";
    hapusSupplier(index);
}

tampilkanSupplier();
        
