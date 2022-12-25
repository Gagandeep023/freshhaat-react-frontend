import { Outlet } from "react-router-dom"
import Nav from "../Dashboard/Nav"
import Header from '../Dashboard/Header';
import Footer from "../Dashboard/Footer";
import { DataProvider } from "../context/DataContext";

const DashboardLayout = () => {
    return (
        <main className="Dashboard">
            <Header title="FreshHaat Dashboard" />
            <DataProvider>
            <Nav />
            <Outlet />
            </DataProvider>

            <Footer />
        </main>
    )
}

export default DashboardLayout
