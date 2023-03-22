/*
 * author: Colton Tshudy
 * version: 3/22/2023
 */

async function render() {
    const response = await fetch("./data.json");
    const data = await response.json().then(console.log("data recieved"));
    
    plotScatter(data)
    plotPie(data)
    plotHistogram(data)
}

function plotScatter(data) {

}

function plotPie(data) {

}

function plotHistogram(data) {

}
