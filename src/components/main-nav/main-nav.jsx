import Button from "../button/button";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";


import { useAuth } from "../../lib/auth-context";



export default function MainNav() {

    const { session, auth_user_log_out } = useAuth();
    const userName = session && session.user && session.user.user_metadata ? session.user.user_metadata.username : null;

    console.log(userName);
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            await auth_user_log_out();
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <nav>
            <ul className="flex items-center">
                <li><NavLink to="/"><Button variant="text">Home</Button></NavLink></li>
                <li><Button variant="text" href="/">Support</Button></li>
                <li className="pl-6 ml-6 border-l border-cherry-200 flex gap-2">
                    {!session &&
                        <>
                            <NavLink to="/sign-in"><Button variant="tertiary" Icon={ArrowLeftEndOnRectangleIcon}>Login</Button></NavLink>
                            <NavLink to="/sign-up"><Button variant="primary" Icon={UserPlusIcon} >Sign up</Button></NavLink>
                        </>
                    }
                    {session &&
                        <>
                            
                            <NavLink to="/dashboard"><Button variant="text" Icon={UserIcon}>{userName}</Button></NavLink>
                            <NavLink to="/new-ad"><Button variant="primary" Icon={PlusIcon} >Create a new ad</Button></NavLink>
                            <Button variant="secondary" Icon={ArrowLeftStartOnRectangleIcon} onClick={handleLogOut}>Log out</Button>
                        </>
                    }


                </li>

            </ul>
        </nav>
    );
}