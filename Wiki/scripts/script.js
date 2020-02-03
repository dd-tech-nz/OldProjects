

// function to open new browser window with random wikipedia item
function randomWiki() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}
// function to handle submitted search form
function handleSubmit(event) {
    //prevent page from reloading when form has been submitted
    event.preventDefault();
    // get value of input field
    const input = document.querySelector(".searchForm-input").value;
    // get number of search results to display per page
    const resultsPage = document.getElementById("resultsPage").value;
    //remove whitespace from the input
    const searchQuery = input.trim();
    // print `searchQuery` to the console
    // console.log(searchQuery);
    // call `fetchResults` and pass it the `searchQuery`
    fetchResults(searchQuery, resultsPage);
}

function fetchResults(searchQuery, resultsPage) {
    // create the endppoint URL by interpolating the searchQuery
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=${resultsPage}&srsearch=${searchQuery}`;
   
    // make AJAX request to Wikipedia
    fetch(endpoint)
    // specifies we are expecting a JSON response
    .then(response => response.json())
    // handle the JSON data
    .then(data => {
        const results = data.query.search;
        displayResults(results);
    });
}

function displayResults(results) {
    // Store a reference to `.searchResuts`
    const searchResults = document.querySelector(".searchResults");
    // Remove all child elements
    searchResults.innerHTML = "";
    // Loop over results array
    results.forEach(result => {
        //result here represents each object in our array
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
        
        searchResults.insertAdjacentHTML("beforeend",
                `<div class="resultItem">
                <h3 class="resultItem-title">
                <a href="${url}" target="_blank" rel="noreferrer">${result.title}</a>
                </h3>
                <span class="resultItem-snippet">${result.snippet}</span><br>
                <a href="${url}" class="resultItem-link" target="_blank" rel="noreferrer">${url}</a>
                </div>`
                                         );
    });
}



// call to randomWiki fuction when clicking the random button
document.getElementById("random").onclick = randomWiki;

const form = document.querySelector(".searchForm");
form.addEventListener('submit', handleSubmit);
