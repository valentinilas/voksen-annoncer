import { useTranslation } from "react-i18next";

export default function Footer (){
    const [t] = useTranslation();
    const year = new Date().getFullYear();
    return (
       <footer className="container mx-auto p-5">
        <p className="text-center dark:text-zinc-200">&copy; {year} Voksenannoncer.</p>
       </footer>
    );
}