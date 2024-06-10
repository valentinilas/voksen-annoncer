import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cdnUrl } from '../util/cdn-url';
const useFetchSingleAd = (uuid) => {
    const [data, setData] = useState({ ad: null, loading: true, error: null });

    useEffect(() => {

        async function fetchAd() {
            try {
                const { data: ad, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(*, genders (gender_name), regions (region_name)), ad_images(uuid, image_url, image_width, image_height)')
                    .eq('uuid', uuid)
                    .maybeSingle();

                if (error) {
                    throw error;
                }
                // Transform image URLs using cdnUrl
                const transformedAd = {
                    ...ad,
                    ad_images: ad.ad_images.map(image => ({
                        ...image,
                        image_url: cdnUrl(image.image_url, 300, 300)
                    }))
                };


                setData({ ad: transformedAd, loading: false, error: null });
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
