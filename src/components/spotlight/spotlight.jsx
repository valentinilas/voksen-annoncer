import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import EmblaCarousel from '../carousel/carousel';
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Spotlight() {
    const [data, setData] = useState({ ads: null, loading: true, error: null });

    useEffect(() => {
        async function getAdList() {
            console.log("FETCHING DATA FOR SPOTLIGHT");
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('uuid, title, description, image_urls')
                    .order('created_at', { ascending: false })
                    .range(0, 12);

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

    const OPTIONS = { loop: false, align: 'start', containScroll: 'trimSnaps' };

    const SLIDES = data.ads.map((ad) => {
        const { uuid, image_urls, title, description } = ad;
        return (
            <NavLink to={`/ad/${uuid}`} className="embla__slide" key={uuid}>
                <div className="shadow-sm border rounded-md m-2 p-2">
                    <img src={image_urls[0]} className="mb-2 rounded-md w-full object-cover aspect-square" alt={title} />
                    <h5 className="font-bold">{title}</h5>
                    <p>{description}</p>
                </div>
            </NavLink>
        );
    });

    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Spotlight</h3>
                <Button variant="secondary" size="s" onClick={() => alert('Sign up!')}>Get promoted</Button>
            </div>

            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    );
}
