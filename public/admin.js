var modals = document.getElementsByClassName("modal");
var opretModal = document.getElementById("opretModal");
var ændreModal = document.getElementById("ændreModal");
var openModalBtns = document.getElementsByClassName("openModal");
var closeElements = document.querySelectorAll("#close");
var opretBtn = document.getElementById('opret')
var inputData = document.getElementsByClassName('data')
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
        for (input of inputData)
            input.value = '';
    }
}

// When the user clicks anywhere outside of the modal or the escape button, close it
window.onclick = (event) => closeModals(event);
document.body.addEventListener('keyup', (event) => closeModals(event))
function closeModals(event) {
    if (event.target == opretModal || event.target == ændreModal || event.key == 'Escape') {
        opretModal.style.display = "none";
        ændreModal.style.display = "none";
        for (input of inputData)
            input.value = '';
    }
}

opretBtn.onclick = async function () {
    let name = inputData[0].value;
    let price = parseInt(inputData[1].value);
    let category = inputData[2].value;

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

    for (input of inputData)
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

    // Inserts three new cells (<td> elements) 
    // at the 1st, 2nd and 3rd position of the "new" <tr> element
    // and adds data to the new cells
    var data = [product.name, product.price, product.category];

    let name = document.createElement('input')
    name.setAttribute('type', 'text')
    name.value = data[0]
    let cellName = row.insertCell(0)
    cellName.appendChild(name)

    let price = document.createElement('input')
    price.setAttribute('type', 'number')
    price.value = data[1]
    let cellPrice = row.insertCell(1)
    cellPrice.appendChild(price)

    let category = document.createElement('select')
    let options = [document.createElement("option"), document.createElement("option"), document.createElement("option")];
    options[0].text = "Madvare";
    options[1].text = "Drikkevare";
    options[2].text = "Diverse";

    if (data[2] === 'Madvare') {
        options[0].setAttribute('selected', 'selected')
    } else if (data[2] === 'Drikkevare') {
        options[1].setAttribute('selected', 'selected')
    } else {
        options[2].setAttribute('selected', 'selected')
    }
    
    category.add(options[0]);
    category.add(options[1]);
    category.add(options[2]);
    row.insertCell(2).innerHTML = category.outerHTML;

    // Creates two cells for update and delete functions
    var okCell = row.insertCell(3);
    var deleteCell = row.insertCell(4);
    okCell.innerHTML = 'OK';
    deleteCell.innerHTML = 'SLET';

    // Sets onclick for update and delete cells
    okCell.onclick = () => {
        console.log(category.options[category.selectedIndex])
        updateProduct(product, [name.value, price.value, category.value]);
    }
    deleteCell.onclick = () => {
        row.parentNode.removeChild(row)
        deleteProduct(product);
    }
}

async function updateProduct(product, data) {

    let p = {
        name: data[0],
        price: parseInt(data[1]),
        category: data[2]
    }
    console.log(p)
    // console.log(await post(`/api/products/update/${product._id}`, p));
}

async function deleteProduct(product) {
    console.log(product._id)
    // console.log(await deLete(`/api/products/${product._id}`))
    products.splice(products.indexOf(product), 1)
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