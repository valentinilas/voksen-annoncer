import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import EmblaCarousel from '../carousel/carousel';
import { NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cdnUrl } from "../../util/cdn-url";

import useFetchSpotlightAdList from "../../hooks/useFetchSpotlightAdList";
import DefaultImage from "../default-image/default-image";

export default function Spotlight() {
    const { ads, loading, error } = useFetchSpotlightAdList();


    if (loading) {
        return (
            <section className="container mx-auto bg-base-200 mt-1 p-5 rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto bg-base-200  mt-1 p-5 rounded-lg shadow-sm">
                <p>Error loading data: {error}</p>
            </section>
        );
    }

    const neededDummySlides = Math.max(0, 6 - ads.length);

    const dummySlides = Array.from({ length: neededDummySlides }).map((_, index) => (
        <div className="embla__slide" key={`dummy-${index}`}>
            {/* Example of a simple dummy slide */}
            <div className="rounded-box bg-base-100 m-2 p-2 border-solid border-transparent border-2 hover:border-secondary ">
                <DefaultImage />
                {/* <h5 className="font-bold truncate text-sm">Get promoted</h5>
                <p className="truncate text-sm">get promoted</p> */}
            </div>
        </div>
    ));

    const combinedSlides = [...ads.map(ad => (
        <NavLink to={`/ad/${ad.uuid}`} className="embla__slide" key={ad.uuid}>
            <div className="rounded-box bg-base-100 m-2 p-2 border-solid border-transparent border-2 hover:border-secondary">
                <img src={ad.ad_images[0]?.image_url} className="mb-2 rounded-md w-full object-cover aspect-square" alt={ad.title} />
                <h5 className="font-bold truncate text-sm">{ad.title}</h5>
                <p className="truncate text-sm">{ad.description}</p>
            </div>
        </NavLink>
    )), ...dummySlides];


    const OPTIONS = { loop: false, align: 'start', containScroll: 'trimSnaps' };


    // const SLIDES = ads.map((ad) => {
    //     const { uuid, ad_images, title, description } = ad;
    //     return (
    //         <NavLink to={`/ad/${uuid}`} className="embla__slide" key={uuid}>
    //             <div className="shadow-sm bg-white dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-zinc-200  rounded-md m-2 p-2 border-solid border-2 border-stone-100 hover:border-cherry-600 transition-colors">
    //                 <img src={ad_images[0]?.image_url} className="mb-2 rounded-md w-full object-cover aspect-square" alt={title} />
    //                 <h5 className="font-bold truncate text-sm">{title}</h5>
    //                 <p className="truncate text-sm">{description}</p>
    //             </div>
    //         </NavLink>
    //     );
    // });

    return (
        <section className="container mx-auto bg-base-200 transition-colors p-5 mt-10 rounded-box shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Spotlight</h3>
                {/* <Button variant="secondary" size="s" onClick={() => alert('Sign up!')}>Get promoted</Button> */}
            </div>

            <EmblaCarousel slides={combinedSlides} options={OPTIONS} />
        </section>
    );
}
