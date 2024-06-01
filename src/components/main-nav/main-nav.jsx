import Button from "../button/button";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
export default function MainNav (){
    return (
        <nav>
            <ul className="flex  items-center">
                <li><Button variant="text" href="/">Ads</Button></li>
                <li><Button variant="text" href="/">Klinikker</Button></li>
                <li><Button variant="text" href="/">Websites</Button></li>
                <li><Button variant="text" href="/">Support</Button></li>
                <li className="pl-6 ml-6 border-l border-cherry-50 flex gap-2">
                    <Button variant="tertiary" Icon={ArrowLeftEndOnRectangleIcon} onClick={()=> alert('Login')}>Login</Button>
                    <Button variant="primary" Icon={UserPlusIcon} onClick={()=> alert('Sign up')}>Sign up</Button>
                </li>

            </ul>
        </nav>
    );
}