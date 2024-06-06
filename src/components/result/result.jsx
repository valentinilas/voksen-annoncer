import Button from "../button/button";
import Label from "../label/label";
import { formatDate } from "../../util/format-date";
import { NavLink } from "react-router-dom";



export default function Result({data}) {

    const { uuid = "", title = "", created_at = null, description = "", image_urls = [], regions = "" } = data;


    const formattedDate = formatDate(created_at);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    return (<div>
        <div className="mb-4 border  shadow-sm px-5 py-10  rounded-md ">
            {/* Card main content */}
            <div className="grid grid-cols-12 gap-8	">
                <div className="result-text col-span-9">
                    <Label>{formatDate(formattedDate)}</Label>
                    <h3 className=" text-2xl mb-4">{title}</h3>
                    <div><pre>{truncateText(description, 350)}</pre></div>
                </div>
                <div className="result-image col-span-3">
                    {image_urls.length > 0 ? <img src={image_urls[0]} className="mb-2 rounded-md w-full object-cover aspect-square" /> : null}
                </div>
            </div>

            {/* Card Details */}
            <div className="flex p-4 bg-white border  border-cherry-200 justify-between rounded-md items-center gap-4 mt-10">
                <div> <Button to={`/ad/${uuid}`}>Details</Button></div>
                <div className="flex items-center gap-4">
                    <span>Region: {regions.region_name}</span>
                    <span>Age: 24</span>
                    <span>Service: Massage</span>
                </div>
            </div>
        </div>
    </div>)
}