import MyButton from "./MyButton";
import {useEffect, useState} from "react";




function myCallbackInParent(event, value) {
    // This is a common way to track child element when as event occurs.
    console.log("here")
    console.log(value)
}



export default function () {

    return (
        <div>
            <MyButton myCallback={myCallbackInParent} />
            <MyButton myCallback={myCallbackInParent} />
            <MyButton myCallback={myCallbackInParent} />
        </div>
        )

}

