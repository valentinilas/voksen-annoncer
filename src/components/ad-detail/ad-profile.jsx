import Label from "../label/label";
import { UserIcon } from "@heroicons/react/24/outline";
import { calculateAge } from "../../util/calculate-age";
import { cdnUrl } from "../../util/cdn-url";

import { ChatBubbleLeftRightIcon, EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../lib/auth-context";


export default function AdProfile({ profileData }) {

    const { session } = useAuth();

    const { avatar_url, username, bio, birthday, regions, genders, contact_email, contact_phone, contact_sms } = profileData;
    const age = birthday ? calculateAge(new Date(birthday).getFullYear()) : '-';

    return (
        <>

            {avatar_url && (
                <div className="text-center mb-6">
                    <img
                        className="rounded-full border-4 border-neutral-content size-32 mx-auto mb-2"
                        src={cdnUrl(avatar_url, 300, 300)}
                        alt={`Avatar ${username}`}
                    />
                    <Label type="profile" className="justify-center" Icon={UserIcon}>
                        <span className="font-bold text-lg mb-1">{username}</span>
                    </Label>
                </div>

            )}


            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={ChatBubbleBottomCenterTextIcon}>
                    <span className="font-bold mb-1">Description</span>
                </Label>
                <span className="">{bio}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={SparklesIcon}>
                    <span className="font-bold mb-1">Age</span>
                </Label>
                <span className="">{age}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={UserCircleIcon}>
                    <span className="font-bold mb-1">Gender</span>
                </Label>
                <span className="">{genders?.gender_name}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={MapPinIcon}>
                    <span className="font-bold mb-1">Location</span>
                </Label>
                <span className="">{regions?.region_name}</span>
            </p>
            <h4 className="text-xl mb-4 mt-6 ">Contact info</h4>

            {session ? ( // Check if the user is logged in
                <>

                    <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={EnvelopeIcon}>
                            <span className="font-bold mb-1">E-mail</span>
                        </Label>
                        <span className="">{contact_email}</span>
                    </p>
                    <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={DevicePhoneMobileIcon}>
                            <span className="font-bold mb-1">Phone</span>
                        </Label>
                        <span className="">{contact_phone}</span>
                    </p>
                    <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={ChatBubbleLeftRightIcon}>
                            <span className="font-bold mb-1">SMS</span>
                        </Label>
                        <span className="">{contact_sms}</span>
                    </p>
                </>) : (
                <p className="text-stone-600 text-md">You must be logged in to see the contact information.</p>
            )}

        </>
    )
}

// {




//     "contact_email": "test@gmail.com",
//     "contact_phone": "+45 23 82 12 92",
//     "contact_sms": "+40 727 321",
//     "profile_visibility": null,

// }