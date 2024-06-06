import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';

const useFetchAuthUserAdList = () => {
    const [data, setData] = useState({ ads: null, loading: true, error: null });
    const { profileData } = useAuth();
    const { profile, loading: profileLoading, error: profileError } = profileData;


    useEffect(() => {

        if (profileLoading) {
            return;
        }


        const profileId = profile?.id;
        if (!profileId) {
            setData({ ads: null, loading: false, error: 'No session available' });
            return;
        }

        const fetchUserAds = async () => {
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('user_id', profileId)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                setData({ ads, loading: false, error: null });
            } catch (error) {
                setData({ ads: null, loading: false, error: error.message });
            }
        };

        fetchUserAds();
    }, [profileLoading]);

    return { data, setData };
};

export default useFetchAuthUserAdList;
