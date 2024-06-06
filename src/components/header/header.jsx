import MainNav from "../main-nav/main-nav";
import logo from '../../assets/va-logo-cherry.svg';

export default function Header() {
    return (
        <header className="bg-white p-5">
            <div className="container mx-auto header-elements flex justify-between items-center">
                <div className="logo">
                    <div className="flex justify-start items-center gap-4" > <img className="w-16	" src={logo} alt="Voksen Annoncer" /> <span className="font-bold text-black-900 text-xl">Voksen Annoncer</span></div>
                </div>
                <MainNav />
            </div>
        </header>
    );
}