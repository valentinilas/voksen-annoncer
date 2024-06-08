import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'regions_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

const useFetchRegions = () => {
    const [data, setData] = useState({ regions: null, loading: true, error: null });

    const getCachedRegions = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        const { regions, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

        return isExpired ? null : regions;
    };
    const setCachedRegions = (regions) => {
        const cacheData = {
            regions,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    useEffect(() => {
        const cachedRegions = getCachedRegions();
        if (cachedRegions) {
            // console.log('Regions: Loading from cache');
            setData({ regions: cachedRegions, loading: false, error: null });
            return;
        }
        const fetchRegions = async () => {
            // console.log('Regions: Loading from live');
            try {
                let { data, error } = await supabase
                .from('regions')
                .select('*');

                if (error) {
                    throw error;
                }
                setCachedRegions(data);
                setData({ regions: data, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ regions: null, loading: false, error: error.message });
            }
        };

        fetchRegions();
    }, []);

    return data;
};

export default useFetchRegions;
