import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";
import { useAuth } from "../../lib/auth-context";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

import { calculateAge } from "../../util/calculate-age";


export default function ProfileDetail() {
    const { profileData} = useAuth();
    const {profile, loading, error} = profileData;

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error loading profile: {error}</p>;
    }

    if (!profile) {
        return <p>No profile available.</p>;
    }


   
    const age = calculateAge(new Date(profile.birthday).getFullYear())


    const blockClasses = 'mb-2 bg-stone-100 p-4 rounded-2xl';
    const labelClasses = 'font-bold';
    return (
        <div >

            {/* <h4 className="text-xl mb-4">Profile</h4> */}

            <div>
                {profile.avatar_url ? <img
                    className="rounded-full size-32 mx-auto mb-6"
                    src={profile.avatar_url} alt={`Avatar ${profile.username}`} />
                    : <div class="size-32 bg-cherry-100 flex items-center justify-center rounded-full mx-auto mb-6">
                        <UserIcon className="size-16 text-cherry-200" />
                    </div>}
            </div>

            <p className={blockClasses}>
                <Label type="profile"><span className={labelClasses}>Username</span></Label>
                <span>{profile.username}</span>
            </p>
            <p className={blockClasses}>
                <Label type="profile"><span className={labelClasses}>Age</span></Label>
                <span>{age}</span>
            </p>
            <p className={blockClasses}>
                <Label type="profile"><span className={labelClasses}>Location</span></Label>
                <span>{profile.regions.region_name}</span>
            </p>
            <p className={blockClasses}>
                <Label type="profile"><span className={labelClasses}>Bio</span></Label>
                <span>{profile.bio}</span>
            </p>
            <p className={blockClasses}>
                <Label type="profile"><span className={labelClasses}>Gender</span></Label>
                <span>{profile.genders && profile.genders.gender_name}</span>
            </p>
            <h4 className="text-xl mb-4">Contact info</h4>

            {profile.contact_email && <p className={blockClasses}>
                <Label type="profile" Icon={EnvelopeIcon}><span className={labelClasses}>Email</span></Label>
                <span>{profile.contact_email}</span>
            </p>}
            {profile.contact_phone && <p className={blockClasses}>
                <Label type="profile" Icon={DevicePhoneMobileIcon}><span className={labelClasses}>Phone</span></Label>
                <span>{profile.contact_phone}</span>
            </p>}
            {profile.contact_sms && <p className={blockClasses}>
                <Label type="profile" Icon={ChatBubbleLeftRightIcon}><span className={labelClasses}>SMS</span></Label>
                <span>{profile.contact_sms}</span>
            </p>}


        </div>
    );
}
