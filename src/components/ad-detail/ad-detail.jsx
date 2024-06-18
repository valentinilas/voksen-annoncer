import { useParams } from "react-router-dom";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";

import { CalendarDaysIcon, TagIcon, MapPinIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../lib/auth-context";

import { useTranslation } from "react-i18next";
import useFetchSingleAd from "../../hooks/useFetchSingleAd";
import AdProfile from "./ad-profile";

import SimpleGallery from "./ad-gallery";
import Spotlight from "../spotlight/spotlight";

export default function AdDetail() {
    const [t] = useTranslation();

    const { profileData, session, auth_user_log_out } = useAuth();

    const { profile, loading: loadingProfile, error: errorProfile } = profileData;
    const { is_admin } = profile || {};



    const { adId } = useParams();
    const { ad, loading, error } = useFetchSingleAd(adId);
    console.log(ad);

    if (loading) {
        return (
            <section className="bg-base-200 p-5  rounded-lg shadow-sm">
                <p>Loading data...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-base-200 p-5  rounded-lg shadow-sm">
                <p>Error loading data: {error}</p>
            </section>
        );
    }

    if (!is_admin && !ad.is_approved) {
        return (
            <section className="bg-base-200 p-5 rounded-lg shadow-sm">
                <p>{t("ads.not-approved")}</p>
            </section>
        )
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
            <section className="ad-detail">
                <div className="grid grid-cols-12 gap-6">
                    {/* Ad detail */}
                    <div className="bg-base-200 p-5  rounded-box shadow-sm col-span-12 lg:col-span-8 flex flex-col">
                        {/* Card main content */}
                        <div className="">
                            <div className="result-text dark:text-zinc-200 ">


                                <h3 className="font-bold text-2xl mb-4">{ad.title}</h3>
                                <div><pre className="font-sans whitespace-pre-wrap">{ad.description}</pre></div>
                            </div>

                        </div>



                        {galleryImages.length > 0 ? <SimpleGallery
                            galleryID="my-test-gallery"
                            images={galleryImages}

                        /> : null}

                        <div className="border-t pt-5 mt-5 border-base-300  flex flex-wrap gap-2 ">
                            <Label Icon={CalendarDaysIcon}>{formatDate(ad.created_at)}</Label>
                            <Label Icon={MapPinIcon}>{ad.regions?.region_name}</Label>
                            <Label Icon={TagIcon}>{t(`categories.${ad.ad_categories?.category_name}`)}</Label>
                            <Label Icon={TagIcon}>{t(`subcategories.${ad.ad_sub_categories?.sub_category_name}`)}</Label>

                        </div>

                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <AdProfile profileData={ad.profiles} />
                    </div>
                    {/* Profile */}
                </div>

            </section>
            {/* <Spotlight /> */}
        </>
    );
}

