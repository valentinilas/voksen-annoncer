import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const useFetchSingleAd = (uuid) => {
    const [data, setData] = useState({ ad: null, loading: true, error: null });

    useEffect(() => {

        async function fetchAd() {
            try {
                const { data: ad, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(username), ad_images(uuid, image_url)')
                    .eq('uuid', uuid)
                    .maybeSingle();

                if (error) {
                    throw error;
                }

                setData({ ad, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ ad: null, loading: false, error: error.message });
            }
        }

        fetchAd();
    }, [uuid]);

    return data;
};

export default useFetchSingleAd;
