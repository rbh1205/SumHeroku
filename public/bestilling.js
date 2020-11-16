var opretButton = document.getElementById('opretButton')
var rydButton = document.getElementById('rydButton')
var bordSelect = document.getElementById('bordNr')
var bemærkningInput = document.getElementById('bemærkning')
var regning = document.getElementById('regning')
var samletPrisInput = document.getElementById('samletPris')
var products;
opretButton.onclick = opretHandler
rydButton.onclick = rydRegning


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
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

function generateProductTable(products) {
    let html = '<table><tr id="theader"><th>Beskrivelse</th><th>Pris</th></tr>';
    for (product of products) {
        html += '<tr><td>' + product.name +
            '</td><td>' + product.price +
            '</td></tr>\n';
    }
    html += '</table>';
    return html;
}



function samletPris() {
    let priser = regning.children
    let samletPris = 0;
    for (let i = 1; i < priser.length; i++) {
        samletPris += parseInt(priser[i].children[0].children[2].innerHTML)
    }
    samletPrisInput.value = samletPris
}

let linjeID = 1;


function productHandler(event) {
    let pAntal;
    let pNavn = event.currentTarget.children[0].innerHTML;
    let pPris = event.currentTarget.children[1].innerHTML;
    let found = false;
    let enkeltPris;
    let foundElement;
    let i = 1;

    while (!found && i < regning.children.length) {
        if (regning.children[i].children[0].children[0].innerHTML === pNavn) {
            foundElement = regning.children[i].children[0]
            pAntal = parseInt(foundElement.children[1].children[0].value)
            found = true
        }
        i++;
    }
    enkeltPris = parseInt(pPris)
    if (found) {
        addSalgslinje(foundElement, enkeltPris, pAntal)
        // regning.children[regning.children.length - 1].children[0].children[1].children[0].addEventListener('input', updateSalgslinje.bind(event, enkeltPris))
        // regning.children[regning.children.length - 1].children[0].children[3].children[0].addEventListener('click', sletSalgslinje)
    }
    else {
        regning.innerHTML += '<tr><td>' + pNavn + "</td>" + '<td><INPUT TYPE="NUMBER" MIN="0" MAX="100" STEP="1" VALUE="1" SIZE="6" id="inputNr' + linjeID + '"></INPUT></td> <td>' + pPris + '</td><td><button id="buttonNr' + linjeID + '">X</button></td></tr>'
        linjeID++
        // document.getElementById('buttonNr' + linjeID).addEventListener('click', sletSalgslinje)
        // document.getElementById('inputNr' + linjeID).addEventListener('input', updateSalgslinje.bind(event, enkeltPris))
        regning.children[regning.children.length - 1].children[0].children[1].children[0].addEventListener('input', updateSalgslinje.bind(event, enkeltPris))
        regning.children[regning.children.length - 1].children[0].children[3].children[0].addEventListener('click', sletSalgslinje)
    }
    // regning.children[regning.children.length - 1].children[0].children[1].children[0].addEventListener('input', updateSalgslinje.bind(event, enkeltPris))
    // regning.children[regning.children.length - 1].children[0].children[3].children[0].addEventListener('click', sletSalgslinje)

    samletPris()
}

function updateSalgslinje(enkeltPris, event) {
    let antal = event.currentTarget.value;
    let prisCell = event.currentTarget.parentElement.nextElementSibling;
    let nyPris = antal * enkeltPris;
    prisCell.innerHTML = nyPris;
    samletPris();
}



function addSalgslinje(element, pris, antal) {
    let nyAntal = antal + 1
    let nyPris = pris * nyAntal
    element.children[1].children[0].setAttribute('value', nyAntal);
    element.children[2].innerHTML = nyPris
    samletPris()
}
function sletSalgslinje(event) {
    console.log("test")
    event.currentTarget.parentElement.parentElement.parentElement.outerHTML = ""
}



async function opretHandler() {
    let time = Date.now();
    let table = bordSelect.value;
    let waiter = 'Per';
    let products = JSON.stringify(getRegning());
    let price = samletPrisInput.value;
    let comment = bemærkningInput.value;
    await post('/api/orders', { time, table, waiter, products, price, comment });
    samletPrisInput.value = ""
    bemærkningInput.value = ""
    bordSelect.value = 1
    rydRegning()

}

function rydRegning() {
    regning.innerHTML = '<tr><th>Beskrivelse</th><th>Antal</th><th>Pris</th></tr>';
}

function getRegning() {
    let toReturn = [];
    for (let i = 1; i < regning.children.length; i++) {
        let j = regning.children[i].children[0];
        toReturn.push({ name: j.children[0].innerHTML, amount: j.children[1].innerHTML, price: j.children[2].innerHTML })
    }
    return toReturn;
}

async function main(url) {
    try {
        products = await get(url);
    } catch (fejl) {
        console.log(fejl);
    }
    document.getElementById('produkter').innerHTML = generateProductTable(products);
    // console.log(products)
    let trs = document.querySelectorAll('tr');
    for (tr of trs)
        if (tr.id != 'theader')
            tr.onclick = productHandler;
}
main('/api/products');
