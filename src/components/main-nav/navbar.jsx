import Button from "../button/button";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/va-logo-cherry.svg';
import { NavLink } from "react-router-dom";
import { cdnUrl } from "../../util/cdn-url";
import Label from "../label/label";


import { useAuth } from "../../lib/auth-context";

import ThemeToggle from "./theme-toggle";

export default function NavBar() {


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
                    <img className="w-10 md:w-16	" src={logo} alt="Voksen Annoncer" />
                    <span className="font-bold text-black-900 dark:text-white text-xl hidden md:block">Voksen Annoncer</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>  <NavLink to="/">Annoncer</NavLink></li>
                    <li>  <NavLink to="/about">About</NavLink></li>
                    <li>  <NavLink to="/support">Support</NavLink></li>
                </ul>
            </div>

            {!session &&

                <div className="navbar-end ">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li> <ThemeToggle /></li>
                        <li>  <Button variant="tertiary" Icon={ArrowLeftEndOnRectangleIcon} to="/sign-in">Login</Button></li>
                        <li>  <Button variant="primary" Icon={UserPlusIcon} to="/sign-up">Sign up</Button></li>
                    </ul>
                </div>
            }
            {session &&
                <div className="navbar-end gap-4">

                    <ThemeToggle />
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
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {is_admin && <li>
                                <NavLink to="/admin">Admin</NavLink>
                            </li>
                            }
                            <li>
                                <NavLink to="/new-ad">New Ad</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>


                            <li><button onClick={handleLogOut}>Log out</button></li>
                        </ul>
                    </div>

                </div>
            }
        </div>
    );
}

