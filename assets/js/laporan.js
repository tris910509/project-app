document.addEventListener("DOMContentLoaded", () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    const transactionReportTable = document.getElementById("transactionReportTable");
    const totalPayment = document.getElementById("totalPayment");

    const renderTransactionReport = () => {
        transactionReportTable.innerHTML = "";
        transactions.forEach((transaction) => {
            transactionReportTable.innerHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.productName}</td>
                    <td>${transaction.quantity}</td>
                    <td>Rp ${transaction.subtotal.toLocaleString()}</td>
                </tr>`;
        });
    };

    const calculateTotalPayment = () => {
        const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
        totalPayment.textContent = `Rp ${total.toLocaleString()}`;
    };

    renderTransactionReport();
    calculateTotalPayment();
});
