document.addEventListener("DOMContentLoaded", () => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const itemForm = document.getElementById("itemForm");
    const itemTable = document.getElementById("itemTable");

    const renderItems = () => {
        itemTable.innerHTML = "";
        items.forEach((item, index) => {
            itemTable.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editItem(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("itemName").value;

        if (!name) {
            alert("Nama item harus diisi!");
            return;
        }

        const id = `ITEM-${Date.now()}`;
        const newItem = { id, name };
        items.push(newItem);
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
        itemForm.reset();
    });

    window.editItem = (index) => {
        const item = items[index];
        document.getElementById("itemName").value = item.name;
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
    };

    window.deleteItem = (index) => {
        if (confirm("Yakin ingin menghapus item ini?")) {
            items.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(items));
            renderItems();
        }
    };

    renderItems();
});
