import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { NavLink } from "react-router-dom";
import { PlusIcon, UserIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../lib/auth-context";

import i18n from "../translations/i18n";

import flag_dk from '../assets/flags/denmark.svg';
import flag_gb from '../assets/flags/great-britain.svg';


import { useTranslation } from "react-i18next";

export default function RootLayout() {
    const [t] = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
    };

    const { profileData, session, auth_user_log_out } = useAuth();

    const { profile, loading: loadingProfile, error: errorProfile } = profileData;
    const { avatar_url, username, is_admin } = profile || {};

    const handleLogOut = async () => {
        try {
            await auth_user_log_out();
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return <>
        <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li className="w-full p-4 border-b border-b-base-300 font-bold mb-4">{t("navigation.menu")}</li>
                    {/* Logged in */}
                    {session &&
                        <>
                            {is_admin && <li><NavLink to="/admin"> <Cog6ToothIcon className="size-5" />{t("navigation.admin")}</NavLink></li>}
                            <li><NavLink to="/dashboard"><UserIcon className="size-5" />{t("navigation.profile")}</NavLink></li>
                            <li><NavLink to="/new-ad"><PlusIcon className="size-5" />{t("navigation.create-ad")}</NavLink></li>
                            <li><button onClick={handleLogOut}><ArrowLeftStartOnRectangleIcon className="size-5" />{t("navigation.log-out")}</button></li>
                            <li className="border-b border-b-base-300 my-4"> </li>

                        </>
                    }
                    {/* Generic */}
                    <li>  <NavLink to="/">{t("navigation.ads")}</NavLink></li>
                    <li>  <NavLink to="/support">{t("navigation.support")}</NavLink></li>
                    <li>  <NavLink to="/about">{t("navigation.about")}</NavLink></li>
                    <li>  <NavLink to="/cookie-policy">{t("navigation.cookie-policy")}</NavLink></li>
                    <li className="border-b border-b-base-300 my-4"> </li>
                    <li>   <button onClick={() => changeLanguage("en")} className={currentLanguage === "en" ? "active" : ""}><img className="size-5" src={flag_gb} alt="English" /> English</button></li>
                    <li>   <button onClick={() => changeLanguage("da")} className={currentLanguage === "da" ? "active" : ""}><img className="size-5" src={flag_dk} alt="English" />Dansk</button></li>


                    {/* not logged in */}
                    {!session &&
                        <>
                            <li className="border-b border-b-base-300 my-4"> </li>
                            <li>  <NavLink to="/sign-in">{t("navigation.log-in")}</NavLink></li>
                            <li>  <NavLink to="/sign-up">{t("navigation.sign-up")}</NavLink></li>
                        </>
                    }
                    <li className="border-b border-b-base-300 my-4"> </li>
                    {/* <li className="w-full p-4 ">Theme</li> */}
                    <li>
                        <label className="flex cursor-pointer gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <input type="checkbox" value="dark" className="toggle theme-controller" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label></li>






                </ul>


            </div>
        </div>

    </>
}