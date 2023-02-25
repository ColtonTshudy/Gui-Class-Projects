const UserInput = ( {callbackFunc} ) =>{

    return(
        <label> 
            Input number of boxes to generate:
            <input type="number" name="boxes" placeholder="# Boxes" onChange={el=>callbackFunc(el.target.value)}/>
        </label>
    )
  }
  
  export default UserInput;