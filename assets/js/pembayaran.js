document.addEventListener("DOMContentLoaded", () => {
    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const paymentForm = document.getElementById("paymentForm");
    const paymentTable = document.getElementById("paymentTable");
    const paymentTransaction = document.getElementById("paymentTransaction");
    const paymentAmount = document.getElementById("paymentAmount");

    const renderPayments = () => {
        paymentTable.innerHTML = "";
        payments.forEach((payment, index) => {
            paymentTable.innerHTML += `
                <tr>
                    <td>${payment.id}</td>
                    <td>${payment.transactionId}</td>
                    <td>Rp ${payment.amount.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deletePayment(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    const populateTransactionDropdown = () => {
        transactions.forEach((transaction) => {
            paymentTransaction.innerHTML += `<option value="${transaction.id}">${transaction.id} - ${transaction.productName}</option>`;
        });
    };

    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const transactionId = paymentTransaction.value;
        const amount = parseFloat(paymentAmount.value);

        if (!transactionId || isNaN(amount) || amount <= 0) {
            alert("Semua bidang harus diisi dengan benar!");
            return;
        }

        const id = `PAY-${Date.now()}`;
        const newPayment = {
            id,
            transactionId,
            amount,
        };

        payments.push(newPayment);
        localStorage.setItem("payments", JSON.stringify(payments));
        renderPayments();
        paymentForm.reset();
    });

    window.deletePayment = (index) => {
        if (confirm("Yakin ingin menghapus pembayaran ini?")) {
            payments.splice(index, 1);
            localStorage.setItem("payments", JSON.stringify(payments));
            renderPayments();
        }
    };

    populateTransactionDropdown();
    renderPayments();
});
