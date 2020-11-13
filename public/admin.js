// const controller = require("../controller/controller");
var modal = document.getElementById("opretModal");
var btn = document.getElementById("opretBtn");
var span = document.getElementsByClassName("close")[0];
var anulBtn = document.getElementById('annuller')
var opretBtn = document.getElementById('opret')
var inputs = document.querySelectorAll('input');

btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

anulBtn.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


opretBtn.onclick = async function () {
    let name = inputs[0].value;
    let price = inputs[1].value;
    let category = inputs[2].value;

    let product = {
        name,
        price,
        kategori: category
    };

    await post('/api/products/', product);

    // console.log(JSON.stringify(product))

    // console.log(`Produkt oprettet: ${product}`);
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
