let itemIdCounter = JSON.parse(localStorage.getItem("itemIdCounter")) || 1;
let itemData = JSON.parse(localStorage.getItem("itemData")) || [];

// ID Generator
function generateItemId() {
    const id = `ITEM-${itemIdCounter++}`;
    localStorage.setItem("itemIdCounter", JSON.stringify(itemIdCounter));
    return id;
}

// Simpan Data ke Local Storage
function saveToLocalStorage() {
    localStorage.setItem("itemData", JSON.stringify(itemData));
}

// Tambahkan Item
document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const editItemId = document.getElementById("editItemId").value;

    const item = {
        id: editItemId || generateItemId(),
        nama: document.getElementById("namaItem").value,
        status: document.getElementById("statusItem").checked ? "Aktif" : "Nonaktif",
    };

    if (editItemId) {
        const index = itemData.findIndex((i) => i.id === editItemId);
        itemData[index] = item;
        document.getElementById("saveItemButton").innerHTML = '<i class="fas fa-save"></i> Simpan Item';
    } else {
        itemData.push(item);
    }

    saveToLocalStorage();
    tampilkanItem();
    alert("Item berhasil disimpan!");
    this.reset();
}

// Tampilkan Item
function tampilkanItem() {
    const itemTable = document.getElementById("itemTable");
    itemTable.innerHTML = "";
    itemData.forEach((item, index) => {
        itemTable.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nama}</td>
                <td>${item.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="hapusItem(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Hapus Item
function hapusItem(index) {
    if (confirm("Yakin ingin menghapus item ini?")) {
        itemData.splice(index, 1);
        saveToLocalStorage();
        tampilkanItem();
    }
}

// Edit Item
function editItem(index) {
    const item = itemData[index];
    document.getElementById("editItemId").value = item.id;
    document.getElementById("namaItem").value = item.nama;
    document.getElementById("statusItem").checked = item.status === "Aktif";
    document.getElementById("saveItemButton").innerHTML = '<i class="fas fa-save"></i> Perbarui Item';
}

tampilkanItem();
