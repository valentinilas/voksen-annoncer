import Button from "../button/button";
import { useTranslation } from "react-i18next";
export default function SignUpWelcome() {
    const [t] = useTranslation();

    return (
        <div className="container mx-auto bg-base-200  p-5 rounded-box  sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-4 text-center">{t("welcome.headline")}</h2>
                <p className="mb-10">{t("welcome.body")}</p>
                <Button variant="primary" className="" to="/">{t("welcome.homepage")}</Button>
            </div>
        </div>
    );
};


