import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cdnUrl } from '../util/cdn-url';

const CACHE_KEY = 'ads_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

const useFetchAdList = (selectedCategory, selectedSubCategory, selectedRegion, searchTerm) => {
    const [data, setData] = useState({ ads: null, loading: true, error: null });

    const getCachedAds = () => {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (!cachedData) return null;

            const { ads, timestamp } = JSON.parse(cachedData);
            const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

            return isExpired ? null : ads;
        } catch (error) {
            console.error('Error parsing cached data:', error);
            return null;
        }
    };

    const setCachedAds = (ads) => {
        const cacheData = {
            ads,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

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
                .eq('is_approved', true)

                .order('created_at', { ascending: false });

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

            setCachedAds(transformedAds);
            setData({ ads: transformedAds, loading: false, error: null });
        } catch (error) {
            console.error('Error fetching data:', error);
            setData({ ads: null, loading: false, error: error.message });
        }
    }

    useEffect(() => {
        const cachedAds = getCachedAds();
        if (cachedAds) {
            console.log('AdList: Loading from cache');
            setData({ ads: cachedAds, loading: false, error: null });
        } else {
            fetchAdList();
        }


    }, []);

    const refetchAdList = async () => {
        setData({ ads: null, loading: true, error: null });
        await fetchAdList();
    };

    return { ...data, refetchAdList };
};

export default useFetchAdList;
