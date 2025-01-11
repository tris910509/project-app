document.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    document.getElementById("totalProduk").textContent = products.length;
    document.getElementById("totalTransaksi").textContent = transactions.length;
    document.getElementById("totalUser").textContent = users.length;
    document.getElementById("totalPembayaran").textContent = payments.length;
});
