import React from "react";

export default function (prop) {
    let value = "myValue"
    return (
        <button onClick={(event) => prop.myCallback(event, value)}>Click me!</button>
    )
}