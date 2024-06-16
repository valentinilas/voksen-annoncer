import { useParams } from "react-router-dom";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";

import { CalendarDaysIcon, TagIcon, MapPinIcon } from "@heroicons/react/24/outline";




import useFetchSingleAd from "../../hooks/useFetchSingleAd";
import AdProfile from "./ad-profile";

import SimpleGallery from "./ad-gallery";
import Spotlight from "../spotlight/spotlight";

export default function AdDetail() {



    const { adId } = useParams();
    const { ad, loading, error } = useFetchSingleAd(adId);
    console.log(ad);

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


    const galleryImages = ad.ad_images.map(image => {
        return {
            ...image,
            largeURL: image.image_url.split('?')[0],
            thumbnailURL: image.image_url,
            width: image.image_width,
            height: image.image_height
        }
    })

    return (
        <>
            <section className="container mx-auto   mt-10 rounded-lg ">
                <div className="grid grid-cols-12 gap-6">
                    {/* Ad detail */}
                    <div className="bg-zinc-100 dark:bg-zinc-900 shadow-sm rounded-md p-5 col-span-12 lg:col-span-8">
                        {/* Card main content */}
                        <div className="">
                            <div className="result-text dark:text-zinc-200 ">
                                <div className="border-b dark:border-zinc-950 flex justify-between pb-5 mb-10">
                                    <div className="flex gap-2">
                                        <Label Icon={MapPinIcon}>{ad.regions?.region_name}</Label>
                                        <Label Icon={TagIcon}>{ad.ad_categories?.category_name} / {ad.ad_sub_categories?.sub_category_name}</Label>
                                    </div>
                                    <Label Icon={CalendarDaysIcon}>{formatDate(ad.created_at)}</Label>
                                </div>

                                <h3 className="font-bold text-2xl mb-4">{ad.title}</h3>
                                <div><pre className="font-sans whitespace-pre-wrap">{ad.description}</pre></div>
                            </div>

                        </div>



                        {galleryImages.length > 0 ? <SimpleGallery
                            galleryID="my-test-gallery"
                            images={galleryImages}
                        /> : null}

                    </div>
                    <div className="p-5 col-span-12 lg:col-span-4">
                        <AdProfile profileData={ad.profiles} />
                    </div>
                    {/* Profile */}
                </div>
            </section>
            <Spotlight />
        </>
    );
}

