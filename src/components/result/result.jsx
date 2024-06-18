import Button from "../button/button";
import Label from "../label/label";
import { formatDate } from "../../util/format-date";
import { NavLink } from "react-router-dom";
import { cdnUrl } from "../../util/cdn-url";

import { CalendarDaysIcon, TagIcon, MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "react-i18next";
import DefaultImage from "../default-image/default-image";

export default function Result({ data }) {
    const [t] = useTranslation();

    const { uuid = "", title = "", created_at = null, description = "", ad_images = [], regions = [], ad_categories = [], ad_sub_categories = [] } = data;


    const formattedDate = formatDate(created_at);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    return (<div>
        <div className="bg-base-200 p-5 my-2 rounded-box shadow-sm">
            {/* Card main content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="result-image col-span-1 md:col-span-3">
                    <NavLink to={`/ad/${uuid}`}>{ad_images.length > 0 ? <img src={ad_images[0].image_url} className="rounded-box w-full object-cover aspect-square bg-neutral border-base-100" /> : <DefaultImage />}</NavLink>
                </div>
                <div className="result-text col-span-1 md:col-span-9  flex flex-col justify-start items-start gap-2">

                <NavLink to={`/ad/${uuid}`}><h3 className=" text-2xl mb-4">{title}</h3></NavLink>
                <NavLink to={`/ad/${uuid}`}><div>{truncateText(description, 350)}</div></NavLink>
                   


                </div>

            </div>
            {/* Details */}
            <div>
                <div className="border-t border-base-300 flex justify-between mt-5 pt-5">
                    <div className="flex gap-2 items-center flex-wrap">
                        <Label Icon={CalendarDaysIcon}>{formatDate(created_at)}</Label>
                        <Label Icon={MapPinIcon}>{regions?.region_name}</Label>
                        <Label Icon={TagIcon}>{t(`categories.${ad_categories?.category_name}`)}</Label>
                        <Label Icon={TagIcon}>{t(`subcategories.${ad_sub_categories?.sub_category_name}`)}</Label>
                    </div>
                    <Button Icon={ChevronRightIcon} iconDirection="right" className="self-start hidden md:inline-flex" to={`/ad/${uuid}`}>{t("ads.Details")}</Button>
                </div>
            </div>




        </div>
    </div>)
}