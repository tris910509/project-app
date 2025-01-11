document.addEventListener("DOMContentLoaded", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const transactionForm = document.getElementById("transactionForm");
    const transactionTable = document.getElementById("transactionTable");
    const customerName = document.getElementById("customerName");
    const productName = document.getElementById("productName");
    const productQuantity = document.getElementById("productQuantity");

    // Render dropdown pelanggan
    const populateCustomerDropdown = () => {
        customerName.innerHTML = "";
        customers.forEach((customer) => {
            customerName.innerHTML += `<option value="${customer.name}">${customer.name}</option>`;
        });
    };

    // Render dropdown produk
    const populateProductDropdown = () => {
        productName.innerHTML = "";
        products.forEach((product) => {
            productName.innerHTML += `<option value="${product.id}">${product.name}</option>`;
        });
    };

    // Render transaksi ke tabel
    const renderTransactions = () => {
        transactionTable.innerHTML = "";
        transactions.forEach((transaction, index) => {
            transactionTable.innerHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.customer}</td>
                    <td>${transaction.productName}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.quantity}</td>
                    <td>Rp ${transaction.totalPrice.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    // Proses transaksi
    transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const customer = customerName.value;
        const productId = productName.value;
        const quantity = parseInt(productQuantity.value, 10);

        if (!customer || !productId || quantity <= 0) {
            alert("Semua bidang harus diisi dengan benar!");
            return;
        }

        const product = products.find((p) => p.id === productId);

        if (!product) {
            alert("Produk tidak ditemukan!");
            return;
        }

        if (quantity > product.stock) {
            alert(`Stok tidak mencukupi! Stok saat ini: ${product.stock}`);
            return;
        }

        // Kurangi stok produk
        product.stock -= quantity;
        localStorage.setItem("products", JSON.stringify(products));

        // Tambahkan transaksi
        const id = `TRX-${Date.now()}`;
        const totalPrice = product.price * quantity;
        const newTransaction = {
            id,
            customer,
            productName: product.name,
            category: product.category,
            quantity,
            totalPrice,
        };

        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        renderTransactions();
        transactionForm.reset();
    });

    // Hapus transaksi
    window.deleteTransaction = (index) => {
        if (confirm("Yakin ingin menghapus transaksi ini?")) {
            const transaction = transactions[index];
            const product = products.find((p) => p.name === transaction.productName);

            if (product) {
                product.stock += transaction.quantity; // Kembalikan stok
                localStorage.setItem("products", JSON.stringify(products));
            }

            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        }
    };

    populateCustomerDropdown();
    populateProductDropdown();
    renderTransactions();
});
