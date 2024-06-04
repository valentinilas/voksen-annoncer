import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import Result from "../result/result";

export default function Results() {
    const [data, setData] = useState({ ads: null, loading: true, error: null });

    useEffect(() => {
        async function getAdList() {
            console.log("FETCHING DATA");
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(username)')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

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
