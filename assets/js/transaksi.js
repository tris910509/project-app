document.addEventListener("DOMContentLoaded", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const transactionForm = document.getElementById("transactionForm");
    const transactionTable = document.getElementById("transactionTable");
    const customerName = document.getElementById("customerName");
    const productName = document.getElementById("productName");
    const productQuantity = document.getElementById("productQuantity");
    const discountField = document.getElementById("discount");
    const totalRevenue = document.getElementById("totalRevenue");
    const totalProducts = document.getElementById("totalProducts");
    const totalTransactions = document.getElementById("totalTransactions");

    // Populate dropdown pelanggan dan produk
    const populateDropdowns = () => {
        customerName.innerHTML = "";
        productName.innerHTML = "";

        customers.forEach((customer) => {
            customerName.innerHTML += `<option value="${customer.name}">${customer.name}</option>`;
        });

        products.forEach((product) => {
            productName.innerHTML += `<option value="${product.id}" data-stock="${product.stock}" data-price="${product.price}">${product.name}</option>`;
        });
    };

    // Hitung total laporan
    const updateReport = () => {
        const totalRevenueAmount = transactions.reduce((acc, transaction) => acc + transaction.finalPrice, 0);
        const totalProductsSold = transactions.reduce((acc, transaction) => acc + transaction.quantity, 0);

        totalRevenue.innerText = `Rp ${totalRevenueAmount.toLocaleString()}`;
        totalProducts.innerText = totalProductsSold;
        totalTransactions.innerText = transactions.length;
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
                    <td>${transaction.quantity}</td>
                    <td>Rp ${transaction.totalPrice.toLocaleString()}</td>
                    <td>${transaction.discount}%</td>
                    <td>Rp ${transaction.finalPrice.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Hapus</button>
                    </td>
                </tr>`;
        });

        updateReport();
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

        if (quantity > product.stock) {
            alert(`Stok tidak mencukupi! Stok saat ini: ${product.stock}`);
            return;
        }

        const discount = quantity >= 10 ? 10 : 0; // Diskon 10% jika pembelian >= 10 item
        const totalPrice = product.price * quantity;
        const finalPrice = totalPrice - (totalPrice * discount) / 100;

        // Kurangi stok
        product.stock -= quantity;
        localStorage.setItem("products", JSON.stringify(products));

        // Tambahkan transaksi
        const id = `TRX-${Date.now()}`;
        const newTransaction = {
            id,
            customer,
            productName: product.name,
            quantity,
            totalPrice,
            discount,
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
            const product = products.find((p) => p.name === transaction.productName);

            if (product) {
                product.stock += transaction.quantity;
                localStorage.setItem("products", JSON.stringify(products));
            }

            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        }
    };

    populateDropdowns();
    renderTransactions();
});
