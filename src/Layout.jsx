import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header";

export default function Layout() {
    return (
        <>
            <div className="py-4 px-8 flex flex-col min-h-screen">
                <Header />
                <Outlet />
            </div>
            <Footer className="bottom-0" />
        </>
    )
}