document.addEventListener("DOMContentLoaded", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const transactionForm = document.getElementById("transactionForm");
    const transactionTable = document.getElementById("transactionTable");
    const customerName = document.getElementById("customerName");
    const productName = document.getElementById("productName");
    const quantity = document.getElementById("quantity");
    const discount = document.getElementById("discount");
    const searchTransaction = document.getElementById("searchTransaction");

    // Populate dropdown pelanggan dan produk
    const populateDropdowns = () => {
        customerName.innerHTML = "<option value=''>Pilih Pelanggan</option>";
        productName.innerHTML = "<option value=''>Pilih Produk</option>";

        customers.forEach((customer) => {
            customerName.innerHTML += `<option value="${customer.name}">${customer.name}</option>`;
        });

        products.forEach((product) => {
            productName.innerHTML += `<option value="${product.id}" data-stock="${product.stock}" data-price="${product.price}">${product.name}</option>`;
        });
    };

    // Render transaksi ke tabel
    const renderTransactions = (filter = "") => {
        transactionTable.innerHTML = "";
        const filteredTransactions = transactions.filter((transaction) =>
            transaction.customer.toLowerCase().includes(filter.toLowerCase())
        );

        filteredTransactions.forEach((transaction, index) => {
            transactionTable.innerHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.customer}</td>
                    <td>${transaction.productName}</td>
                    <td>${transaction.quantity}</td>
                    <td>Rp ${transaction.totalPrice.toLocaleString()}</td>
                    <td>${transaction.discount}%</td>
                    <td>Rp ${transaction.finalPrice.toLocaleString()}</td>
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
        const productOption = productName.options[productName.selectedIndex];
        const quantityValue = parseInt(quantity.value, 10);
        const stock = parseInt(productOption.getAttribute("data-stock"), 10);
        const price = parseInt(productOption.getAttribute("data-price"), 10);

        if (!customer || !productId || quantityValue <= 0 || quantityValue > stock) {
            alert("Data tidak valid atau stok tidak mencukupi.");
            return;
        }

        const discountValue = quantityValue >= 10 ? 10 : 0; // Diskon 10% jika beli >= 10
        const totalPrice = price * quantityValue;
        const finalPrice = totalPrice - (totalPrice * discountValue) / 100;

        // Kurangi stok
        const productIndex = products.findIndex((p) => p.id === productId);
        products[productIndex].stock -= quantityValue;
        localStorage.setItem("products", JSON.stringify(products));

        // Tambahkan transaksi
        const id = `TRX-${Date.now()}`;
        const newTransaction = {
            id,
            customer,
            productName: productOption.text,
            quantity: quantityValue,
            totalPrice,
            discount: discountValue,
            finalPrice,
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
            const productIndex = products.findIndex((p) => p.name === transaction.productName);

            if (productIndex >= 0) {
                products[productIndex].stock += transaction.quantity;
                localStorage.setItem("products", JSON.stringify(products));
            }

            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        }
    };

    // Filter transaksi
    searchTransaction.addEventListener("input", (e) => {
        renderTransactions(e.target.value);
    });

    populateDropdowns();
    renderTransactions();
});
