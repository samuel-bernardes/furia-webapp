import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
function Layout() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col">
             <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;