import Button from "../button/button";
import Label from "../label/label";
import { formatDate } from "../../util/format-date";
import { NavLink } from "react-router-dom";
import { cdnUrl } from "../../util/cdn-url";

import { CalendarDaysIcon, TagIcon, MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


import DefaultImage from "../default-image/default-image";

export default function Result({ data }) {

    const { uuid = "", title = "", created_at = null, description = "", ad_images = [], regions = [], ad_categories = [], ad_sub_categories = [] } = data;


    const formattedDate = formatDate(created_at);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    return (<div>
        <div className="bg-white dark:bg-zinc-900 p-5 my-2 rounded-lg shadow-sm">
            {/* Card main content */}
            <div className="grid grid-cols-12 gap-10">
                <div className="result-image col-span-3">
                    <NavLink to={`/ad/${uuid}`}>{ad_images.length > 0 ? <img src={ad_images[0].image_url} className="mb-2 rounded-md w-full object-cover aspect-square border-solid border-2 dark:border-zinc-700 border-stone-100 hover:border-cherry-600 transition-colors" /> : <DefaultImage />}</NavLink>
                </div>
                <div className="result-text col-span-9 text-black dark:text-zinc-200 flex flex-col justify-start items-start gap-2">

                    <h3 className=" text-2xl mb-4">{title}</h3>
                    <div>{truncateText(description, 350)}</div>
                   


                </div>

            </div>
            {/* Details */}
            <div>
                <div className="border-t dark:border-zinc-950 flex justify-between mt-5 pt-5">
                    <div className="flex gap-2 items-center">
                        <Label Icon={CalendarDaysIcon}>{formatDate(created_at)}</Label>
                        <Label Icon={MapPinIcon}>{regions?.region_name}</Label>
                        <Label Icon={TagIcon}>{ad_categories?.category_name} / {ad_sub_categories?.sub_category_name}</Label>
                    </div>
                    <Button Icon={ChevronRightIcon} iconDirection="right" className="self-start" to={`/ad/${uuid}`}>Details</Button>
                </div>
            </div>




        </div>
    </div>)
}