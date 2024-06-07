import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import EmblaCarousel from '../carousel/carousel';
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import useFetchSpotlightAdList from "../../hooks/useFetchSpotlightAdList";

export default function Spotlight() {
    const { ads, loading, error } = useFetchSpotlightAdList();


    if (loading) {
        return (
            <section className="container mx-auto bg-white mt-1 p-5 rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto bg-white mt-1 p-5 rounded-lg shadow-sm">
                <p>Error loading data: {error}</p>
            </section>
        );
    }

    const OPTIONS = { loop: false, align: 'start', containScroll: 'trimSnaps' };

    const SLIDES = ads.map((ad) => {
        const { uuid, image_urls, title, description } = ad;
        return (
            <NavLink to={`/ad/${uuid}`} className="embla__slide" key={uuid}>
                <div className="shadow-sm border rounded-md m-2 p-2">
                    <img src={image_urls[0]} className="mb-2 rounded-md w-full object-cover aspect-square" alt={title} />
                    <h5 className="font-bold truncate text-sm">{title}</h5>
                    <p className="truncate text-sm">{description}</p>
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
