// Variabel untuk menyimpan ID item yang unik dan data item
let itemIdCounter = JSON.parse(localStorage.getItem("itemIdCounter")) || 1;
let itemData = JSON.parse(localStorage.getItem("itemData")) || [];

// Fungsi untuk menghasilkan ID unik untuk setiap item
function generateItemId() {
    const id = `ITEM-${itemIdCounter++}`;
    localStorage.setItem("itemIdCounter", JSON.stringify(itemIdCounter));  // Update counter ID
    return id;
}

// Fungsi untuk menyimpan data item ke LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("itemData", JSON.stringify(itemData));
}

// Menangani event submit form item
document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const editItemId = document.getElementById("editItemId").value;  // Ambil ID item jika sedang diedit

    const item = {
        id: editItemId || generateItemId(),  // Jika sedang mengedit, gunakan ID yang sudah ada
        nama: document.getElementById("namaItem").value,  // Nama item dari input
        status: document.getElementById("statusItem").checked ? "Aktif" : "Nonaktif",  // Status item dari switch
    };

    if (editItemId) {
        const index = itemData.findIndex((i) => i.id === editItemId);  // Cari item yang sedang diedit
        itemData[index] = item;  // Update item yang diedit
        document.getElementById("saveItemButton").innerHTML = '<i class="fas fa-save"></i> Simpan Item';
    } else {
        itemData.push(item);  // Tambahkan item baru ke array itemData
    }

    saveToLocalStorage();  // Simpan data ke LocalStorage
    tampilkanItem();  // Tampilkan item yang sudah diupdate
    alertMessage("Item berhasil disimpan!", "success");  // Menampilkan alert sukses
    this.reset();  // Reset form setelah simpan
});

// Menampilkan daftar item dalam tabel
function tampilkanItem() {
    const itemTable = document.getElementById("itemTable");
    itemTable.innerHTML = "";  // Kosongkan tabel sebelum menampilkan data
    itemData.forEach((item, index) => {
        itemTable.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nama}</td>
                <td>${item.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusItem(${index})"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Menghapus item
function hapusItem(index) {
    if (confirm("Yakin ingin menghapus item ini?")) {
        itemData.splice(index, 1);  // Hapus item dari array
        saveToLocalStorage();  // Simpan perubahan ke LocalStorage
        tampilkanItem();  // Tampilkan item yang telah diperbarui
        alertMessage("Item berhasil dihapus!", "danger");  // Menampilkan alert sukses
    }
}

// Mengedit item
function editItem(index) {
    const item = itemData[index];
    document.getElementById("editItemId").value = item.id;  // Set ID item yang sedang diedit
    document.getElementById("namaItem").value = item.nama;  // Set nama item
    document.getElementById("statusItem").checked = item.status === "Aktif";  // Set status item
    document.getElementById("saveItemButton").innerHTML = '<i class="fas fa-save"></i> Perbarui Item';  // Ganti tombol jadi perbarui
}

// Menampilkan alert
function alertMessage(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Menampilkan daftar item ketika halaman dimuat
tampilkanItem();
