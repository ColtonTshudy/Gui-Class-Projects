let data = require("./database")  // Example of exporting and importing in node.js
const chalk = require("chalk")    // Installing chalk version 4, provides commonjs
const path = require("path")      // useful node package to work with path
require("dotenv").config()        // read .env file, parse the value and add key and value as environment variables

console.log(data)
console.log(__dirname)             // Get the directory of the current module
console.log(process.env.API_KEY)   // process provides access to operating system


console.log(chalk.blue.bgYellow.italic("Chalk provides us to stylize the terminal"))
console.log(chalk.red.bgBlack.bold("We can use this to log errors in terminal!"))
console.log(chalk.yellow.bgBlack.bold("Stylizing terminal!"))


