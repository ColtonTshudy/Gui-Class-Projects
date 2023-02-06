
## installing chalk package

```shell
npm install chalk
```

After installing, you can see a new folder called node_module is created inside your project, which contains chalk folder.

Chalk 5> is ES module (ESM). It is standard format to deliver package to JavaScript.
To use module in JavaScript we can use [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) and export statements.
In HTML file to include module, the script tag must have type="module".

If we run the following code in node.js:

```node
import chalk from "chalk"; // After installing chalk, we importing it. chalk is ES module, which means the only way to include it into our script is to use import syntax.


console.log(chalk.blue.bgYellow.italic("Chalk provides us to stylize the terminal"))
console.log(chalk.red.bgBlack.bold("We can use this to log errors in terminal!"))
```

We get the following error:

```sh
SyntaxError: Cannot use import statement outside a module
```

By default, packages in node.js are of type commonjs. 
It is the original way to include packages.

If we open package.json file and change the type to module

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "type": "module",  ## WE DEFINING THE TYPE OF OUR PROJECT IS MODULE INSTEAD OF COMMONJS
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chalk": "^5.2.0"
  }
}
```

and then run our code, we will see we stylized the terminal.

Let's remove this version.

```shell
npm uninstall chalk
```

And change our package to commonjs

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Let's install chalk version 4

```sh
npm install chalk@4
```

Now the package is commonjs, and we can import it inside node.js by calling the require method.

```node
const chalk = require("chalk")

console.log(chalk.blue.bgYellow.italic("Chalk provides us to stylize the terminal"))
console.log(chalk.red.bgBlack.bold("We can use this to log errors in terminal!"))
```

This is the main differences between import and require.

import can be used for ESM packages and require can be used for commonjs packages.

## NOTE:

It is important to mention, this is the vanilla behavior of node.js.

We are excluding [TypeScript](https://www.typescriptlang.org/), JSX or other modern JavaScript language development.
When using React, we are going to see we can use both import and require in the same file.
React framework follows JSX syntax, which is a mixture of both HTML and JavaScript.
This is the job of transpiler such as [babel](https://babeljs.io/) to compile each line of the code and generate browser-compatible version.







