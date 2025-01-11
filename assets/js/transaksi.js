document.addEventListener("DOMContentLoaded", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const transactionForm = document.getElementById("transactionForm");
    const transactionTable = document.getElementById("transactionTable");
    const transactionProduct = document.getElementById("transactionProduct");
    const transactionQuantity = document.getElementById("transactionQuantity");

    const renderTransactions = () => {
        transactionTable.innerHTML = "";
        transactions.forEach((transaction, index) => {
            transactionTable.innerHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.productName}</td>
                    <td>${transaction.quantity}</td>
                    <td>Rp ${transaction.subtotal.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    const populateProductDropdown = () => {
        products.forEach((product) => {
            transactionProduct.innerHTML += `<option value="${product.id}">${product.name}</option>`;
        });
    };

    transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const productId = transactionProduct.value;
        const quantity = parseInt(transactionQuantity.value, 10);

        if (!productId || isNaN(quantity) || quantity <= 0) {
            alert("Semua bidang harus diisi dengan benar!");
            return;
        }

        const product = products.find((p) => p.id === productId);
        const subtotal = product.price * quantity;
        const id = `TRX-${Date.now()}`;

        const newTransaction = {
            id,
            productId,
            productName: product.name,
            quantity,
            subtotal,
        };

        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        renderTransactions();
        transactionForm.reset();
    });

    window.deleteTransaction = (index) => {
        if (confirm("Yakin ingin menghapus transaksi ini?")) {
            transactions.splice(index, 1);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        }
    };

    populateProductDropdown();
    renderTransactions();
});
