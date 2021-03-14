const endpoint = 'http://127.0.0.1:5500/data.json'
const getData = [];
const searchInput = document.querySelector('#search-input');
const searchList = document.querySelector('#show-suggestions');

searchInput.addEventListener('keyup', displayMatches);

// get data from json file
fetch(endpoint).then((dataResponse) => {
    dataResponse.json().then((data) => {
        getData.push(...data);
    });
});

// add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// filter words from input
function findMatches(wordToMatch, getData) {
    return getData.filter((data) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return data.title.match(regex) || data.description.match(regex);
    });
}

// get data from array
function displayMatches() {

    const matchArray = findMatches(this.value, getData);
    const html = matchArray.map((place) => {

        const regexWord = new RegExp(this.value, 'gi');
        const title = place.title.replace(regexWord, `<span class="hl">${this.value}</span>`);
        const description = place.description.replace(regexWord, `<span class="hl">${this.value}</span>`);

        return `<li> <span class='name'>${title}, ${description}</span> </li>`;

    }).join(''); // from array to string

    searchList.innerHTML = html;

    if (searchInput.value == '') {
        searchList.innerHTML = ''
    }
}

