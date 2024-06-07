import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'genders_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

const useFetchGenders = () => {
    const [data, setData] = useState({ genders: null, loading: true, error: null });

    const getCachedGenders = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        const { genders, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

        return isExpired ? null : genders;
    };
    const setCachedGenders = (genders) => {
        const cacheData = {
            genders,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    useEffect(() => {
        const cachedGenders = getCachedGenders();
        if (cachedGenders) {
            console.log('Genders: Loading from cache');
            setData({ genders: cachedGenders, loading: false, error: null });
            return;
        }
        const fetchGenders = async () => {
            console.log('Genders: Loading from live');
            try {
                let { data, error } = await supabase
                .from('genders')
                .select('*');

                if (error) {
                    throw error;
                }
                setCachedGenders(data);
                setData({ genders: data, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ genders: null, loading: false, error: error.message });
            }
        };

        fetchGenders();
    }, []);

    return data;
};

export default useFetchGenders;
