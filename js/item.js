let itemData = JSON.parse(localStorage.getItem("itemData")) || [];

// Tambah Item
document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaItem = document.getElementById("namaItem").value;

    const newItem = {
        id: `ITEM${Date.now()}`,
        nama: namaItem,
    };

    itemData.push(newItem);
    localStorage.setItem("itemData", JSON.stringify(itemData));

    tampilkanAlert("Item berhasil ditambahkan!", "success");
    tampilkanItem();
    document.getElementById("itemForm").reset();
});

// Tampilkan Item
function tampilkanItem() {
    const itemTable = document.getElementById("itemTable");
    itemTable.innerHTML = "";

    itemData.forEach((item) => {
        itemTable.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nama}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem('${item.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusItem('${item.id}')"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Edit Item
function editItem(id) {
    const item = itemData.find((i) => i.id === id);
    if (item) {
        document.getElementById("namaItem").value = item.nama;
        hapusItem(id);
    }
}

// Hapus Item
function hapusItem(id) {
    itemData = itemData.filter((i) => i.id !== id);
    localStorage.setItem("itemData", JSON.stringify(itemData));
    tampilkanAlert("Item berhasil dihapus!", "danger");
    tampilkanItem();
}

// Tampilkan Alert
function tampilkanAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 3000);
}

// Muat data saat halaman pertama kali dimuat
tampilkanItem();
