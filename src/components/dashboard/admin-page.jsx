import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import { NavLink } from "react-router-dom";

import MyAd from "./my-ad";

import Label from "../label/label";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";

import useFetchAdminAdList from "../../hooks/useFetchAdminAdList";
import AdRow from "./admin-row";

export default function Admin() {

    const { ads, loading, error, setData } = useFetchAdminAdList();

   



   




    if (loading) {
        return <div className="container mx-auto bg-base-200  p-5 mt-10 rounded-box">
            <p >Loading ads...</p>
        </div>;
    }

    if (error) {
        return <div className="container mx-auto bg-base-200  p-5 mt-10 rounded-box">
            <p>Error loading ads: {error}</p>
        </div>;
    }


    if (!ads.length) {
        return <div className="container mx-auto bg-base-200  p-5 mt-10 rounded-box">
            No ads available
        </div>;
    }

    console.log(ads);

    return (
        <>
           

            <div className="container mx-auto bg-base-200  p-5 mt-10 rounded-box">




                {ads && ads.length > 0 ? (
                    
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>UUID</th>
                                    <th>title</th>
                                    <th>URL</th>
                                    <th>Approved</th>

                                </tr>
                            </thead>
                            <tbody>
                                {ads.map((ad, index) => {
                                    return <AdRow ad={ad} index={index} key={ad.uuid} setData={setData}/>
                                })}

                            </tbody>
                        </table>
                    </div>


                ) : (

                    <div className="bg-base-200 rounded-box p-5 my-2">
                        <p className="text-center dark:text-zinc-200 py-10">No ads found</p>
                    </div>
                )}

            </div>
        </>

    );
}
