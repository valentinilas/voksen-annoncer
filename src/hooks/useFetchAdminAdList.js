import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cdnUrl } from '../util/cdn-url';



const useFetchAdminAdList = () => {
    const [data, setData] = useState({ ads: null, loading: true, error: null });



    async function fetchAdList() {
        console.log('AdList: Loading live data');
        try {
            let query = supabase
                .from('ads')
                .select(`
                    *,
                    regions (region_name),
                    ad_images (uuid, image_url, image_width, image_height),
                    ad_categories (
                        category_id,
                        category_name
                    ),
                    ad_sub_categories (
                        sub_category_id,
                        sub_category_name
                    )
                   
                    profiles(username)
                    
                `)

                .order('created_at', { ascending: false });




            const { data: ads, error } = await query;

            if (error) {
                throw error;
            }
            console.log(ads);
            const transformedAds = ads.map(ad => ({
                ...ad,
                ad_images: ad.ad_images?.map(image => ({
                    ...image,
                    image_url: cdnUrl(image.image_url, 300, 300)
                }))
            }));

            setData({ ads: transformedAds, loading: false, error: null });
        } catch (error) {
            console.error('Error fetching data:', error);
            setData({ ads: null, loading: false, error: error.message });
        }
    }

    useEffect(() => {

        fetchAdList();


    }, []);



    return { ...data, setData };
};

export default useFetchAdminAdList;
