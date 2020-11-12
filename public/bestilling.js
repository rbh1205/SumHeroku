async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}
function generateProductTable(products) {
    let html = '<table><tr><th>Beskrivelse</th><th>Pris</th></tr>';
    for (product of products) {
        html += '<tr><td>' + product.name +
            '</td><td>' + product.price +
            '</td></tr>\n';
    }
    html += '</table>';
    return html;
}

let regning = document.getElementById('regning')
let samletPrisInput = document.getElementById('samletPris')

function samletPris() {

}

function productHandler(event) {
    let pAntal;
    let pNavn = event.currentTarget.childNodes[0].innerHTML;
    let pPris = event.currentTarget.childNodes[1].innerHTML
    let found = false
    let samletPris = 0;
    if (regning.children.length > 1 && !found) {
        for (e of regning.children) {
            if (e.childNodes[0].childNodes[0].innerHTML === pNavn) {
                pAntal = parseInt(e.childNodes[0].childNodes[1].innerHTML) + 1
                found = true
            }
        }

    }
    if (found) {
        pPris *= pAntal;
        e.firstElementChild.childNodes[1].innerHTML = pAntal;
        e.firstElementChild.childNodes[2].innerHTML = pPris;

    }
    else {
        regning.innerHTML += '<tr><td>' + pNavn + '</td><td>' + 1 + '</td><td>' + pPris + '</td></tr>'
    }

    samletPris = function () {
        let samletPris = 0;
        for (e of regning.children) {
            samletPris += parseInt(e.childNodes[0].childNodes[2].innerHTML)
        }
        samletPrisInput.value = parseInt(samletPris)
    }
    samletPris()
}



async function main(url) {
    let products;
    try {
        products = await get(url);
    } catch (fejl) {
        console.log(fejl);
    }
    document.getElementById('produkter').innerHTML = generateProductTable(products);
    let trs = document.querySelectorAll('tr');
    for (tr of trs)
        tr.onclick = productHandler;
}
main('/api/products');