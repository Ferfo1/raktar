document.addEventListener('DOMContentLoaded', function () {
    displayItems();
});

function hozzaadas() {
    const itemName = document.getElementById('megnevezes').value;
    const itemQuantity = document.getElementById('darabszam').value;

    if (itemName && itemQuantity) {
        const newItem = {
            name: itemName,
            quantity: itemQuantity
        };

        addItem(newItem);
    }
}

function modositas() {
    const selectedItemIndex = document.getElementById('termek-lista').selectedIndex;
    const newName = document.getElementById('modositasMegnevezes').value;
    const newQuantity = document.getElementById('modositasDarabszam').value;

    if (selectedItemIndex !== -1 && newName && newQuantity) {
        const updatedItem = {
            name: newName,
            quantity: newQuantity
        };

        updateItem(selectedItemIndex, updatedItem);
    }
}

function torles() {
    const selectedItemIndex = document.getElementById('termek-lista').selectedIndex;

    if (selectedItemIndex !== -1) {
        deleteItem(selectedItemIndex);
    }
}

function displayItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backend.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const itemList = JSON.parse(xhr.responseText);
            const listElement = document.getElementById('termek-lista');
            listElement.innerHTML = '';

            itemList.forEach(item => {
                const option = document.createElement('option');
                option.textContent = `${item.name} - ${item.quantity} db`;
                listElement.appendChild(option);
            });
        }
    };
    xhr.send();
}

function addItem(newItem) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            displayItems();
        }
    };
    xhr.send(JSON.stringify(newItem));
}

function updateItem(index, updatedItem) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `backend.php?index=${index}`, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            displayItems();
        }
    };
    xhr.send(JSON.stringify(updatedItem));
}

function deleteItem(index) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `backend.php?index=${index}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            displayItems();
        }
    };
    xhr.send();
}

function kivalaszt() {
    const selectedItemIndex = document.getElementById('termek-lista').selectedIndex;

    if (selectedItemIndex !== -1) {
        const selectedNameInput = document.getElementById('modositasMegnevezes');
        const selectedQuantityInput = document.getElementById('modositasDarabszam');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'backend.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const itemList = JSON.parse(xhr.responseText);
                const selectedItem = itemList[selectedItemIndex];

                selectedNameInput.value = selectedItem.name;
                selectedQuantityInput.value = selectedItem.quantity;

                document.getElementById('modositas-container').style.display = 'block';
            }
        };
        xhr.send();
    }
}



