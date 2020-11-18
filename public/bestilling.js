var opretButton = document.getElementById('opretButton')
var rydButton = document.getElementById('rydButton')
var bordSelect = document.getElementById('bordNr')
var bemærkningInput = document.getElementById('bemærkning')
var regning = document.getElementById('regning')
var samletPrisInput = document.getElementById('samletPris')
var bordeKnap = document.getElementById('hentborde')
var annullerKnap = document.getElementById('annuller')
var close = document.getElementById('close')
var modal = document.getElementById('bordeModal')
var products;
var orderTable;

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

function generateBestillingTable(orders) {
    let html = ''
    for (order of orders) {
        html += '<tr id=' + order._id + '><td>' + order.table +
            '</td><td>' + order.price +
            '</td></tr>\n';
    }
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
    }
    else {
        regning.insertAdjacentHTML('beforeend', '<tr><td>' + pNavn + "</td>" + '<td><INPUT TYPE="NUMBER" MIN="0" MAX="100" STEP="1" VALUE="1" SIZE="6"></INPUT></td> <td>' + pPris + '</td><td><button>X</button></td></tr>')
        regning.children[regning.children.length - 1].children[0].children[1].children[0].addEventListener('input', updateSalgslinje.bind(event, enkeltPris))
        regning.children[regning.children.length - 1].children[0].children[3].children[0].addEventListener('click', sletSalgslinje)
    }
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
    event.currentTarget.parentElement.parentElement.parentElement.outerHTML = ""
    samletPris()
}



async function opretHandler() {
    let time = Date.now();
    let table = bordSelect.value;
    let waiter = 'Per';
    let products = JSON.stringify(getRegning());
    let price = samletPrisInput.value;
    let comment = bemærkningInput.value;
    await post('/api/orders', { time, table, waiter, products, price, comment });
    printRegning(time,table,waiter,price,comment)
    samletPrisInput.value = ""
    bemærkningInput.value = ""
    bordSelect.value = 1
    rydRegning()

}

function rydRegning() {
    regning.innerHTML = '<tr><th>Beskrivelse</th><th>Antal</th><th>Pris</th></tr>';
    samletPrisInput.value = 0
}

function getRegning() {
    let toReturn = [];
    for (let i = 1; i < regning.children.length; i++) {
        let j = regning.children[i].children[0];
        toReturn.push({ name: j.children[0].innerHTML, amount: j.children[1].children[0].value, price: j.children[2].innerHTML })
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
    let trs = document.querySelectorAll('tr');
    for (tr of trs)
        if (tr.id != 'theader')
            tr.onclick = productHandler;
}
main('/api/products');


async function jeppesFunkion(url) {
    try {
        orders = await get(url);
    } catch (fejl) {
        console.log(fejl);
    }
    let table = document.getElementById('orders');
    table.insertAdjacentHTML('beforeend',generateBestillingTable(orders));
    // console.log(Array.from(table.children[1].children))
    // Array.from(table.children[1].children).forEach(element => {
    //     element.addEventListener('click', editOrderHandler)
    // });

    // console.log(table.childNodes.children)

    // let trs = document.querySelectorAll('tr');

    // console.log(trs)
    // for (tr of trs) 
    //     if (tr.id != 'theader')
    // tr.onclick = console.log(tr.innerHTML); 
}
jeppesFunkion('/api/orders')

async function editOrderHandler(event) {
    // let id = event.currentTarget.parentElement.id
    // let orderToEdit;
    // for (order of orders) {
    //     if (order._id === id) {
    //         orderToEdit = order
    //     }
    // }
console.log("testorder")

}

annullerKnap.onclick = function () {
    modal.style.display = "none"
}

bordeKnap.onclick = function () {
    modal.style.display = "block"
}

function printRegning(time,table,waiter,price,comment) {
    let bong = getRegning()
    console.log('bord ' + table + ' ' + 'tid: ' + time);
    for (let i = 0; i < bong.length; i++) {
        console.log('Name: ' + bong[i].name + ' ' + 'Amount: ' + bong[i].amount + ' ' +'Price: ' + bong[i].price)
    }
    console.log('kommentar: ' + comment)
    console.log('Total: ' + price + 'DK' );
    console.log('din dejlige tjener: ' + waiter);
 
}