document.addEventListener("DOMContentLoaded", () => {
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const supplierForm = document.getElementById("supplierForm");
    const supplierTable = document.getElementById("supplierTable");

    const renderSuppliers = () => {
        supplierTable.innerHTML = "";
        suppliers.forEach((supplier, index) => {
            supplierTable.innerHTML += `
                <tr>
                    <td>${supplier.id}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.contact}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editSupplier(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteSupplier(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    supplierForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("supplierName").value;
        const contact = document.getElementById("supplierContact").value;

        if (!name || !contact) {
            alert("Semua bidang harus diisi!");
            return;
        }

        const id = `SUP-${Date.now()}`;
        const newSupplier = { id, name, contact };
        suppliers.push(newSupplier);
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
        renderSuppliers();
        supplierForm.reset();
    });

    window.editSupplier = (index) => {
        const supplier = suppliers[index];
        document.getElementById("supplierName").value = supplier.name;
        document.getElementById("supplierContact").value = supplier.contact;
        suppliers.splice(index, 1);
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
        renderSuppliers();
    };

    window.deleteSupplier = (index) => {
        if (confirm("Yakin ingin menghapus supplier ini?")) {
            suppliers.splice(index, 1);
            localStorage.setItem("suppliers", JSON.stringify(suppliers));
            renderSuppliers();
        }
    };

    renderSuppliers();
});
