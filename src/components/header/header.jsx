import logo from '../../assets/va-logo-cherry.svg';
import { NavLink } from "react-router-dom";
import NavBar from "../main-nav/navbar";

export default function Header() {
    return (
        <header className="p-5 ">
            <div className="container mx-auto header-elements flex justify-between items-center">

                <NavBar/>
            </div>
        </header>
    );
}