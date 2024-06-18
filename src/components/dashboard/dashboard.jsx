import { useAuth } from "../../lib/auth-context";
import ProfileDetail from "./profile-details";
import Button from "../button/button";

import MyAds from "./my-ads";

export default function Dashboard() {
    const year = new Date().getFullYear();
    return (
        <section className="dashboard">


            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-4 ">
                    <div className="h-full">
                        <ProfileDetail />
                    </div>

                </div>
                <div className="col-span-12 lg:col-span-8">
                    <MyAds />
                </div>
            </div>



        </section>
    );
}