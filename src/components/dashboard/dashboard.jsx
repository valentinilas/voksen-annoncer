import { useAuth } from "../../lib/auth-context";
import ProfileDetail from "./profile-details";
import Button from "../button/button";

import MyAds from "./my-ads";

export default function Dashboard() {
    const year = new Date().getFullYear();
    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <div className="flex gap-2 justify-between items-center  mb-4">
                <h1 className="text-lg font-bold ">Dashboard</h1>

                <div className="flex gap-2 justify-end">
                    <Button variant="primary">Edit profile</Button>
                    <Button variant="tertiary">Delete account</Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 ">
                    <div className="border  p-6 rounded-md">
                        <ProfileDetail />
                    </div>

                </div>
                <div className="my-ads col-span-8  text-black p-6 rounded-md">
                    <MyAds />
                </div>
            </div>



        </section>
    );
}