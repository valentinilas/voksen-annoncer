import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { cdnUrl } from '../util/cdn-url';

const CACHE_KEY = 'spotlight_ads_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes in milliseconds

const useFetchSpotlightAdList = () => {
    const [data, setData] = useState({ ads: null, loading: true, error: null });

    const getCachedAds = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        const { ads, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

        return isExpired ? null : ads;
    };
    const setCachedAds = (ads) => {
        const cacheData = {
            ads,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    useEffect(() => {
        const cachedAds = getCachedAds();
        if (cachedAds) {
            console.log('AdList: Loading from cache');
            setData({ ads: cachedAds, loading: false, error: null });
            return;
        }

        async function fetchAdList() {
            console.log("FETCHING DATA FOR SPOTLIGHT");
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('uuid, title, description, ad_images (uuid, image_url, image_width, image_height)')
                    .eq('is_spotlight', true)
                    .order('created_at', { ascending: false })
                    .range(0, 12);




                if (error) {
                    throw error;
                }
                 // Transform image URLs using cdnUrl
                 const transformedAds = ads.map(ad => ({
                    ...ad,
                    ad_images: ad.ad_images.map(image => ({
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

        fetchAdList();
    }, []);

    return data;
};

export default useFetchSpotlightAdList;
