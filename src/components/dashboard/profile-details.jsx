import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Label from "../label/label";
import { useAuth } from "../../lib/auth-context";

export default function ProfileDetail() {
    const { session, loading: sessionLoading } = useAuth(); // Assume useAuth provides a loading state
    const [data, setData] = useState({ profile: null, loading: true, error: null });

    useEffect(() => {
        if (sessionLoading) {
            // If session is still loading, do nothing
            return;
        }

        if (!session) {
            setData({ profile: null, loading: false, error: "No session available" });
            return;
        }

        const profileId = session.user.id;

        const getProfile = async () => {
            console.log('Getting profile info');
            try {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', profileId)
                    .single();

                if (error) throw error;

                setData({ profile, loading: false, error: null });
            } catch (error) {
                setData({ profile: null, loading: false, error: error.message });
            }
        };

        getProfile();
    }, [session, sessionLoading]);

    if (sessionLoading || data.loading) {
        return <p>Loading profile...</p>;
    }

    if (data.error) {
        return <p>Error loading profile: {data.error}</p>;
    }

    const { profile } = data;

    return (
        <div >
            <p className="mb-4">
                <span className="block">Username</span>
                <span>{profile.username}</span>
            </p>
            <p className="mb-4">
                <span className="block">Bio</span>
                <span>{profile.bio}</span>
            </p>
           
            {profile.phone &&  <p className="mb-4">
                <span className="block">Phone</span>
                <span>{profile.phone}</span>
            </p>}


        </div>
    );
}
