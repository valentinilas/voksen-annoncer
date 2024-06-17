import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import { NavLink } from "react-router-dom";

import MyAd from "./my-ad";

import Label from "../label/label";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";

import useFetchAuthUserAdList from "../../hooks/useFetchAuthUserAdList";


export default function MyAds() {

    const { data, setData } = useFetchAuthUserAdList();
    const { ads, loading, error } = data;



    // Handle delete row
    const deleteRow = async (row_value) => {

        try {
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('uuid', row_value);


            if (error) throw error;

            setData((prevData) => {
                return {
                    ...prevData,
                    ads: prevData.ads.filter(ad => {

                        return ad.uuid !== row_value
                    })
                }

            });

            console.log(`Deleted ad: ${row_value}`);

        }
        catch (error) {
            console.log(error);
        }
    }


    if (loading) {
        return <div className="bg-base-200 p-5 rounded-box shadow-sm">
            <p className="text-center">Loading ads... {error}</p>
        </div>


    }

    if (error) {
        return <div className="bg-base-200 p-5 rounded-box shadow-sm">
            <p className="text-center">Error loading ads. {error}</p>
        </div>

    }


    if (!ads.length) {
        return <div className="mb-4 border-dashed border-2 border-cherry-500  shadow-sm px-5 py-10  rounded-md lg:h-full	 flex flex-col items-center justify-center">
            <h3 className="text-md mb-6 dark:text-zinc-200">You don't have any ads created</h3>
            <Button to="/new-ad">Create ad</Button>
        </div>;
    }

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <h4 className="text-xl  ">My ads ({ads.length})</h4>
                <Button variant="primary" Icon={PlusIcon} to="/new-ad">Create a new ad</Button>
            </div>



            <ol>
                {ads.map((ad, index) => {
                    return <MyAd key={index} ad={ad} deleteRow={deleteRow} />
                })}

            </ol>
        </>

    );
}
