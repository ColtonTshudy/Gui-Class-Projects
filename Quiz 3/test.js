const nullArr = ["val1", null, "val2", null, null, "val3", "val4"];
let newArr = nullArr.filter(val => val !== null);

console.log(newArr);