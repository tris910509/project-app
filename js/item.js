let itemData = [];
let itemIdCounter = 1;

// ID Generator
function generateItemId() {
    return `ITM-${itemIdCounter++}`;
}

// Simpan Data ke Local Storage
function saveToLocalStorage() {
    localStorage.setItem("itemData", JSON.stringify(itemData));
}

// Tambahkan Item
document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const item = {
        id: generateItemId(),
        nama: document.getElementById("namaItem").value,
        status: document.getElementById("itemSwitch").checked ? "Aktif" : "Nonaktif",
    };
    itemData.push(item);
    tampilkanItem();
    alert("Item berhasil ditambahkan!");
    this.reset();
});

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

// Filter Item
function filterItem() {
    const filter = document.getElementById("filterItemStatus").value;
    const filteredData = filter ? itemData.filter((item) => item.status === filter) : itemData;
    document.getElementById("itemTable").innerHTML = "";
    filteredData.forEach((item, index) => {
        document.getElementById("itemTable").innerHTML += `
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
        tampilkanItem();
    }
}

// Edit Item
function editItem(index) {
    const item = itemData[index];
    document.getElementById("namaItem").value = item.nama;
    document.getElementById("itemSwitch").checked = item.status === "Aktif";
    hapusItem(index);
}

tampilkanItem();
