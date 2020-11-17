// const controller = require("../controller/controller");
var opretModal = document.getElementById("opretModal");
var ændreModal = document.getElementById("ændreModal");
var opretModalBtn = document.getElementById("opretBtn");
var ændreModalBtn = document.getElementById("ændreBtn");
var closeElements = document.querySelectorAll("#close");
var opretBtn = document.getElementById('opret')
var inputs = document.querySelectorAll('input');
var products;

async function initialize() {
    try {
        products = await get('api/products');
    } catch (fejl) {
        console.log(fejl);
    }
}
initialize();

opretModalBtn.onclick = function () {
    opretModal.style.display = "block";
}

ændreModalBtn.onclick = function () {
    ændreModal.style.display = "block";
}

// When the user clicks on <span> (x) or annuller, close the modals
for (e of closeElements) {
    e.onclick = function () {
        opretModal.style.display = "none";
        ændreModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == opretModal) {
        opretModal.style.display = "none";
    } else if (event.target == ændreModal) {
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