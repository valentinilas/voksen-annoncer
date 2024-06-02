import Button from "../button/button";

import { supabase } from "../../lib/supabase";




export default function Result({ id, title, description, url, thumb_url, image_urls, region_name }) {


    return (<div>
        <div className="border-b mb-4 pb-4 ">
            {/* Card main content */}
            <div className="flex justify-between columns-2 	">
                <div className="result-text">
                    <h3 className="font-bold text-xl">{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="result-image">
                    <img src={thumb_url} className="mb-2 rounded-md" />
                    <div className="result-thumbs flex gap-2">
                        {image_urls.map(image_src=><img key={image_src} src={image_src + '?width=100&height=100'} className="mb-2 rounded-md w-full max-w-24 object-cover" />)}
                    </div>
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