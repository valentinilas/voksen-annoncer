import { useAuth } from "../../lib/auth-context";
import ProfileDetail from "./profile-details";
import Button from "../button/button";

export default function Dashboard() {
    const year = new Date().getFullYear();
    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <h1 className="text-lg font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 border  p-6 rounded-md">
                    <h4 className="text-xl mb-4">Profile</h4>
                    <ProfileDetail />
                </div>
                <div class="my-ads col-span-8  bg-stone-50 text-black p-6 rounded-md">
                    <h4 className="text-xl mb-4">My ads</h4>
                    <ol>
                        <li className="border-b pb-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id mollis augue. Sed sit amet erat nec nisi scelerisque iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            <div className="flex gap-2 justify-end mt-10  pt-5">
                                <Button variant="secondary">Edit</Button>
                                <Button variant="tertiary">Delete</Button>
                            </div>
                        </li>
                        <li className="border-b pb-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id mollis augue. Sed sit amet erat nec nisi scelerisque iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            <div className="flex gap-2 justify-end mt-10  pt-5">
                                <Button variant="secondary">Edit</Button>
                                <Button variant="tertiary">Delete</Button>
                            </div>
                        </li>
                        <li className="border-b pb-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id mollis augue. Sed sit amet erat nec nisi scelerisque iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            <div className="flex gap-2 justify-end mt-10  pt-5">
                                <Button variant="secondary">Edit</Button>
                                <Button variant="tertiary">Delete</Button>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="flex gap-2 justify-end mt-10 border-t pt-5">
                <Button variant="primary">Edit profile</Button>
                <Button variant="tertiary">Delete account</Button>
            </div>

        </section>
    );
}