import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';
import { cdnUrl } from '../util/cdn-url';

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
                    .select('*, ad_images (uuid, image_url, image_width, image_height)')
                    .eq('user_id', profileId)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                 // Transform image URLs using cdnUrl
                 const transformedAds = ads.map(ad => ({
                    ...ad,
                    ad_images: ad.ad_images.map(image => ({
                        ...image,
                        image_url: cdnUrl(image.image_url, 300, 300) 
                    }))
                }));

                setData({ ads: transformedAds, loading: false, error: null });
            } catch (error) {
                setData({ ads: null, loading: false, error: error.message });
            }
        };

        fetchUserAds();
    }, [profile, setData]);

    return { data, setData };
};

export default useFetchAuthUserAdList;
