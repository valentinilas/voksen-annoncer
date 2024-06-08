import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { formatDate } from "../../util/format-date";
import Button from "../button/button";
import { useRef } from "react";

import Label from "../label/label";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import ConfirmationModal from "../modal/confirmation-modal";

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

    const { uuid, title, description, ad_images, created_at } = ad;

    return (
        <>
            <ConfirmationModal ref={dialog} onCancel={() => { hideModal() }} onConfirm={() => confirmDelete(uuid)} />

            <li key={uuid} className="mb-4   shadow-sm px-5 py-10  transition-colors duration-700 rounded-md bg-white">
                <div className="grid grid-cols-12 gap-8 ">
                    <div className="col-span-8">
                        <Label Icon={CalendarDaysIcon}>{formatDate(created_at)}</Label>
                        <h4 className="font-bold text-lg mb-4 truncate">{title}</h4>
                        <p className="text-ellipsis overflow-hidden">{truncateText(description, 300)}</p>
                    </div>
                    <div className="col-span-4">
                        <img className="rounded-md w-full object-cover aspect-square" src={ad_images[0]?.image_url} alt="" />
                    </div>

                </div>

                <div className="flex gap-2  justify-end mt-10 items-center ">
                    <Button variant="primary" to={`/ad/${uuid}`} className="mr-auto">View</Button>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="tertiary" onClick={() => showModal()}>Delete</Button>

                </div>
            </li>
        </>

    );
}
