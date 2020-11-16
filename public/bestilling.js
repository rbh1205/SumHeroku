var opretButton = document.getElementById('opretButton')
var bordSelect = document.getElementById('bordNr')
var bemærkningInput = document.getElementById('bemærkning')
var regning = document.getElementById('regning')
var samletPrisInput = document.getElementById('samletPris')
var bordeKnap = document.getElementById('hentborde')
var annullerKnap = document.getElementById('annuller')
var close = document.getElementById('close')
var modal = document.getElementById('bordeModal')
var products;

opretButton.onclick = opretHandler


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

function generateBestillingTable(orders) {
    let html = '<table id="orders"><tr id="theader"><th>Bord nr</th><th>Samlet pris</th></tr>'
    for (order of orders) {
        html += '<tr><td>' +order.table + 
            '</td><td>' + order.price +
            '</td></tr>\n';
    }
    html += '</table>';
    return html; 
}

function samletPris(pris) {
    let samletPris = parseInt(samletPrisInput.value) + parseInt(pris);
    samletPrisInput.value = samletPris
}


function productHandler(event) {
    let pAntal;
    let pNavn = event.currentTarget.childNodes[0].innerHTML;
    let pPris = event.currentTarget.childNodes[1].innerHTML;
    let found = false;
    let enkeltPris;
    let foundElement;
    let i = 1;
    while (!found && i < regning.children.length) {
        if (regning.children[i].childNodes[0].childNodes[0].innerHTML === pNavn) {
            foundElement = regning.children[i].childNodes[0]
            pAntal = parseInt(foundElement.childNodes[1].innerHTML) + 1
            found = true
        }
        i++;
    }
    enkeltPris = parseInt(pPris)
    if (found) {
        pPris *= pAntal;
        foundElement.childNodes[1].innerHTML = pAntal;
        foundElement.childNodes[2].innerHTML = pPris;
    }
    else {
        regning.innerHTML += '<tr><td>' + pNavn + '</td><td>' + 1 + '</td><td>' + pPris + '</td></tr>'
    }
    samletPris(enkeltPris)
}


async function opretHandler() {
    let time = Date.now();
    let table = bordSelect.value;
    let waiter = 'Per';
    let products = JSON.stringify(getRegning());
    let price = samletPrisInput.value;
    let comment = bemærkningInput.value;
    await post('/api/orders',{time, table, waiter, products, price, comment});
    samletPrisInput.value = ""
    bemærkningInput.value = ""
    bordSelect.value = 1
    rydRegning()

}

function rydRegning(){
    regning.innerHTML = '<tr><th>Beskrivelse</th><th>Antal</th><th>Pris</th></tr>' ;
}

function getRegning(){
    let toReturn = [];
    for(let i = 1; i < regning.children.length; i++){
        let j = regning.children[i].childNodes[0];
        toReturn.push({name: j.childNodes[0].innerHTML, amount: j.childNodes[1].innerHTML, price: j.childNodes[2].innerHTML})
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


async function jeppesFunkion(url) {
    try {
        orders = await get(url); 
    } catch (fejl){
        console.log(fejl); 
    }
    let table = document.getElementById('orders');
    table.innerHTML = generateBestillingTable(orders);
    
    console.log(table.childNodes.children)

    let trs = document.querySelectorAll('tr');
    
    // console.log(trs)
    // for (tr of trs) 
    //     if (tr.id != 'theader')
            // tr.onclick = console.log(tr.innerHTML); 
}
jeppesFunkion('/api/orders')

annullerKnap.onclick = function () {
    modal.style.display = "none"
}

bordeKnap.onclick = function () {
    modal.style.display = "block"
}