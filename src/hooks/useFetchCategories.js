import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'categories_cache';
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

const useFetchCategories = () => {
    const [data, setData] = useState({ categories: null, loading: true, error: null });

    const getCachedCategories = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        const { categories, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;

        return isExpired ? null : categories;
    };

    const setCachedCategories = (categories) => {
        const cacheData = {
            categories,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    useEffect(() => {
        const cachedCategories = getCachedCategories();
        if (cachedCategories) {
            // console.log('Categories: Loading from cache');
            setData({ categories: cachedCategories, loading: false, error: null });
            return;
        }

        const fetchCategories = async () => {
            // console.log('Categories: Loading from live');
            try {
                let { data, error } = await supabase
                    .from('ad_categories')
                    .select('*, ad_sub_categories(*)');

                if (error) {
                    throw error;
                }
                setCachedCategories(data);
                setData({ categories: data, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ categories: null, loading: false, error: error.message });
            }
        };

        fetchCategories();
    }, []);

    return data;
};

export default useFetchCategories;
