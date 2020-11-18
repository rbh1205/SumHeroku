// const controller = require("../controller/controller");
var modals = document.getElementsByClassName("modal");
var opretModal = document.getElementById("opretModal");
var ændreModal = document.getElementById("ændreModal");
var openModalBtns = document.getElementsByClassName("openModal");
var closeElements = document.querySelectorAll("#close");
var opretBtn = document.getElementById('opret')
var inputs = document.querySelectorAll('input');
var productTable = document.getElementById('produktTable')
var products = [];

async function initialize() {
    try {
        products = await get('api/products');
    } catch (fejl) {
        console.log(fejl);
    }
}

for (let i = 0; i < openModalBtns.length; i++) {
    openModalBtns[i].onclick = () => {
        modals[i].style.display = 'block';
    }
}

// When the user clicks on <span> (x) or annuller, close the modals
for (e of closeElements) {
    e.onclick = function () {
        opretModal.style.display = "none";
        ændreModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal or the escape button, close it
window.onclick = (event) => closeModals(event);
document.body.addEventListener('keyup', (event) => closeModals(event))
function closeModals(event) {
    if (event.target == opretModal || event.target == ændreModal || event.key == 'Escape') {
        opretModal.style.display = "none";
        ændreModal.style.display = "none";
    }
}

opretBtn.onclick = async function () {
    let name = inputs[0].value;
    let price = parseInt(inputs[1].value);
    let category = inputs[2].value;

    try {
        if (!name) throw 'Indtast korrekt navn på produktet'
        if (!category) throw 'Indtast korrekt kategori på produktet'
        if (isNaN(price)) throw 'Indtast korrekt pris på produktet'
    } catch (err) {
        alert(err)
        return;
    }

    let product = {
        name,
        price,
        category
    };

    for (input of inputs)
        input.value = '';

    await post('/api/products/', product);
    console.log('Produkt oprettet', product);
    products.push(product)
    insertProductRow(product)
}

function createProductTable() {
    for (const p of products) {
        insertProductRow(p)
    }
}

function insertProductRow(product) {
    // Create an empty <tr> element and add it to the last position of the table
    var row = productTable.insertRow();

    /** 
     * Inserts three new cells (<td> elements)
     * at the 1st, 2nd and 3rd position of the "new" <tr> element
     * and adds data to the new cells
    */
    var data = [product.name, product.price, product.category];
    for (let i = 0; i < 3; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = data[i];
        cell.contentEditable = 'true';
    }

    var okCell = row.insertCell(3);
    var deleteCell = row.insertCell(4);
    okCell.innerHTML = 'OK';
    deleteCell.innerHTML = 'SLET';

    okCell.onclick = () => updateProduct(product, [row.children[0].innerHTML, row.children[1].innerHTML, row.children[2].innerHTML]);
    deleteCell.onclick = () => deleteProduct(product);
}

function updateProduct(product, data) {
    console.log(product, data)
}

async function deleteProduct(product) {
    console.log(await deLete(`/api/products/${product._id}/`))
    products.splice(products.indexOf(product), 1)
    // console.log('Produkt slettet', product)
    // console.log(products)
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 200) // Created
        throw new Error(respons.status);
    return await respons.json();
}

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function deLete(url) {
    let respons = await fetch(url, {
        method: "DELETE"
    });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function main() {
    await initialize();
    createProductTable();
}

main();