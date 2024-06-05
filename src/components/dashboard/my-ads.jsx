import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import { useAuth } from "../../lib/auth-context";
import Button from "../button/button";
import { NavLink } from "react-router-dom";

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
        return <div>
            <p>You don't have any ads created</p>
            <Button to="/new-ad">Create ad</Button>
        </div>;
    }

    return (


        <ol>
            {ads.map(ad => {
                const { uuid, title, description } = ad;

                return <li key={uuid} className="border-b pb-4 mb-4">
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <div className="flex gap-2 justify-end mt-10  pt-5">
                        <Button variant="primary" to={`/ad/${uuid}`} className="mr-auto">View</Button>
                        <Button variant="secondary">Edit</Button>
                        <Button variant="tertiary" onClick={() => deleteRow(uuid)}>Delete</Button>
                    </div>
                </li>
            })}

        </ol>


    );
}
