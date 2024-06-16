import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Button from "../button/button";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Label from "../label/label";
import { CalendarDaysIcon, TagIcon, MapPinIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import ConfirmationModal from "../modal/confirmation-modal";
import DefaultImage from "../default-image/default-image";

export default function MyAd({ ad, deleteRow }) {


    const dialog = useRef(); // we use forward ref in the real dialog

    function showModal() {
        dialog.current.open();
    }

    function hideModal() {
        dialog.current.close();
    }

    function confirmDelete(uuid) {
        deleteRow(uuid);
        dialog.current.close();

    }


    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const { uuid, title, description, ad_images, created_at, is_approved, ad_categories, ad_sub_categories, regions } = ad;

    return (
        <>
            <ConfirmationModal ref={dialog} onCancel={() => { hideModal() }} onConfirm={() => confirmDelete(uuid)} />

            <li key={uuid} className="bg-base-200 p-5 my-2 rounded-box ">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 ">

                    <div className="col-span-1 md:col-span-12 flex justify-between items-center border-b pb-5  border-base-300">

                        <Label type={is_approved ? 'success' : 'warning'}>{is_approved ? 'Approved' : 'Pending approval'}</Label>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle"><EllipsisVerticalIcon className="size-5 " /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><button>Edit</button></li>
                                <li><button onClick={() => showModal()}>Delete</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-8 ">



                    <NavLink className="block" to={`/ad/${uuid}`}><h4 className="font-bold text-lg mb-4 truncate">{title}</h4></NavLink>
                    <NavLink className="block" to={`/ad/${uuid}`}> <p className="text-ellipsis overflow-hidden">{truncateText(description, 300)}</p></NavLink>
                        {/* <div className="flex gap-2  pt-5 mt-5 items-center ">

                            <Button variant="secondary">Edit</Button>
                            <Button variant="tertiary" onClick={() => showModal()}>Delete</Button>

                        </div> */}
                    </div>
                    <div className="col-span-1 md:col-span-4">

                        <NavLink className="block" to={`/ad/${uuid}`}>{ad_images.length > 0 ? <img src={ad_images[0].image_url} className="rounded-box w-full object-cover aspect-square bg-neutral border-base-100" /> : <DefaultImage />}</NavLink>
                    </div>

                </div>


                <div className="border-t pt-5 mt-5 border-base-300  flex  flex-wrap gap-2">
                    <Label Icon={CalendarDaysIcon}>{formatDate(created_at)}</Label>
                    <Label Icon={MapPinIcon}>{regions?.region_name}</Label>
                    <Label Icon={TagIcon}>{ad_categories?.category_name}</Label>
                    <Label Icon={TagIcon}>{ad_sub_categories?.sub_category_name}</Label>


                </div>



            </li>
        </>

    );
}
