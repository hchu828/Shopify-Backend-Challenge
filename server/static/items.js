const BASE_URL = "http://localhost:5001";

const $itemList = $("#items-list");
const $itemForm = $("#new-item-form");

/** given data about an item, generate html */

function generateItemHTML(item) {
    return `
        <div data-item-id="${item.id}">
        <li>
            ${item.name} / $${item.price} /
        </li>
        <img class="Item-img"
                src="${item.image}"
                alt="(no image provided)">
        <div>
            <button class="show-edit-form">Edit</button>
            <button class="delete-button">Delete</button>
        </div>
        <form class="hidden" id="edit-item-${item.id}">
            <label for="item-name-${item.id}">Name</label>
            <input 
                id="item-name-${item.id}" 
                name="item-name-${item.id}" 
                value="${item.name}">
            <label for="item-price-${item.id}">Price</label>
            <input 
                id="item-price-${item.id}" 
                price="item-price-${item.id}" 
                value="${item.price}">
            <button class="edit-button">Edit</button>
        </form>
        </div>
    `;
}


/** Get  items. Returns [{item}, ...] */

async function getItems() {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data.items;
}

/** Put  items on page */

function showItems(items) {
    for(let itemData of items) {
        let $item = $(generateItemHTML(itemData));
        $itemList.append($item);
    }
}

/** Handle form for adding new item */

async function addNewItem(evt) {
    evt.preventDefault();

    const name = $("#form-name").val();
    const price = $("#form-price").val();
    const image = $("#form-image").val();

    const newItemResponse = await axios.post(`${BASE_URL}/items`, {
        name,
        price,
        image,
    });

    const newItem = $(generateItemHTML(newItemResponse.data.item));
    $itemList.append(newItem);
    $itemForm.trigger("reset");
}

$itemForm.on("submit", addNewItem);

function showEditForm(evt) {
  evt.preventDefault();

  let $form = $(#)
}

/** Handle clicking delete, displays delete form */

async function deleteItem(evt) {
    evt.preventDefault();

    let $item = $(evt.target).parent().parent();
    let itemId = $item.attr("data-item-id");

    await axios.delete(`${BASE_URL}/items/${itemId}`);
    $item.remove();
    console.log("deleted")
}

$itemList.on("click", ".delete-button", deleteItem);

async function start() {
    const items = await getItems();
    showItems(items);
}

start();
