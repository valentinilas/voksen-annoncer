import Button from "../button/button";
import Label from "../label/label";
import { formatDate } from "../../util/format-date";


export default function Result({ id, title, created_at, description, url, thumb_url, image_urls, region_name }) {


    const formattedDate = formatDate(created_at);

    return (<div>
        <div className="border-b my-6 py-6 ">
            {/* Card main content */}
            <div className="grid grid-cols-12 	">
                <div className="result-text col-span-9">
                    <span className="text-stone-500"><Label>{formatDate(formattedDate)}</Label></span>
                    <h3 className="font-bold text-xl">{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="result-image col-span-3">
                    <img src={thumb_url} className="mb-2 rounded-md w-full object-cover aspect-square" />
                    {image_urls.length > 1 && <div className="result-thumbs flex gap-2">
                        {image_urls.map(image_src => <img key={image_src} src={image_src + '?width=100&height=100'} className="mb-2 rounded-md w-full max-w-24 object-cover aspect-square" />)}
                    </div>}
                </div>
            </div>

            {/* Card Details */}
            <div className="flex p-4 bg-white border  border-cherry-200 justify-between rounded-md items-center gap-4">
                <div> <Button href={url} >Details</Button></div>
                <div className="flex items-center gap-4">
                    <span>Region: {region_name}</span>
                    <span>Age: 24</span>
                    <span>Service: Massage</span>
                </div>
            </div>
        </div>
    </div>)
}