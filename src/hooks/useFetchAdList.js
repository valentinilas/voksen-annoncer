import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cdnUrl } from '../util/cdn-url';

const useFetchAdList = (selectedCategory, selectedSubCategory, selectedRegion, searchTerm, page, pageSize) => {
    const [data, setData] = useState({ ads: null, loading: true, error: null, total: 0 });

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
                    
                `, { count: 'exact' })
                .eq('is_approved', true)

                .order('created_at', { ascending: false })
                .range((page - 1) * pageSize, page * pageSize - 1);;

            if (selectedCategory && selectedCategory !== 'all') {
                query = query.eq('category_id', selectedCategory);
            }
            if (selectedSubCategory && selectedSubCategory !== 'all') {
                query = query.eq('sub_category_id', selectedSubCategory);
            }
            if (selectedRegion && selectedRegion !== 'all') {
                query = query.eq('region_id', selectedRegion);
            }
            if (searchTerm && searchTerm) {
                query = query.ilike('title', `%${searchTerm}%`);
            }


            const { data: ads, error, count } = await query;

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

            setData({ ads: transformedAds, loading: false, error: null, total: count });
        } catch (error) {
            console.error('Error fetching data:', error);
            setData({ ads: null, loading: false, error: error.message, total: 0 });
        }
    }

    useEffect(() => {
        fetchAdList();
    }, [page]);

    const refetchAdList = async () => {
        await fetchAdList();
    };

    return { ...data, refetchAdList };
};

export default useFetchAdList;
