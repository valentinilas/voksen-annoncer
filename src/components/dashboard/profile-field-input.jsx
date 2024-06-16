import { forwardRef } from 'react';
import Label from "../label/label";

const ProfileFieldInput = forwardRef(({ type, label, placeholder, icon: Icon, editing, name, fieldError, defaultValue, ...props }, ref) => (
    <p className="mb-2 bg-base-200 p-4 rounded-box">
        <Label type="profile" Icon={Icon}>
            <span className="font-bold mb-1">{label}</span>
        </Label>
        {editing ? (
            <input
                {...props}
                type={type || 'text'}
                name={name}
                ref={ref}
                className={` rounded p-2 w-full ${fieldError ? 'border border-red-500' : ''}`}
                defaultValue={defaultValue} // Use defaultValue instead of value
            />
        ) : (
            <span className="">{!defaultValue ? placeholder : defaultValue}</span> 
        )}
        {fieldError && editing  && <span className="text-red-500 block">{fieldError.message}</span>}
    </p>
));

export default ProfileFieldInput;
