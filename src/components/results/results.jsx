import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import Result from "../result/result";

export default function Results() {
    const [data, setData] = useState({ ads: null, loading: true, error: null });

    const CACHE_KEY = 'ads_cache';
    const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutes

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
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    useEffect(() => {
        const cachedAds = getCachedAds();
        if (cachedAds) {
            console.log('Using ad_cache');
            setData({ ads: cachedAds, loading: false, error: null });
            return;
        }

        async function getAdList() {
            console.log('Not Using ad_cache');
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

        getAdList();
    }, []);

    if (data.loading) {
        return (
            <section className="container mx-auto bg-white mt-1 p-5 rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (data.error) {
        return (
            <section className="container mx-auto bg-white mt-1 p-5 rounded-lg shadow-sm">
                <p>Error loading data: {data.error}</p>
            </section>
        );
    }

    return (
        <section className="container mx-auto bg-white mt-1 p-5 rounded-lg shadow-sm">
            {data.ads && data.ads.map(ad => (
                <Result key={ad.uuid} data={ad} />
            ))}
        </section>
    );
}
