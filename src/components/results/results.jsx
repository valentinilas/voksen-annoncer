import Button from "../button/button";
import Result from "../result/result";

// Database
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";


export default function Results() {

    const [adList, setAdList] = useState([]);

    useEffect(() => {
        getAdList();
    }, []);

    async function getAdList() {
        let { data: ads, error } = await supabase
            .from('ads')
            .select('*, regions ( id, region_name )')
            .order('id', { ascending: false })
        setAdList(ads);
    }


    const BLOCKS =
        adList.map((ad, index) => {
            return <Result key={ad.id} id={ad.id} created_at={ad.created_at} title={ad.title} description={ad.description} thumb_url={ad.image_urls[0]} url={ad.url} region_name={ad.regions.region_name} image_urls={ad.image_urls} />
        });
    return (
        <section className="container mx-auto bg-white mt-1 p-5 0 rounded-lg shadow-sm">
            {BLOCKS}
        </section>
    );
}