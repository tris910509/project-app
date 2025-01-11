document.addEventListener("DOMContentLoaded", () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const customerForm = document.getElementById("customerForm");
    const customerTable = document.getElementById("customerTable");
    const customerId = document.getElementById("customerId");
    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");
    const customerAddress = document.getElementById("customerAddress");

    // Render tabel pelanggan
    const renderCustomers = () => {
        customerTable.innerHTML = "";
        customers.forEach((customer, index) => {
            customerTable.innerHTML += `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editCustomer(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    // Tambah/Update pelanggan
    customerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = customerId.value || `CUST-${Date.now()}`;
        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();
        const address = customerAddress.value.trim();

        if (!name || !phone || !address) {
            alert("Semua field wajib diisi!");
            return;
        }

        const existingIndex = customers.findIndex((cust) => cust.id === id);
        if (existingIndex >= 0) {
            // Update pelanggan
            customers[existingIndex] = { id, name, phone, address };
            alert("Pelanggan berhasil diperbarui!");
        } else {
            // Tambah pelanggan baru
            customers.push({ id, name, phone, address });
            alert("Pelanggan berhasil ditambahkan!");
        }

        localStorage.setItem("customers", JSON.stringify(customers));
        renderCustomers();
        customerForm.reset();
    });

    // Edit pelanggan
    window.editCustomer = (index) => {
        const customer = customers[index];
        customerId.value = customer.id;
        customerName.value = customer.name;
        customerPhone.value = customer.phone;
        customerAddress.value = customer.address;
    };

    // Hapus pelanggan
    window.deleteCustomer = (index) => {
        if (confirm("Yakin ingin menghapus pelanggan ini?")) {
            customers.splice(index, 1);
            localStorage.setItem("customers", JSON.stringify(customers));
            renderCustomers();
        }
    };

    renderCustomers();
});
