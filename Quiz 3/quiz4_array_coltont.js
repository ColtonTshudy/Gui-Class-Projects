const myArr = [23, 29, 37, 32, 19, 24, 18, 28, 25, 26]

// Sort
myArr.sort((a,b)=>a-b)
console.log(myArr);

// Min and max
let minVal = myArr[0]
let maxVal = myArr[myArr.length - 1]
console.log(`Min value is ${minVal} and max value is ${maxVal}`);

// Average
let sum = 0;
for (let num of myArr) {
    sum += num;
}
let averageVal = sum/myArr.length;
console.log(`Average value is ${averageVal}`);

// Compare
minDif = Math.abs(minVal-averageVal);
maxDif = Math.abs(maxVal-averageVal);
let equality = false;
if (minDif==maxDif) {
    equality = true;
}
console.log(`Are min and max the same distance from avg?: ${equality}`)

// Remove last 4 elements
slicedArr = myArr.slice(0, myArr.length-4);
console.log(slicedArr);