import { useTranslation } from "react-i18next";

export default function Footer (){
    const [t] = useTranslation();
    const year = new Date().getFullYear();
    return (
       <footer className="container mx-auto p-5 mt-10 ">
        <p className="text-center dark:text-zinc-200">{t("footer.copyright")} &copy; {year} Voksen Annoncer. {t("footer.rights")}</p>
       </footer>
    );
}