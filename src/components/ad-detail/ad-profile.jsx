import Label from "../label/label";
import { UserIcon } from "@heroicons/react/24/outline";
import { calculateAge } from "../../util/calculate-age";
import { cdnUrl } from "../../util/cdn-url";

import { ChatBubbleLeftRightIcon, EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../lib/auth-context";
import { useTranslation } from "react-i18next";

export default function AdProfile({ profileData }) {
    const [t] = useTranslation();
    const { session } = useAuth();

    const { avatar_url, username, bio, birthday, regions, genders, contact_email, contact_phone, contact_sms, email_visible, phone_visible, sms_visible } = profileData;
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
                    <span className="font-bold mb-1">{t("profile.bio")}</span>
                </Label>
                <span className="">{bio}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={SparklesIcon}>
                    <span className="font-bold mb-1">{t("profile.age")}</span>
                </Label>
                <span className="">{age}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={UserCircleIcon}>
                    <span className="font-bold mb-1">{t("profile.gender")}</span>
                </Label>
                <span className="">{genders?.gender_name}</span>
            </p>
            <p className="mb-2 bg-base-200 p-4 rounded-box">
                <Label type="profile" Icon={MapPinIcon}>
                    <span className="font-bold mb-1">{t("profile.location")}</span>
                </Label>
                <span className="">{regions?.region_name}</span>
            </p>
            <h4 className="text-xl mb-4 mt-6 ">{t("profile.contact")}</h4>

            {session ? ( // Check if the user is logged in
                <>

                    {email_visible ? <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={EnvelopeIcon}>
                            <span className="font-bold mb-1">E-mail</span>
                        </Label>
                        <span className="">{contact_email}</span>
                    </p> : <p className="mb-2 bg-base-200 p-4 rounded-box">{t("profile.user-hidden-email")}</p>}

                    {phone_visible ? <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={DevicePhoneMobileIcon}>
                            <span className="font-bold mb-1">{t("profile.phone")}</span>
                        </Label>
                        <span className="">{contact_phone}</span>
                    </p> : <p className="mb-2 bg-base-200 p-4 rounded-box">{t("profile.user-hidden-phone")}</p>}

                    {sms_visible ? <p className="mb-2 bg-base-200 p-4 rounded-box">
                        <Label type="profile" Icon={ChatBubbleLeftRightIcon}>
                            <span className="font-bold mb-1">{t("profile.sms")}</span>
                        </Label>
                        <span className="">{contact_sms}</span>
                    </p> : <p className="mb-2 bg-base-200 p-4 rounded-box">{t("profile.user-hidden-sms")}</p>}
                </>) : (
                <p className="text-stone-600 text-md">{t("profile.log-in-contact")}</p>
            )}

        </>
    )
}

