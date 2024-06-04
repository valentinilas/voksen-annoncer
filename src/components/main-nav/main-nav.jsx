import Button from "../button/button";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


import { useAuth } from "../../lib/auth-context";



export default function MainNav() {

    const { session, auth_user_log_out } = useAuth();
    const userName = session && session.user && session.user.user_metadata ? session.user.user_metadata.username : null;

    console.log(userName);
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
        <nav>
            <ul className="flex items-center">
                <li><Button variant="text" to="/">Home</Button></li>
                <li><Button variant="text" href="/">Support</Button></li>
                <li className="pl-6 ml-6 border-l border-cherry-200 flex gap-2">
                    {!session &&
                        <>
                            <Button variant="tertiary" Icon={ArrowLeftEndOnRectangleIcon} to="/sign-in">Login</Button>
                            <Button variant="primary" Icon={UserPlusIcon} to="/sign-up">Sign up</Button>
                        </>
                    }
                    {session &&
                        <>

                            <Button variant="text" Icon={UserIcon} to="/dashboard">{userName}</Button>
                            <Button variant="primary" Icon={PlusIcon} to="/new-ad">Create a new ad</Button>
                            <Button variant="secondary" Icon={ArrowLeftStartOnRectangleIcon} onClick={handleLogOut}>Log out</Button>
                        </>
                    }


                </li>

            </ul>
        </nav>
    );
}