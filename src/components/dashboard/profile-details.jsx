import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import { calculateAge } from "../../util/calculate-age";
import { UserIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

import useFetchRegions from "../../hooks/useFetchRegions";
import useFetchGenders from "../../hooks/useFetchGenders";

import ProfileFieldInput from "./profile-field-input";
import ProfileFieldSelect from "./profile-field-select";

export default function ProfileDetail() {
    const { profileData, setProfileData } = useAuth();

    // Data
    const { profile, loading: profileLoading, error: profileError } = profileData;
    const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions();
    const { genders, loading: gendersLoading, error: gendersError } = useFetchGenders();

    // Form State
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (profile) {
            setFormData({
                // keys must be database field names
                username: profile.username,
                region_id: profile.region_id,
                bio: profile.bio,
                gender_id: profile.gender_id,
                contact_email: profile.contact_email,
                contact_phone: profile.contact_phone,
                contact_sms: profile.contact_sms,
                avatar_url: profile.avatar_url,
                birthday: profile.birthday
            });
        }
    }, [profile]);

    if (profileLoading) {
        return <p>Loading profile...</p>;
    }

    if (profileError) {
        return <p>Error loading profile: {profileError}</p>;
    }

    if (!profile) {
        return <p>No profile available.</p>;
    }

    // Handle Profile Update
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(formData)
                .eq('id', profile.id)
                .select()

            if (error) {
                throw error;
            }

            setEditing(false);
   
            setProfileData((previousData) => ({
                profile: { ...previousData.profile, ...formData },
                loading: false,
                error: null
            }));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // const age = profile.birthday ? calculateAge(new Date(profile.birthday).getFullYear()) : '';
    const getMaxDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split('T')[0]; // Get the date 18 years ago in YYYY-MM-DD format
    };
    return (
        <div className="h-full bg-stone-100 p-6 rounded-lg">
            <div className="text-center mb-5">
                {profile.avatar_url ? (
                    <img
                        className="rounded-full border-4 border-cherry-600 size-32 mx-auto mb-2"
                        src={profile.avatar_url}
                        alt={`Avatar ${formData.username}`}
                    />
                ) : (
                    <div className="size-32 bg-cherry-100 flex items-center justify-center rounded-full mx-auto mb-6">
                        <UserIcon className="size-16 text-cherry-200" />
                    </div>
                )}



            </div>

            <div className="flex gap-2 justify-center my-6">
                {editing ? (
                    <>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button variant="primary" onClick={() => setEditing(true)}>Edit profile</Button>
                        <Button variant="tertiary">Delete account</Button>
                    </>
                )}
            </div>
            <ProfileFieldInput
                name="username"
                label="Username"
                onChange={handleChange}
                value={formData.username}
                editing={editing}
                placeholder="-"
            />

            <ProfileFieldInput
                name="birthday"
                label="Birthday"
                type="date"
                onChange={handleChange}
                value={formData.birthday}
                editing={editing}
                max={getMaxDate()}
                placeholder="-"
            />
            <ProfileFieldInput
                name="bio"
                label="Bio"
                onChange={handleChange}
                value={formData.bio}
                editing={editing}
                placeholder="-"
            />
            <ProfileFieldSelect
                name="gender_id"
                label="Gender"
                value={formData.gender_id}
                editing={editing}
                onChange={handleChange}
                options={genders}
                loading={gendersLoading}
                error={gendersError}
                labelKey="gender_name"

            />
            <ProfileFieldSelect
                name="region_id"
                label="Location"
                value={formData.region_id}
                editing={editing}
                onChange={handleChange}
                options={regions}
                loading={regionsLoading}
                error={regionsError}
                labelKey='region_name'
            />

            {/* <ProfileField label="Gender" value={formData.genders ?? '-'} editing={editing} name="genders" onChange={handleChange} /> */}

            <h4 className="text-xl mb-4 mt-6">Contact info</h4>

            <ProfileFieldInput
                name="contact_email"
                label="E-mail"
                placeholder="-"
                icon={EnvelopeIcon}
                onChange={handleChange}
                value={formData.contact_email}
                editing={editing}
            />
            <ProfileFieldInput
                name="contact_phone"
                label="Phone"
                placeholder="-"
                icon={DevicePhoneMobileIcon}
                onChange={handleChange}
                value={formData.contact_phone}
                editing={editing}
            />

            <ProfileFieldInput
                name="contact_sms"
                label="SMS"
                placeholder="-"
                icon={ChatBubbleLeftRightIcon}
                onChange={handleChange}
                value={formData.contact_sms}
                editing={editing}
            />


        </div>
    );
}
