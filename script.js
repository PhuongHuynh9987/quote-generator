const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}

//hide loading
function complete() {
    if(loader.hidden === false) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from API
async function getQuote() {
    loading();
    //we need to use a proxy URL to make our API call in order to.....
    const proxyUrl = 'https://protected-lowlands-39978.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiURL);
        const data = await response.json();
        
        if(data.authorText === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.authorText;
        }
        
        // reduce font size for long quote
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText; 
        //stop loader, show quote
        complete();
    }
    catch(error) {
        getQuote();
        console.log('no more');
    }

}

//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);


// On load
getQuote(); // you want your function to be delaired before you call it
