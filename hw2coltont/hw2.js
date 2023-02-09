/*
 * author: Colton Tshudy
 * version: 2/9/2023
 */

let inputIndex = 0;
let outputIndex = 1;

window.onload = () => {
    const inputFields = Array.from(document.querySelectorAll('input[type=text]'));

    console.log(inputFields);
    inputFields.forEach((element) => {
        console.log("added element to list");
        let i = 0;
        element.addEventListener('keyup', function () {
            if (inputIndex != i) {
                outputIndex = inputIndex;
                inputIndex = i;
            }
            console.log(`input is on index ${inputIndex}`);
            console.log(`output is on index ${outputIndex}`);
        });
        i++;
    });
}

function convert() {
}