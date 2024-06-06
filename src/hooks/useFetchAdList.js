import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'ads_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

const useFetchAdList = () => {
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
            console.log('AdList: Loading live data');
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(username)')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }
                setCachedAds(ads);
                setData({ ads, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ ads: null, loading: false, error: error.message });
            }
        }

        fetchAdList();
    }, []);

    return data;
};

export default useFetchAdList;
