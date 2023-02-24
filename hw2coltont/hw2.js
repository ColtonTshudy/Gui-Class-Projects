/*
 * author: Colton Tshudy
 * version: 2/9/2023
 */

// Default initialization for choosing input/output
let inputIndex = 1;
let outputIndex = 2;

// Put a focus listener on each input element
// Lets the script know which input to read/write to
window.onload = () => {
    const inputFields = Array.from(document.querySelectorAll('input[type=text]'));
    let i = 1 //index counter
    inputFields.forEach((element) => {
        createListener(element, i);
        i++;
    });
    console.log(i);
}

// Create a listener on an element to return a specified number on focus
function createListener(element, indexID) {
    element.addEventListener('focus', (ele) => {
        if (inputIndex != indexID) {
            outputIndex = inputIndex;
            inputIndex = indexID;
        }
        console.log(`in: ${inputIndex}, out: ${outputIndex}`);
    });
}

// Execute the conversion
function doConversion() {
    // Get elements from in/out indices
    const [inInput, inSelect] = getElementsByIndexID(inputIndex);
    const [outInput, outSelect] = getElementsByIndexID(outputIndex);

    // Get values from elements
    const [input, inputUnits, outputUnits] = [inInput.value, inSelect.value, outSelect.value];

    // Convert and check for validity
    const result = convert(input, inputUnits, outputUnits);

    console.log(`in: (${input}, ${inputUnits}), out: (${result}, ${outputUnits})`);

    // Show the result to the user
    outInput.value = `${result}`;
    showMessage(`${inputUnits} to ${outputUnits} converted!`)
}

// Returns the input and select elements by their indexID
function getElementsByIndexID(indexID) {
    const input = document.querySelector(`input[id$="${indexID}"]`)
    const select = document.querySelector(`select[id$="${indexID}"]`)
    return [input, select]
}

// Convert a given value, unit pair into the target unit
// Returns the value in terms of the target unit
function convert(val, units, targetUnits) {
    checkValidity(val, units)

    const kelvinVal = toKelvin(val, units, false);
    let result = 0;

    switch(targetUnits){
        case "Celsius":
            result = kelvinVal-273.15;
            break;
        case "Fahrenheit":
            result = (kelvinVal-273.15)*9/5+32;
            break;
        case "Kelvin":
            result = kelvinVal;
            break;
    }
    checkValidity(result, targetUnits, true);

    return result;
}

// Converts any value to Kelvin
function toKelvin(val, units) {
    let result = 0;
    switch (units) {
        case "Celsius":
            result = val/1+273.15;
            break;
        case "Fahrenheit":
            result = (val/1-32)*5/9+273.15;
            break;
        case "Kelvin":
            result = val;
            break;
    }
    return result;
}

// Checks the validity of the answer.
// If the answer is not valid, send a message to the user
function checkValidity(val, units, isResult) {
    let msg = "";

    if(val==="") {
        msg = "Insert number!";
    }
    else if(isNaN(val)) {
        msg = "Invalid input!";
    }
    else if(units==="Kelvin" && val<0) {
        if (isResult) {
            msg="Less than zero kelvin!";
        }
        else {
            msg = "There is no negative kelvin!";
        }
    }

    if (msg!==""){
        showMessage(msg);
        throw new Error(msg);
    }
}

// Display a message to the user
function showMessage(msg) {
    document.getElementById("message").innerHTML = msg;
}
