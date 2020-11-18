const { KeyObject } = require("crypto");

// const controller = require("../controller/controller");
var modals = document.getElementsByClassName("modal");
var opretModal = document.getElementById("opretModal");
var ændreModal = document.getElementById("ændreModal");

var openModalBtns = document.getElementsByClassName("openModal");
var opretModalBtn = document.getElementById("opretBtn");
var ændreModalBtn = document.getElementById("ændreBtn");

var closeElements = document.querySelectorAll("#close");
var opretBtn = document.getElementById('opret')
var inputs = document.querySelectorAll('input');
var products;

// console.log(modals)
// console.log(openModalBtns)


async function initialize() {
    try {
        products = await get('api/products');
    } catch (fejl) {
        console.log(fejl);
    }
}
initialize();

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
    if (event.target == opretModal || event.key == 'Escape') {
        opretModal.style.display = "none";
    } else if (event.target == ændreModal || event.key == 'Escape') {
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