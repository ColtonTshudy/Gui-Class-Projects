
import {NavLink} from "react-router-dom";



const activeStyle = {
    color: 'red',
    borderBottom: '1em, solid, black'
}


function Tabs({name, link}){
    let tabClass = ""

    return(
        <>
            <NavLink
                style={({isActive}) => isActive ? activeStyle : undefined}
                to={link} key={name}>
                {name}
            </NavLink>
        </>
    )
}

function Header() {
    const tabsValue = ["Home", "Projects"]
    const tabsLink = ["/", "/projects"]
    return(
        <header>
            <nav>
                {tabsValue.map((element, idx) => <Tabs name={element} link={tabsLink[idx]}/>)}
            </nav>
        </header>
    )
}



export default Header