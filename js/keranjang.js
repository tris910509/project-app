document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const transactionForm = document.getElementById("transactionForm");
    const cartTable = document.getElementById("cartTable");
    const customerName = document.getElementById("customerName");
    const productName = document.getElementById("productName");
    const quantity = document.getElementById("quantity");
    const proceedToPayment = document.getElementById("proceedToPayment");

    // Tambahkan diskon dinamis berdasarkan total transaksi
    const calculateDiscount = (total) => {
        if (total >= 1000000) return 20; // Diskon 20% untuk total > Rp 1.000.000
        if (total >= 500000) return 10; // Diskon 10% untuk total > Rp 500.000
        return 0;
    };

    // Render keranjang per pelanggan
    const renderCart = () => {
        const currentCustomer = customerName.value;
        cartTable.innerHTML = "";
        const customerCart = cart.filter((item) => item.customer === currentCustomer);

        let grandTotal = 0;
        customerCart.forEach((item, index) => {
            grandTotal += item.totalPrice;

            cartTable.innerHTML += `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>Rp ${item.totalPrice.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Hapus</button>
                    </td>
                </tr>`;
        });

        const discount = calculateDiscount(grandTotal);
        const finalTotal = grandTotal - (grandTotal * discount) / 100;

        cartTable.innerHTML += `
            <tr>
                <td colspan="2"><strong>Grand Total</strong></td>
                <td colspan="2"><strong>Rp ${finalTotal.toLocaleString()} (${discount}% Diskon)</strong></td>
            </tr>`;
    };

    // Tambahkan item ke keranjang berdasarkan pelanggan
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

        // Kurangi stok
        const productIndex = products.findIndex((p) => p.id === productId);
        products[productIndex].stock -= quantityValue;
        localStorage.setItem("products", JSON.stringify(products));

        // Tambahkan ke keranjang
        const newCartItem = {
            customer,
            productId,
            productName: productOption.text,
            quantity: quantityValue,
            totalPrice: price * quantityValue,
        };

        cart.push(newCartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        transactionForm.reset();
    });

    // Lanjut ke pembayaran dengan keranjang per pelanggan
    proceedToPayment.addEventListener("click", () => {
        const currentCustomer = customerName.value;
        const customerCart = cart.filter((item) => item.customer === currentCustomer);

        if (customerCart.length === 0) {
            alert("Keranjang kosong untuk pelanggan ini.");
            return;
        }

        localStorage.setItem("customerCart", JSON.stringify(customerCart));
        window.location.href = "pembayaran.html";
    });

    populateDropdowns();
    renderCart();
});
