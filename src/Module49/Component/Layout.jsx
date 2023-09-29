import { Outlet } from "react-router-dom";
import NavMenu from "../../Module50/Header/NavMenu";
import Home from "./Pages/Home";

const Layout = () => {
    return (
        <div className="text-center">
            <NavMenu></NavMenu>
            <Outlet></Outlet>
            <Home></Home>
        </div>
    );
};

export default Layout;