import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const [profileData, setProfileData] = useState({ profile: null, loading: true, error: null });



    const getProfile = async (profileId) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select(`*, regions(region_name), genders(gender_name)`)
                .eq('id', profileId)
                .single();

            if (error) throw error;

            setProfileData({ profile: profile, loading: false, error: null });
        } catch (error) {
            setProfileData({ profile: null, loading: false, error: error.message });
        }
    };



    useEffect(() => {

        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {

                setSession(session);
                getProfile(session.user.id);

            } else {
                setProfileData({ profile: null, loading: false, error: "No session available" });
            }
            setIsLoadingSession(false);
        };
        fetchSession();

        // Listen for auth changes on:
        // SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, USER_DELETED, PASSWORD_RECOVERY
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {


                getProfile(session.user.id);
            } else {
                setProfileData({ profile: null, loading: false, error: "No session available" });
            }
            setIsLoadingSession(false)
        });


        return () => subscription.unsubscribe()
    }, [])

    const auth_user_register = async (email, password, username) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        ...(username ? { username: username } : {})
                    }
                },
            });

            if (error) {
                console.error('Error signing up:', error.message);
                throw new Error(error.message);  // Throw the error
            }

        } catch (error) {
            console.error('Signing up:', error);
            throw error;  // Re-throw the error
        }

    }

    const auth_user_log_in = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error logging in:', error.message);
                throw new Error(error.message);  // Throw the error
            }

        } catch (error) {
            console.error('Unexpected error logging in:', error);
            throw error;  // Re-throw the error

        }

    }
    const auth_user_log_out = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }


        } catch (error) {
            console.error('Unexpected error logging out:', error);
        }
    }

    const auth_user_delete_account = async () => {
        if (!session) {
            throw new Error("No user is logged in.");
        }

        try {

            const userId = session.user.id;

            // Fetch the user's ad images
            const { data: adImages, error: adImagesError } = await supabase
                .from('ad_images')
                .select('image_url')
                .eq('user_id', userId); // Assuming 'user_id' is the correct field to identify ads by the user

            if (adImagesError) {
                throw new Error('Error fetching ad images: ' + adImagesError.message);
            }

            // Prepare an array of file paths to delete
            const adImagePaths = adImages.map(image => {
                const parts = image.image_url.split('/');
                return 'ad-images/' + parts.pop(); // Assuming 'ad-images/' is the correct prefix
            });

            // Delete all ad images from storage in one request
            if (adImagePaths.length > 0) {
                const { error: deleteAdImagesError } = await supabase.storage
                    .from('voksen-annoncer')
                    .remove(adImagePaths);

                if (deleteAdImagesError) {
                    throw new Error('Error deleting ad images: ' + deleteAdImagesError.message);
                }
            }


            // Fetch the user's profile to get the avatar URL
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', userId)
                .single();

            if (profileError) {
                throw new Error('Error fetching profile: ' + profileError.message);
            }

            // Delete the user's avatar image from storage
            if (profile && profile.avatar_url) {
                const parts = profile.avatar_url.split('/');
                const avatarPath = 'profile-images/' + parts.pop(); // Assuming 'ad-images/' is the correct prefix
                const { error: deleteAvatarError } = await supabase.storage
                    .from('voksen-annoncer')
                    .remove([avatarPath]);

                if (deleteAvatarError) {
                    throw new Error('Error deleting avatar: ' + deleteAvatarError.message);
                }
            }

            // Call the RPC function to delete the user
            const { error } = await supabase.rpc('delete_user');

            if (error) {
                throw error;
            }

            // If the user deletion is successful, clear the session and profile data
            setSession(null);
            setProfileData({ profile: null, loading: false, error: null });
        } catch (error) {
            console.error('Error deleting account:', error.message);
            throw new Error(error.message);
        }
    };

    const value = {
        session,
        profileData,
        setProfileData,
        isLoadingSession,
        auth_user_register,
        auth_user_log_in,
        auth_user_log_out,
        auth_user_delete_account
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}





