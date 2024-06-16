import MainNav from "../main-nav/main-nav";
import logo from '../../assets/va-logo-cherry.svg';
import { NavLink } from "react-router-dom";
import NavBar from "../main-nav/navbar";

export default function Header() {
    return (
        <header className="p-5 ">
            <div className="container mx-auto header-elements flex justify-between items-center">
                {/* <div className="logo">
                <NavLink to="/">
                    <div className="flex justify-start items-center gap-4" > 
                        
                        <img className="w-16	" src={logo} alt="Voksen Annoncer" /> <span className="font-bold text-black-900 dark:text-white text-xl">Voksen Annoncer</span>
                       
                        </div> </NavLink>
                </div> */}
                {/* <MainNav /> */}
                <NavBar/>
            </div>
        </header>
    );
}