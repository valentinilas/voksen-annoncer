import Button from "../button/button";
import Label from "../label/label";
import { formatDate } from "../../util/format-date";
import { NavLink } from "react-router-dom";
import { cdnUrl } from "../../util/cdn-url";

import DefaultImage from "../default-image/default-image";

export default function Result({ data }) {

    const { uuid = "", title = "", created_at = null, description = "", ad_images = [], regions = "" } = data;


    const formattedDate = formatDate(created_at);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    return (<div>
        <div className="mb-6    shadow-sm px-5 py-10  rounded-md bg-white dark:bg-zinc-900 ">
            {/* Card main content */}
            <div className="grid grid-cols-12 gap-10">
                <div className="result-text col-span-10 text-black dark:text-zinc-200">
                    <Label>{formatDate(formattedDate)}</Label>
                    <NavLink to={`/ad/${uuid}`}>
                    <h3 className=" text-2xl mb-4">{title}</h3>
                    <div>{truncateText(description, 350)}</div>
                    </NavLink>
                </div>
                <div className="result-image col-span-2">
                    <NavLink to={`/ad/${uuid}`}>{ad_images.length > 0 ? <img src={ad_images[0].image_url} className="mb-2 rounded-md w-full object-cover aspect-square border-solid border-2 border-stone-100 hover:border-cherry-600 transition-colors" /> : <DefaultImage/>}</NavLink>
                </div>
            </div>

            {/* Card Details */}
            <div className="flex p-4 bg-white border  border-cherry-200 dark:border-zinc-600 dark:bg-zinc-700 justify-between rounded-md items-center gap-4 mt-10">
                <div> <Button to={`/ad/${uuid}`}>Details</Button></div>
                <div className="flex items-center gap-4">
                    <span>Region: {regions.region_name}</span>
                    <span>Age: 24</span>
                </div>
            </div>

           
        </div>
    </div>)
}