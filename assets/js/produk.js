// assets/js/produk.js
document.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

    const productTable = document.getElementById("productTable");
    const productForm = document.getElementById("productForm");
    const productIdInput = document.getElementById("productId");
    const productNameInput = document.getElementById("productName");
    const productCategoryInput = document.getElementById("productCategory");
    const productItemInput = document.getElementById("productItem");
    const productSupplierInput = document.getElementById("productSupplier");
    const productPriceInput = document.getElementById("productPrice");
    const productStockInput = document.getElementById("productStock");

    // Render produk
    function renderProducts() {
        productTable.innerHTML = "";
        products.forEach((product, index) => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.categoryName}</td>
                    <td>${product.itemName}</td>
                    <td>${product.supplierName}</td>
                    <td>Rp ${product.price.toLocaleString()}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Hapus</button>
                    </td>
                </tr>
            `;
            productTable.innerHTML += row;
        });
    }

    // Tambah produk
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = productIdInput.value || `PRD-${Date.now()}`;
        const name = productNameInput.value;
        const category = productCategoryInput.value;
        const item = productItemInput.value;
        const supplier = productSupplierInput.value;
        const price = parseFloat(productPriceInput.value);
        const stock = parseInt(productStockInput.value, 10);

        if (!name || !category || !item || !supplier || isNaN(price) || isNaN(stock)) {
            alert("Semua bidang harus diisi!");
            return;
        }

        const newProduct = {
            id,
            name,
            category,
            categoryName: categories.find((cat) => cat.id === category)?.name || "",
            item,
            itemName: items.find((it) => it.id === item)?.name || "",
            supplier,
            supplierName: suppliers.find((sup) => sup.id === supplier)?.name || "",
            price,
            stock,
        };

        if (productIdInput.value) {
            const index = products.findIndex((p) => p.id === id);
            products[index] = newProduct;
        } else {
            products.push(newProduct);
        }

        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        productForm.reset();
    });

    // Edit produk
    window.editProduct = (index) => {
        const product = products[index];
        productIdInput.value = product.id;
        productNameInput.value = product.name;
        productCategoryInput.value = product.category;
        productItemInput.value = product.item;
        productSupplierInput.value = product.supplier;
        productPriceInput.value = product.price;
        productStockInput.value = product.stock;
    };

    // Hapus produk
    window.deleteProduct = (index) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
        }
    };

    // Render kategori, item, dan supplier di dropdown
    function populateDropdowns() {
        categories.forEach((cat) => {
            productCategoryInput.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
        });
        items.forEach((it) => {
            productItemInput.innerHTML += `<option value="${it.id}">${it.name}</option>`;
        });
        suppliers.forEach((sup) => {
            productSupplierInput.innerHTML += `<option value="${sup.id}">${sup.name}</option>`;
        });
    }

    populateDropdowns();
    renderProducts();
});
