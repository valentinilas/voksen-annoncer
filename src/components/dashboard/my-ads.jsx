import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import { NavLink } from "react-router-dom";

import MyAd from "./my-ad";

import Label from "../label/label";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";



export default function MyAds() {
    const { session, loading: sessionLoading } = useAuth(); // Assume useAuth provides a loading state
    const [data, setData] = useState({ ads: null, loading: true, error: null });




    useEffect(() => {
        if (sessionLoading) {
            // If session is still loading, do nothing
            return;
        }

        if (!session) {
            setData({ ads: null, loading: false, error: "No session available" });
            return;
        }

        const profileId = session.user.id;

        const getUserAds = async () => {
            // console.log('Getting USER ADS');
            try {
                const { data: ads, error } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('user_id', profileId)

                if (error) throw error;


                setData({ ads, loading: false, error: null });
            } catch (error) {
                setData({ ads: null, loading: false, error: error.message });
            }
        };

        getUserAds();
    }, [session, sessionLoading]);


    // Handle delete row
    const deleteRow = async (row_value) => {

        console.log('DELETE ROW TRIGGERED');
        try {
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('uuid', row_value);

            console.log

            if (error) throw error;

            setData((prevData) => {
                return {
                    ...prevData,
                    ads: prevData.ads.filter(ad => {
                        console.log(ad);
                        console.log(ad.uuid !== row_value)
                        return ad.uuid !== row_value
                    })
                }

            });
            console.log('DELETE COMPLETE');
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }









    if (sessionLoading || data.loading) {
        return <p>Loading ads...</p>;
    }

    if (data.error) {
        return <p>Error loading ads: {data.error}</p>;
    }

    const { ads } = data;

    if (!ads.length) {
        return <div className="mb-4 border  shadow-sm px-5 py-10  rounded-md lg:h-full	 flex flex-col items-center justify-center">
            <h3 className="text-md mb-6">You don't have any ads created</h3>
            <Button to="/new-ad">Create ad</Button>
        </div>;
    }



    return (
        <>
            <h4 className="text-xl mb-4">My ads ({ads.length})</h4>

            <ol>
                {ads.map((ad, index) => {
                    return <MyAd key={index} ad={ad} deleteRow={deleteRow} />
                })}

            </ol>
        </>

    );
}
