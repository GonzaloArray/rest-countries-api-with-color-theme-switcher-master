document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    initialFilter();
    initialFecht();
}
const flag = document.querySelector('#filter-flag');
const containFlag = document.querySelector('#contain-flag');
const formulario = document.querySelector('#formulario');
const inputSearcher = document.querySelector('#search-form');
const root = document.querySelector('#root');

// Array
const arrayContinent = [
    {
        name: 'Africa',
        id: '123123dsadasdfasdf2321sdf'
    },
    {
        name: 'Europe',
        id: '123123dsadsdasdf21312f'
    },
    {
        name: 'Asia',
        id: '123123dsadsd12321dsfaf'
    },
    {
        name: 'Oceania',
        id: '123123dsadsd123dafbvf'
    },
    {
        name: 'America',
        id: '123123dsaadsfdsdf'
    },
];

// Config page
let currentPage = 1;
// Not available
let itemsPerPage = 10;
let continent = '';
let arrayInfo;
let boolean = false;


document.getElementById("next-page-button").addEventListener("click", function () {
    currentPage++;
    initialFecht();
});
document.getElementById("prev-page-button").addEventListener("click", function () {
    currentPage--;
    initialFecht();
});
document.getElementById("dark-botton").addEventListener("click", darkMode);
function darkMode() {

    if (!boolean) {
        root.classList.add("dark");

        boolean = !boolean;
    }else{
        root.classList.remove("dark");        
        boolean = !boolean;
    }
}


const initialFilter = async () => {

    arrayContinent.forEach(contain => {
        const { name, id } = contain;

        const options = document.createElement('option');
        options.value = name;
        options.textContent = name

        flag.appendChild(options);
    })

}


flag.addEventListener("click", removeDefaultOption);
flag.addEventListener("change", handleContinent);
formulario.addEventListener("submit", handleSearch);

function handleSearch(e) {
    e.preventDefault();
    const searchValue = inputSearcher.value.toLowerCase();
    console.log(searchValue)
    filterByName(searchValue);
}

function filterByName(value) {
    const filter = arrayInfo.filter(e => e.name.common.toLowerCase().includes(value));
    if (filter.length > 0) {
        containCard(filter);
    }else{
        errorDetected();
    }
}

// Handle container
function handleContinent(e) {
    const selectedContinent = e.target.value.toLowerCase();;
    filterByContinent(selectedContinent);
}

function filterByContinent(value) {
    continent = value;
    initialFecht()
}


// Remove default item
function removeDefaultOption() {
    flag.querySelector("option[value='region1']").style.display = 'none';
}

const initialFecht = async () => {
    const url = `https://restcountries.com/v3.1/${continent ? `region/${continent}`: 'all' }?page=${currentPage}&per_page=${itemsPerPage}&fields=name,capital,currencies,flags,population,region,capital`;
    const request = await fetch(url);
    const json = await request.json();
    containCard(json);
    contralador(json);
}

function contralador(value) {
    arrayInfo = value;
}


// Painting
const containCard = (value) => {
    containFlag.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageElements = value.slice(startIndex, endIndex);

    currentPageElements.forEach(e => {
        const { flags, name, population, region, capital } = e;

        const div = document.createElement('a');
        div.className = 'main-card'
        div.href = `./html/details.html?id=${name.common}`
        div.innerHTML = `
            <img class="main-img" loading="lazy" src="${flags.png}" />
            <div class="main-card-contain">
                <h2 class="main-card-general main-card-title">${name.common}</h2>
                <p class="main-card-general">Population: <span>${population}</span></p>
                <p class="main-card-general">Region: <span>${region}</span></p>
                <p class="main-card-general">Capital: <span>${capital}</span></p>
            </div>
        `;

        containFlag.appendChild(div);
    })

}
function errorDetected() {
    containFlag.innerHTML = "";

    const div = document.createElement('div');
    div.className = "error-detected"
    div.innerHTML = `
        <p class="error-descrip">Country not find</p>
    `;

    containFlag.appendChild(div);
}