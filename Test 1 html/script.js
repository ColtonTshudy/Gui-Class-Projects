/*
 * author: Colton Tshudy
 * version: 2/24/2023
 */

console.log("1")

console.log("2")

setTimeout(()=>{
    console.log("3")
}, 0)

console.log("4")

setTimeout(()=>{
    console.log("5")
}, 0)

new Promise((res, rej) =>{
    console.log("6")
    res("7")
}).then((data)=>{console.log(data)})

console.log("8")