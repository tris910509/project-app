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

    // Render keranjang
    const renderCart = () => {
        cartTable.innerHTML = "";
        cart.forEach((item, index) => {
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
    };

    // Tambahkan item ke keranjang
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

    // Hapus item dari keranjang
    window.removeFromCart = (index) => {
        const productIndex = products.findIndex((p) => p.id === cart[index].productId);
        products[productIndex].stock += cart[index].quantity;
        localStorage.setItem("products", JSON.stringify(products));

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    // Lanjut ke pembayaran
    proceedToPayment.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Keranjang kosong. Tambahkan barang terlebih dahulu.");
            return;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "pembayaran.html";
    });

    populateDropdowns();
    renderCart();
});
