import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";


import useFetchSingleAd from "../../hooks/useFetchSingleAd";
import AdProfile from "./ad-profile";

export default function AdDetail() {
  
    const { adId } = useParams();
    const { ad, loading, error } = useFetchSingleAd(adId);


    if (loading) {
        return (
            <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
                <p>Error loading data: {error}</p>
            </section>
        );
    }

    return (
        <section className="container mx-auto   mt-10 rounded-lg ">
            <div className="grid grid-cols-12 gap-6">
                {/* Ad detail */}
                <div className="bg-white shadow-sm rounded-md p-5 col-span-12 lg:col-span-8">
                    {/* Card main content */}
                    <div className="">
                        <div className="result-text">
                            <span className="text-stone-500"><Label Icon={CalendarDaysIcon}>{formatDate(ad.created_at)}</Label></span>
                            <h3 className="font-bold text-2xl mb-4">{ad.title}</h3>
                            <div><pre className="whitespace-pre-wrap">{ad.description}</pre></div>
                        </div>
                       
                    </div>

                    {/* Card Details */}
                    <div className="flex p-4 bg-white border border-cherry-200 justify-between rounded-md items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span>Location: {ad.regions.region_name}</span>
                           
                        </div>
                    </div>
                    {/* Gallery */}
                    {ad.ad_images.length > 0 && (<div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-10">
                        {ad.ad_images.map(image => {
                            return <div key={image.uuid}><img src={image.image_url} className="mb-2 rounded-md w-full object-cover aspect-square" /></div>
                        })}
                    </div>)}

                </div>
                <div className="p-5 col-span-12 lg:col-span-4">
                    <AdProfile profileData={ad.profiles}/>
                </div>
                {/* Profile */}
            </div>
        </section>
    );
}

