import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";

export default function AdDetail() {
    const [data, setData] = useState({ ad: null, loading: true, error: null });
    const { adId } = useParams();

    useEffect(() => {
        async function getAd() {
            console.log("FETCHING SINGLE AD DATA");
            try {
                const { data: ad, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(username)')
                    .eq('uuid', adId)
                    .maybeSingle();

                if (error) {
                    throw error;
                }

                setData({ ad, loading: false, error: null });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData({ ad: null, loading: false, error: error.message });
            }
        }

        getAd();
    }, [adId]); // Ensure the dependency array includes adId

    if (data.loading) {
        return (
            <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (data.error) {
        return (
            <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
                <p>Error loading data: {data.error}</p>
            </section>
        );
    }

    const { ad } = data;

    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <div>
                <div className="border-b my-6 py-6">
                    {/* Card main content */}
                    <div className="grid grid-cols-12">
                        <div className="result-text col-span-9">
                            <span className="text-stone-500"><Label>{formatDate(ad.created_at)}</Label></span>
                            <h3 className="font-bold text-xl">{ad.title}</h3>
                            <div><pre>{ad.description}</pre></div>
                        </div>
                        <div className="result-image col-span-3">
                            <img src={ad.image_urls[0]} className="mb-2 rounded-md w-full object-cover aspect-square" alt="Ad Image" />

                            {ad.image_urls.length > 1 && (
                                <div className="result-thumbs flex gap-2">
                                    {ad.image_urls.map((image_src, index) => (
                                        <img
                                            key={index}
                                            src={`${image_src}?width=100&height=100`}
                                            className="mb-2 rounded-md w-full max-w-24 object-cover aspect-square"
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Card Details */}
                    <div className="flex p-4 bg-white border border-cherry-200 justify-between rounded-md items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span>Region: {ad.region_name}</span>
                            <span>Age: 24</span>
                            <span>Service: Massage</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
