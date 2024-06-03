import MainNav from "../main-nav/main-nav";

export default function Header() {
    return (
        <header className="bg-cherry-100 p-5">
            <div className="container mx-auto header-elements flex justify-between items-center">
                <div className="logo">
                    <span className="font-bold text-cherry-900 text-2xl">VA</span>
                </div>
                <MainNav />
            </div>
        </header>
    );
}