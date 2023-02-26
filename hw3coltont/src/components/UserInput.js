/*
 * author: Colton Tshudy
 * version: 2/24/2023
 */

const UserInput = ({ onInput }) => {

    const checkAndUpdate = (event) => {
        if (!isNaN(event.target.value))
            onInput(event.target.value)
        else
            onInput(0)
    }

    return (
        <label>
            Input number of boxes to generate:
            <input type="text" name="boxes" placeholder="# Boxes" onChange={checkAndUpdate} />
        </label>
    )
}

export default UserInput;