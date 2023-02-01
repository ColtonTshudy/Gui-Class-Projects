
// This is how we comment in JavaScript in line
/*
and as a block
 */

let counter = 0; // We will talk more about scopes in JavaScript but see how the following function has access to this variable

function CreateElement() {
    const newDiv = document.createElement("div")  // Create a new div element
    const text = document.createTextNode(`New element ${counter}`) // Create a textNode (value we write between open and clos tags), see how we format our string in java script using backticks`` and dollar sign $
    newDiv.appendChild(text) // append text to the created node
    const elementHolder = document.getElementById("elementContainer") // Get the element that we want to place our new node
    elementHolder.appendChild(newDiv) // Append it
    counter += 1
}