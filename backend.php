<?php

function getItems() {
    $jsonData = file_get_contents('items.json');
    return json_decode($jsonData, true);
}

function saveItem($item) {
    $items = getItems();
    $items[] = $item;
    file_put_contents('items.json', json_encode($items));
}

function updateItem($index, $newItem) {
    $items = getItems();
    $items[$index] = $newItem;
    file_put_contents('items.json', json_encode($items));
}

function deleteItem($index) {
    $items = getItems();
    array_splice($items, $index, 1);
    file_put_contents('items.json', json_encode($items));
}

// API Endpoints

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(getItems());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $item = json_decode(file_get_contents('php://input'), true);
    saveItem($item);
    echo 'Item saved successfully';
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $index = $_GET['index'];
    $newItem = json_decode(file_get_contents('php://input'), true);
    updateItem($index, $newItem);
    echo 'Item updated successfully';
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $index = $_GET['index'];
    deleteItem($index);
    echo 'Item deleted successfully';
} else {
    echo 'Invalid request';
}
