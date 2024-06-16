import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Button from "../button/button";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Label from "../label/label";
import { CalendarDaysIcon, TagIcon, MapPinIcon } from "@heroicons/react/24/outline";

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
    console.log(ad);

    const { uuid, title, description, ad_images, created_at, is_approved, ad_categories, ad_sub_categories, regions } = ad;

    return (
        <>
            <ConfirmationModal ref={dialog} onCancel={() => { hideModal() }} onConfirm={() => confirmDelete(uuid)} />

            <li key={uuid} className="mb-4   shadow-sm px-5 py-10  transition-colors duration-700 rounded-md bg-white dark:bg-zinc-800">
                <div className="grid grid-cols-12 gap-8 ">
                    <div className="col-span-8 dark:text-zinc-200">
                        <div className="mb-5">
                            <Label type={is_approved ? 'success' : 'warning'}>{is_approved ? 'Approved' : 'Pending approval'}</Label>
                        </div>

                        <h4 className="font-bold text-lg mb-4 truncate">{title}</h4>
                        <p className="text-ellipsis overflow-hidden">{truncateText(description, 300)}</p>
                        <div className="flex gap-2  pt-5 mt-5 items-center ">

                            {/* <Button variant="primary" to={`/ad/${uuid}`} >View</Button> */}
                            <Button variant="secondary">Edit</Button>
                            <Button variant="tertiary" onClick={() => showModal()}>Delete</Button>

                        </div>
                    </div>
                    <div className="col-span-4">

                        <NavLink to={`/ad/${uuid}`}>{ad_images.length > 0 ? <img src={ad_images[0].image_url} className="mb-2 rounded-md w-full object-cover aspect-square border-solid border-2 border-stone-100 hover:border-cherry-600 transition-colors" /> : <DefaultImage />}</NavLink>
                    </div>

                </div>

                <div className="flex gap-2 border-t dark:border-zinc-950 pt-5   mt-10 items-center ">
                    <div className="flex gap-2 items-center">
                        <Label Icon={CalendarDaysIcon}>{formatDate(created_at)}</Label>
                        <Label Icon={MapPinIcon}>{regions?.region_name}</Label>
                        <Label Icon={TagIcon}>{ad_categories?.category_name} / {ad_sub_categories?.sub_category_name}</Label>
                    </div>


                </div>

        

            </li>
        </>

    );
}
