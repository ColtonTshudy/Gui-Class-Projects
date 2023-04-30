import Header from "./header";
import MyFooter from "./footer";
import { Outlet } from "react-router-dom"

function Page() {
    return (
        <>
            <Header />
            <Outlet />
            <MyFooter />
        </>
    )
}

export default Page