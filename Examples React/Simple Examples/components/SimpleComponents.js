import ThisIsDefaultComponent from "./MyHeader"  // When defining a function as default, we can name it whatever we want
import {NewName,MyFunction3, MyFunction4} from "./MyHeader";  // But other function we need to define it exactly as they are mentioned in the component
                                                              // We can change the name, to avoid naming conflicts while exporting by defing the name 'as' something new


export default function () {
    return (
        <>
            <ThisIsDefaultComponent passedProp={"From parent component!"}/>
            <NewName passedProp={"Calling MyFunction2"} />

            <MyFunction3 passedProp={"Calling MyFunction3"}
                         anotherProp={"another property!"}
                         andAnotherOne={"We are not using this"}/>

            <MyFunction4 passedProp={"Calling MyFunction4"}
                         anotherProp={"another property!"}/>
        </>

    )
}