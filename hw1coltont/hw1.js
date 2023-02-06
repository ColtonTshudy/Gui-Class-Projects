/*
 * author: Colton Tshudy
 * version: 2/1/2023
 */

async function fetchAPOTD() {
    // Clear
    clearAllElements()

    // Query parameters
    const date = document.getElementById("date").value;
    const api_key = "YBDNvXjmyd1CmQqfmTj7uY29wVAuSJfSAIc0k1Fp"
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`

    // Fetch response
    const response = await fetch(apiUrl);
    const data = await response.json();

    setElements(data)
}

function setElements(data) {
    // Get the image element and set its source to the image data from the API
    const image = document.getElementById("apotd-image");
    image.src = data.hdurl;
    console.log(data.hdurl);

    // Set title
    const title = document.getElementById("apotd-title");
    title.innerHTML = data.title;
    console.log(data.title);

    // Set caption
    const caption = document.getElementById("apotd-caption");
    caption.innerHTML = data.explanation;
    console.log(data.explanation);

    // Set copyright
    const copyright = document.getElementById("apotd-copyright");
    copyright.innerHTML = "Copyright: "+data.copyright;
    console.log(data.copyright);

    // Set date
    const picture_date = document.getElementById("apotd-date");
    picture_date.innerHTML = "Date: "+data.date;
    console.log(data.date);
}

function clearAllElements() {
    const image = document.getElementById("apotd-image");
    const title = document.getElementById("apotd-title");
    const caption = document.getElementById("apotd-caption");
    const copyright = document.getElementById("apotd-copyright");
    const picture_date = document.getElementById("apotd-date");

    image.src = "";
    title.innerHTML = "";
    caption.innerHTML = "";
    copyright.innerHTML = "";
    picture_date.innerHTML = "";
}