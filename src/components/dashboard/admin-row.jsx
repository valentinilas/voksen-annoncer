import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import ConfirmationModal from "../modal/confirmation-modal";

const AdRow = ({ ad, index, setData }) => {

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

     // Handle delete row
     const deleteRow = async (row_value) => {

        try {
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('uuid', row_value);


            if (error) throw error;

            setData((prevData) => ({
                ...prevData,
                ads: prevData.ads.filter(ad => ad.uuid !== row_value)
            }));

            console.log(`Deleted ad: ${row_value}`);

        }
        catch (error) {
            console.log(error);
        }
    }
    // Toggle ad approval status
    const toggleAdApproval = async (ad) => {
        try {
            const newStatus = !ad.is_approved;
            const { data, error } = await supabase
                .from('ads')
                .update({ is_approved: newStatus })
                .eq('uuid', ad.uuid)
                .single();

            if (error) throw error;

            // Update the state to reflect the change
            setData((prevData) => ({
                ...prevData,
                ads: prevData.ads.map((a) =>
                    a.uuid === ad.uuid ? { ...a, is_approved: newStatus } : a
                ),
                error: null
            }));

            console.log(`Ad ${ad.uuid} approval status changed to ${newStatus}`);
        } catch (error) {
            console.log(error);
        }
    };


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

    return (
        <tr key={ad.uuid} className="hover">
            <th>{index}</th>
            <td>{ad.uuid}</td>
            <td>{truncateText(ad.title, 20)}</td>
            <td><NavLink className="btn btn-neutral" to={`/ad/${ad.uuid}`}>See Ad</NavLink></td>
            <td>
                <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={ad.is_approved}
                    onChange={() => toggleAdApproval(ad)}
                />
            </td>
            <td>
                <button className="btn btn-error" onClick={() => showModal()}>Delete</button>
                <ConfirmationModal ref={dialog} onCancel={() => { hideModal() }} onConfirm={() => confirmDelete(ad.uuid)} />
            </td>

 
        </tr>
    );
};

export default AdRow;