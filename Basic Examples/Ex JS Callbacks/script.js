function firstFunc() {
    console.log("one")
    return 1
}

function secFunc() {
    console.log("two")
}

function exploringSetTimeOut() {
    let timeID = setTimeout(function () {
        alert("Time out alert!")
    }, 2000)
}


/*
The call stack executes all functions.
setTimeout is part of Web API.
The Web API uses web workers (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
Web workers run functions in the background, but not in different thread!
JavaScript is a single thread language, there is no multi-threading, meaning it is not possible to run two pieces of javascript at the same time!
What web workers do is they run the code in another global context that is different from the current window.
After processing, a worker send callback and the message associated to the callback to the callback queue (message queue).
After all the functions in stack queue processed, the event handler get callbacks from the callback queue and push it to the call stack to be executed.
 */
function exploreEvent1() {

    firstFunc()

    let timeID = setTimeout(() => {
        console.log("inside callback!")
    }, 0)

    secFunc()

}

function exploreEvent2() {
    let timeId = setTimeout( () => {
        alert("Alert after time out!")
    }, 0)
    clearTimeout(timeId)
}

/*
Understanding async and await
This is an example of asynchronous function
Whenever there is await inside the function, that functions needs to be async
 */
async function nasaAPI() {
    let url = "https://api.nasa.gov/planetary/apod?date=2023-01-05&api_key=MZwupgqfb2TSs5fb582TMbtyLSfhqy5CBiJRdzGB&thumbs=True"

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(e=>console.log(e))

    let response = await fetch(url) // fetch send the request and returns a promise, we wait until the promise is resolved with the response object.
                                    // the returned response is a generic placeholder for multiple data formats, such as text, json, binary, etc.
    console.log(response)
    let data = await response.json()  // If the method returns promise then we need to wait for the result, always check the return type of the method by hovering your mouse over the function.
    console.log(data)
    return data
}


function exploringAsync() {
    // See how we can call .then on async functions!
    nasaAPI()
        .then(data => console.log(data))
        .catch(e=>console.log(e))
}
/*
Assign this to onclick event for form element to stop bubbling.
 */
function stopPropagation(element) {
    if (element.tag === "form") {
        element.event.stopPropagation()
    }
}

function handleFocus(element) {
    console.log(element)
}

/**
* Things to do after DOM elements are available
 */
function handleOnLoad() {
    
    // Example of assigning an event to element
    let p = document.createElement("p")
    p.addEventListener("click", ()=>alert("p clicked!"))
    p.className = "border"
    p.textContent = "Capturing event!"
    let div = document.getElementById("lastDiv")
    div.addEventListener("click", ()=>alert("div clicked!"), true) //true option makes the event propagation to capturing. We need to manually create such propagation.
    div.append(p)

    // Refer to event delegation pattern
    new EventDelegation(document.getElementById("ul"))
}


/**
 * Event delegation is an event handling pattern that uses bubbling.
 * Instead of applying event and callback to each sub-element we assign the event to
 * parent element and handle the sub-parent on event handlers
 * The approach of passing event, as a method is deprecated. This may cause problem because you are relying on Window.event, which is a global variable
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/event
 */

function eventDelegation(event) {
    console.log(event)
    let target = event.target; // The element we clicked.
    console.log(target.tagName)
    if (target.tagName === "LI") {
        console.log(target.id)
    }
}

/**
 * This is the same approach, but instead of calling global window.event variable, we create our own class that holds its own event.
 * This is the recommended approach.
 */
class EventDelegation {
    constructor(element) {
        this._elem = element
        console.log(element)
        element.onclick = this.onClick.bind(this)
    }

    onClick(event) {
        console.log(this._elem)
        console.log(event)
        let target = event.target; // The element we clicked.
        console.log(target.tagName)
        if (target.tagName === "LI") {
            console.log(target.id)
        }
    }
}





