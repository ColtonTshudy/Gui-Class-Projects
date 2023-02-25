const isPrime = (number) =>{
    if (number==2)
        return true;

    let range = number/2;
    for(let i=2;i<=number/2;i++){
        if (number%2==0)
            return false;
    }
    return true;
}

const getColor = (number) =>{
    if(isPrime(number)) //Prime
        return "greenBox"
    if((number-1)%2==0) //Odd
        return "blueBox"
    if(number%2==0) //Even
        return "redBox"
}

const Box = ({ value }) =>{
    const colorClass = getColor(value)
    return(
        <label className={`generalBox ${colorClass}`}> 
            {value}
        </label>
    )
  }
  
  export default Box;