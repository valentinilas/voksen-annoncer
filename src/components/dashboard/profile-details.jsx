import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";
import { useAuth } from "../../lib/auth-context";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../button/button";
import ProfileField from "./profile-field";

import { calculateAge } from "../../util/calculate-age";


export default function ProfileDetail() {
    const { profileData } = useAuth();
    const { profile, loading, error } = profileData;

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error loading profile: {error}</p>;
    }

    if (!profile) {
        return <p>No profile available.</p>;
    }



    const age = profile.birthday ? calculateAge(new Date(profile.birthday).getFullYear()) : '-'

    const { username, regions = '-', bio = '-', genders = '-', contact_emai = '', contact_phone = '-', contact_email = '', contact_sms = '' } = profile;

    const blockClasses = 'mb-2 bg-stone-200 p-4 rounded-2xl ';
    const labelClasses = 'font-bold mb-1 ';
    return (
        <div className="h-full bg-stone-100  p-6 rounded-lg">


            <div className="text-center mb-5 ">
                {profile.avatar_url ? <img
                    className="rounded-full border-4 border-cherry-600 size-32 mx-auto mb-2 "
                    src={profile.avatar_url} alt={`Avatar ${username}`} />
                    : <div className="size-32 bg-cherry-100 flex items-center justify-center rounded-full mx-auto mb-6">
                        <UserIcon className="size-16 text-cherry-200" />
                    </div>}
                <span className=" text-xl">{username}</span>
            </div>

            <div className="flex gap-2 justify-center my-6">
                <Button variant="primary">Edit profile</Button>
                <Button variant="tertiary">Delete account</Button>
            </div>


            <ProfileField label="Age" value={age} />
            <ProfileField label="Location" value={regions?.region_name ?? '-'} />
            <ProfileField label="Bio" value={bio ?? '-'} />
            <ProfileField label="Gender" value={genders?.gender_name ?? '-'} />

            <h4 className="text-xl mb-4 mt-6">Contact info</h4>

            <ProfileField label="Email" value={contact_email ?? '-'} icon={EnvelopeIcon} />
            <ProfileField label="Phone" value={contact_phone ?? '-'} icon={DevicePhoneMobileIcon} />
            <ProfileField label="SMS" value={contact_sms ?? '-'} icon={ChatBubbleLeftRightIcon} />


        </div>
    );
}
