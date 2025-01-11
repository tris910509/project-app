document.addEventListener("DOMContentLoaded", () => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoryForm = document.getElementById("categoryForm");
    const categoryTable = document.getElementById("categoryTable");

    const renderCategories = () => {
        categoryTable.innerHTML = "";
        categories.forEach((category, index) => {
            categoryTable.innerHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editCategory(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Hapus</button>
                    </td>
                </tr>`;
        });
    };

    categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("categoryName").value;

        if (!name) {
            alert("Nama kategori harus diisi!");
            return;
        }

        const id = `CAT-${Date.now()}`;
        const newCategory = { id, name };
        categories.push(newCategory);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
        categoryForm.reset();
    });

    window.editCategory = (index) => {
        const category = categories[index];
        document.getElementById("categoryName").value = category.name;
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
    };

    window.deleteCategory = (index) => {
        if (confirm("Yakin ingin menghapus kategori ini?")) {
            categories.splice(index, 1);
            localStorage.setItem("categories", JSON.stringify(categories));
            renderCategories();
        }
    };

    renderCategories();
});
