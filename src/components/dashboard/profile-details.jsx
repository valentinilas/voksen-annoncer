import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import {
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    MapPinIcon, UserCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";

import useFetchRegions from "../../hooks/useFetchRegions";
import useFetchGenders from "../../hooks/useFetchGenders";
import ProfileFieldInput from "./profile-field-input";
import ProfileFieldSelect from "./profile-field-select";
import Avatar from "./profile-avatar";
import { useTranslation } from "react-i18next";
import translateArray from "../../util/translate-array";


export default function ProfileDetail() {

    const [t] = useTranslation();

    const { profileData, setProfileData } = useAuth();
    const { profile, loading: profileLoading, error: profileError } = profileData;
    const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions([]);
    const { genders, loading: gendersLoading, error: gendersError } = useFetchGenders([]);





    const [editing, setEditing] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const fieldsToLoad = ["username", "birthday", "bio", "gender_id", "region_id", "contact_email", "contact_phone", "contact_sms", "email_visible", "phone_visible", "sms_visible"];

    useEffect(() => {
        if (profile) {
            fieldsToLoad.forEach(key => {
                if (profile[key] !== undefined) {
                    setValue(key, profile[key]);
                }
            });
       
        }
    }, [profile, setValue]);




    const onSubmit = async (data) => {
        console.log(data);
        if (!profile) {
            console.error("Profile is not defined");
            return;
        }
        try {
            const { data: updatedData, error } = await supabase
                .from('profiles')
                .update(data)
                .eq('id', profile.id)
                .select();

            if (error) {
                throw error;
            }

            setProfileData((previousData) => ({
                profile: { ...previousData.profile, ...data },
                loading: false,
                error: null,
            }));

            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const getMaxDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split('T')[0];
    };

    if (profileLoading || regionsLoading || gendersLoading) {
        return <p>Loading profile...</p>;
    }

    if (profileError || regionsError || gendersError) {
        return <p>Error loading profile: {profileError?.message || regionsError?.message || gendersError?.message}</p>;
    }

    if (!profile) {
        return <p>No profile available.</p>;
    }





    const translatedGenders = translateArray(t,'genders', 'gender_name', genders)

      




    return (
        <div className="h-full  p-6 rounded-lg">
            <Avatar />

            <div className="flex gap-2 justify-center my-6">
                {editing ? (
                    <>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>Save</Button>
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
                editing={editing}
                icon={UserCircleIcon}
                placeholder="-"
                fieldError={errors.username}
                defaultValue={profile.username}
                {...register("username", {
                    required: "Username is required",
                    maxLength: {
                        value: 12,
                        message: "Username must be 12 characters or less"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username must contain only letters and numbers"
                    }
                })}
            />

            <ProfileFieldInput
                name="birthday"
                label="Birthday"
                icon={SparklesIcon}
                type="date"
                editing={editing}
                max={getMaxDate()}
                placeholder="-"
                defaultValue={profile.birthday}
                fieldError={errors.birthday}
                {...register("birthday")}
            />


            <ProfileFieldInput
                name="bio"
                label="Bio"
                icon={ChatBubbleBottomCenterTextIcon}
                editing={editing}
                placeholder="-"
                fieldError={errors.bio}
                defaultValue={profile.bio}
                {...register("bio", {
                    maxLength: {
                        value: 160,
                        message: "Bio must be 160 characters or less"
                    }
                })}
            />


            <ProfileFieldSelect
                name="gender_id"
                label="Gender"
                icon={UserCircleIcon}
                editing={editing}
                options={translatedGenders}
                loading={gendersLoading}
                error={gendersError}
                fieldError={errors.gender_id}
                defaultValue={profile.gender_id}
                labelKey="gender_name"
                {...register("gender_id", { required: "Gender is required" })}
            />

            <ProfileFieldSelect
                name="region_id"
                label="Location"
                icon={MapPinIcon}
                editing={editing}
                options={regions}
                loading={regionsLoading}
                error={regionsError}
                defaultValue={profile.region_id}
                fieldError={errors.region_id}
                labelKey='region_name'
                {...register("region_id", { required: "Region is required" })}
            />

            <h4 className="text-xl mb-4 mt-6 dark:text-zinc-400">Contact info</h4>

            <ProfileFieldInput
                name="contact_email"
                label="E-mail"
                placeholder="-"
                
                icon={EnvelopeIcon}
                editing={editing}
                fieldError={errors.contact_email}
                defaultValue={profile.contact_email}
                {...register("contact_email", {
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address"
                    }
                })}
            />
            <ProfileFieldInput
                name="email_visible"
                label="Email Visibility"
                type="checkbox"
                placeholder="-"
                visibility={profile.email_visible}
                icon={EnvelopeIcon}
                editing={editing}
                fieldError={errors.email_visible}
                // defaultValue={profile.email_visible}
                {...register("email_visible")}
            />

            <ProfileFieldInput
                name="contact_phone"
                label="Phone"
                placeholder="-"
             
                icon={DevicePhoneMobileIcon}
                editing={editing}
                fieldError={errors.contact_phone}
                defaultValue={profile.contact_phone}
                {...register("contact_phone", {
                    pattern: {
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                        message: "Invalid phone number"
                    }
                })}
            />
            <ProfileFieldInput
                name="phone_visible"
                label="Phone Visibility"
                type="checkbox"
                placeholder="-"
                visibility={profile.phone_visible}
                icon={DevicePhoneMobileIcon}
                editing={editing}
                fieldError={errors.phone_visible}
                // defaultValue={profile.phone_visible}
                {...register("phone_visible")}
            />

            <ProfileFieldInput
                name="contact_sms"
                label="SMS"
                placeholder="-"
               
                icon={ChatBubbleLeftRightIcon}
                editing={editing}
                fieldError={errors.contact_sms}
                defaultValue={profile.contact_sms}
                {...register("contact_sms", {
                    pattern: {
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                        message: "Invalid phone number"
                    }
                })}
            />

            <ProfileFieldInput
                name="sms_visible"
                label="SMS Visibility"
                type="checkbox"
                placeholder="-"
                visibility={profile.sms_visible}
                icon={ChatBubbleLeftRightIcon}
                editing={editing}
                fieldError={errors.sms_visible}
                // defaultValue={profile.sms_visible}
                {...register("sms_visible")}
            />



        </div>
    );
}
