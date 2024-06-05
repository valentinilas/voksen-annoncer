import Button from "../button/button";
import { useRef, forwardRef, useImperativeHandle } from "react";

const ConfirmationModal = forwardRef(function ConfirmationModal({ onCancel, onConfirm }, ref) {


  const dialog = useRef()

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    }
  })

  return (
    <dialog ref={dialog} className="p-10 bg-white shadow-xl rounded-lg backdrop:bg-black/20">
      <h3 className="text-xl mb-3">Are you sure?</h3>
      {/* <p>{message}</p> */}
      <div className="flex justify-center mt-10 gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </div>
    </dialog>
  );
});

export default ConfirmationModal;