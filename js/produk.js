let productIdCounter = JSON.parse(localStorage.getItem("productIdCounter")) || 1;
let productData = JSON.parse(localStorage.getItem("productData")) || [];
const categories = JSON.parse(localStorage.getItem("categories")) || [];
const items = JSON.parse(localStorage.getItem("items")) || [];
const suppliers = JSON.parse(localStorage.getItem("supplierData")) || [];

// Fungsi untuk menghasilkan ID unik produk
function generateProductId() {
    const id = `PROD-${productIdCounter++}`;
    localStorage.setItem("productIdCounter", JSON.stringify(productIdCounter));
    return id;
}

// Fungsi untuk menyimpan data produk ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("productData", JSON.stringify(productData));
}

// Mengisi dropdown kategori, item, dan supplier
function populateDropdowns() {
    const categorySelect = document.getElementById("categorySelect");
    const itemSelect = document.getElementById("itemSelect");
    const supplierSelect = document.getElementById("supplierSelect");

    // Populate kategori
    categorySelect.innerHTML = '<option value="" disabled selected>Pilih Kategori</option>';
    categories.forEach((cat) => {
        categorySelect.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });

    // Populate item
    itemSelect.innerHTML = '<option value="" disabled selected>Pilih Item</option>';
    items.forEach((item) => {
        itemSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });

    // Populate supplier
    supplierSelect.innerHTML = '<option value="" disabled selected>Pilih Supplier</option>';
    suppliers.forEach((sup) => {
        supplierSelect.innerHTML += `<option value="${sup.id}">${sup.nama}</option>`;
    });
}

// Menangani Submit Form Produk
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("productName").value;
    const categoryId = document.getElementById("categorySelect").value;
    const category = categories.find((cat) => cat.id === categoryId).name;
    const itemId = document.getElementById("itemSelect").value;
    const item = items.find((item) => item.id === itemId).name;
    const supplierId = document.getElementById("supplierSelect").value;
    const supplier = suppliers.find((sup) => sup.id === supplierId).nama;
    const price = document.getElementById("productPrice").value;
    const stock = document.getElementById("productStock").value;

    if (id) {
        // Edit data
        const productIndex = productData.findIndex((product) => product.id === id);
        productData[productIndex] = { id, name, category, item, supplier, price, stock };
        alertMessage("Produk berhasil diperbarui!", "success");
    } else {
        // Tambah data baru
        const product = {
            id: generateProductId(),
            name,
            category,
            item,
            supplier,
            price,
            stock,
        };
        productData.push(product);
        alertMessage("Produk berhasil ditambahkan!", "success");
    }

    saveToLocalStorage();
    tampilkanProduk();
    this.reset();
    document.getElementById("cancelEditButton").classList.add("d-none");
    document.getElementById("formTitle").textContent = "Form Produk";
});

// Menampilkan Data Produk
function tampilkanProduk() {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = "";
    productData.forEach((product) => {
        productTable.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.item}</td>
                <td>${product.supplier}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct('${product.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusProduk('${product.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Menghapus Data Produk
function hapusProduk(id) {
    productData = productData.filter((product) => product.id !== id);
    saveToLocalStorage();
    tampilkanProduk();
    alertMessage("Produk berhasil dihapus!", "danger");
}

// Mengedit Data Produk
function editProduct(id) {
    const product = productData.find((p) => p.id === id);

    document.getElementById("editProductId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("categorySelect").value = categories.find((cat) => cat.name === product.category).id;
    document.getElementById("itemSelect").value = items.find((item) => item.name === product.item).id;
    document.getElementById("supplierSelect").value = suppliers.find((sup) => sup.nama === product.supplier).id;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;

    document.getElementById("formTitle").textContent = "Edit Produk";
    document.getElementById("cancelEditButton").classList.remove("d-none");
}

// Membatalkan Edit
document.getElementById("cancelEditButton").addEventListener("click", function () {
    document.getElementById("productForm").reset();
    document.getElementById("editProductId").value = "";
    document.getElementById("formTitle").textContent = "Form Produk";
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

// Inisialisasi
populateDropdowns();
tampilkanProduk();
