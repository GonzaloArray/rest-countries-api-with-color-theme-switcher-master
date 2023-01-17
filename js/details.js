document.addEventListener('DOMContentLoaded', startApp)

let cadenaParametrosUrl = location.search;
let parametros = new URLSearchParams(cadenaParametrosUrl)
let id = parametros.get('id').toLocaleLowerCase();

// document
const details = document.querySelector('#detail');

// Config page
let currentPage = 1;
// Not available
let itemsPerPage = 10;
let continent = '';
let arrayInfo;
let boolean = false;

document.getElementById("dark-botton").addEventListener("click", darkMode);
function darkMode() {

    if (!boolean) {
        root.classList.add("dark");

        boolean = !boolean;
    } else {
        root.classList.remove("dark");
        boolean = !boolean;
    }
}

function startApp() {
    initialFecht()
    document.title = `Front-end mentor - ${id}`
}

const initialFecht = async () => {
    const url = `https://restcountries.com/v3.1/name/${id}?page=${currentPage}&per_page=${itemsPerPage}`;
    const request = await fetch(url);
    const json = await request.json();


    containCard(json)
}

const containCard = (info) => {
    info.forEach(e => {
        console.log(e)
        const { flags, name, population, region, subregion, capital, languages, currencies, tld } = e;

        const img = document.createElement('img');
        img.className = 'dtl-img';
        img.src = flags.png;
        img.alt = name.common
        console.log(languages);
        const div = document.createElement('div');
        div.className = 'dtl-flex'
        div.innerHTML = `
            <h1 class="dtl-title">${name.common}</h1>
            <section class="dtl-sect-flex">
                <div class="dtl-contain-flex">
                    <p class="main-card-general">Population: <span>${population}</span></p>
                    <p class="main-card-general">Region: <span>${region}</span></p>
                    <p class="main-card-general">Sub Region: <span>${subregion}</span></p>
                    <p class="main-card-general">Capital: <span>${capital}</span></p>
                </div>
                <div class="dtl-contain-flex">
                    <p class="main-card-general">Top Level Domain: <span>${tld[0]}</span></p>
                    <p class="main-card-general">Currencies: <span>${currencies?.XCD?.name || 'Not-available'}</span></p>
                    <p class="main-card-general">Lenguages: <span>${Object.values(languages).join(', ')}</span></p>
                </div>
            </section>
        `;

        details.appendChild(img);
        details.appendChild(div)
    });
}