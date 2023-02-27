/*
 * author: Colton Tshudy
 * version: 2/26/2023
 */

const isPrime = (number) => {
    if (number == 1)
        return false;

    if (number == 2)
        return true;

    let range = number / 2;
    for (let i = 2; i <= number / 2; i++) {
        if (number % i == 0)
            return false;
    }
    return true;
}

const getColor = (number) => {
    if (isPrime(number)) //Prime
        return "greenBox"
    if ((number - 1) % 2 == 0) //Odd
        return "blueBox"
    return "redBox" // Even
}

const Box = ({ value, onClick }) => {
    const colorClass = getColor(value)
    return (
        <label className={`generalBox ${colorClass} blackBorder`} onClick={(el) => onClick(el.target)}>
            {value}
        </label>
    )
}

export default Box;