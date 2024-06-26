import Button from "../button/button";
import { } from "@heroicons/react/24/outline";
import { PlusIcon, UserIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/va-logo-cherry.svg';
import { NavLink } from "react-router-dom";
import { cdnUrl } from "../../util/cdn-url";
import Label from "../label/label";


import { useAuth } from "../../lib/auth-context";
import { useTranslation } from 'react-i18next';


export default function NavBar() {

    const [t] = useTranslation();

    const { profileData, session, auth_user_log_out } = useAuth();

    const { profile, loading: loadingProfile, error: errorProfile } = profileData;
    const { avatar_url, username, is_admin } = profile || {};







    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await auth_user_log_out();
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="navbar bg-base-200 rounded-box px-5 shadow-sm">
            <div className="navbar-start">
                <NavLink to="/" className="flex gap-4 items-center">
                    <img className="w-10 md:w-16	" src={logo} alt="Vokseannoncer" />
                    <span className="font-bold text-black-900 dark:text-white text-xl hidden md:block">Voksenannoncer</span>
                </NavLink>

            </div>


            {!session &&

                <div className="navbar-end ">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li><Button variant="primary" Icon={ArrowLeftEndOnRectangleIcon} to="/sign-in" className="hidden md:inline-flex">Log in</Button></li>
                        {/* <li><Button variant="primary" Icon={UserPlusIcon} to="/sign-up">Sign up</Button></li> */}
                        <li>
                            <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-circle btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>

                            </label>
                        </li>
                    </ul>
                </div>
            }
            {session &&
                <div className="navbar-end gap-4">

                    {username && <NavLink className="link link-hover text-sm font-bold hidden md:block" to="/dashboard">{username}</NavLink>}
                    <div className="dropdown dropdown-end">

                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">

                            {avatar_url ? (
                                <img
                                    className="rounded-full  w-8 h-8"
                                    src={cdnUrl(avatar_url, 300, 300)}
                                    alt={`Avatar ${username ?? username}`}
                                />
                            ) : (
                                <UserIcon className="w-8 h-8" />
                            )}
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-0 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {is_admin && <li>
                                <NavLink to="/admin"><Cog6ToothIcon className="size-5" /> {t("navigation.admin")}</NavLink>
                            </li>
                            }
                            <li>
                                <NavLink to="/new-ad"><PlusIcon className="size-5" /> {t("navigation.create-ad")}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard"><UserIcon className="size-5" /> {t("navigation.profile")}</NavLink>
                            </li>
                            <li><button onClick={handleLogOut}><ArrowLeftStartOnRectangleIcon className="size-5" /> {t("navigation.log-out")}</button></li>
                        </ul>
                    </div>
                    <ul className="menu menu-horizontal px-1 gap-2">

                        <li>
                            <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-circle btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>

                            </label>
                        </li>
                    </ul>

                </div>
            }
        </div>
    );
}

