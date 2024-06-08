import { supabase } from "../../lib/supabase";
import { useState, useRef, useCallback } from "react";

import { useAuth } from "../../lib/auth-context";

export default function Avatar() {
    const fileInputRef = useRef(null);
    const { profileData, setProfileData } = useAuth();
    const [formData, setFormData] = useState({});


    // Data
    const { profile, loading: profileLoading, error: profileError } = profileData;


    // Handle Avatar Change
    const handleSave = useCallback(async (updatedFormData) => {

        console.log('HANDLE SAVE');
        if (!profile) {
            console.error("Profile is not defined");
            return;
        }
        try {
            console.log('UPDATE PROFILE');
            const { data, error } = await supabase
                .from('profiles')
                .update(updatedFormData) // Use the latest formData state
                .eq('id', profile.id)
                .select();

            if (error) {
                throw error;
            }

            console.log('SET PROFILE DATA');
            await setProfileData((previousData) => {
                return {
                    profile: { ...previousData.profile, ...formData }, // Also use the latest formData state
                    loading: false,
                    error: null
                }
            });


        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }, [formData ,profile, setProfileData]);

    const handleImageUpload = useCallback(async (file) => {
        console.log('HANDLE IMAGE UPLOAD');
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `profile-images/${fileName}`;

        let { error } = await supabase.storage
            .from('voksen-annoncer')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        return filePath;
    });

    const getPublicUrl = useCallback(async (filePath) => {
        console.log('HANDLE GET PUBLIC URL');

        const { data, error } = await supabase.storage.from('voksen-annoncer').getPublicUrl(filePath);
        if (error) {
            console.error('Error getting public URL:', error);
            return null;
        }
        return data.publicUrl;
    });

    const handleProfileImageClick = () => {
        console.log('HANDLE PROFILE IMAGE CLICK');
        fileInputRef.current.click();
    };

    const handleFileChange = useCallback(async (event) => {
        console.log('HANDLE FILE CHANGE');
        const file = event.target.files[0];

        if (file) {
            const filePath = await handleImageUpload(file);
            if (filePath) {
                const publicUrl = await getPublicUrl(filePath);
                if (publicUrl) {
                    const updatedFormData = { avatar_url: publicUrl };
                    setFormData(updatedFormData);
                    await handleSave(updatedFormData);
                }
            }
        }
    }, [handleImageUpload, getPublicUrl, handleSave]);



    return (<div className="text-center mb-5">
        {profile.avatar_url ? (
            <img
                onClick={handleProfileImageClick}
                className="rounded-full border-4 border-cherry-600 size-32 mx-auto mb-2"
                src={profile.avatar_url}
                // alt={`Avatar ${formData.username}`}
            />
        ) : (
            <div className="size-32 bg-cherry-100 border-4 border-white hover:bg-cherry-300 cursor-pointer transition-colors flex items-center justify-center rounded-full mx-auto mb-6"
                onClick={handleProfileImageClick}
            >
                <UserIcon className="size-16 text-cherry-200" />
            </div>
        )}

        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
        />

    </div>);
}