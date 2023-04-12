import React from "react"

function MyFunction (props) {
    return (
        <h1>{props.passedProp}</h1>
    )
}

const MyFunction2 = function (props) {
    return (
        <h1>{props.passedProp}</h1>
    )
}

const MyFunction3 = (props) => {
    return (
        <>
            <h1>{props.passedProp}</h1>
            <p>This is another prop in MyFunction3 {props.anotherProp}</p>
        </>
    )
}

const MyFunction4 = ({passedProp, anotherProp}) => {
    return (
        <>
            <h1>{passedProp}</h1>
            <p>Destructing the object!</p>
            <p>Getting the extra property: {anotherProp}</p>
        </>

    )
}

export { MyFunction2 as NewName, MyFunction3, MyFunction4};
export default MyFunction;