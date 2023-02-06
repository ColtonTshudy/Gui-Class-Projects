# npm

Installing chalk:

```shell
npm install chalk  # Installing latest version. Notice this is ES Module. More on this later
```

After installing, notice node_modules folder added to our project directory.

Let's remove this version and install another version

```shell
npm uninstall chalk
```

```shell
npm install chalk@4  # Installing version 4
```

We can include chalk module using require function

```node
const chalk  = require("chalk")

console.log(chalk.yellow.bgBlack.bold("Stylizing terminal!"))
```

We can install packages locally to this project or globally that can be accessible by every node.js project.

```shell
npm install -g nodemon  # g stands for globally 
```

By navigating to the main directory of node.js, inside bin folder we can see nodemon is being added.





