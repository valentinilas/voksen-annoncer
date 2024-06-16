import { forwardRef } from 'react';
import Label from "../label/label";

const ProfileFieldSelect = forwardRef(({ options, labelKey, label, placeholder, icon: Icon, editing, name, loading, error, fieldError, defaultValue, ...props }, ref) => {
    return (
        <p className="mb-2 bg-base-200  p-4 rounded-box">
            <Label type="profile" Icon={Icon}>
                <span className="font-bold mb-1">{label}</span>
            </Label>
            {loading ? (
                <p className="">Loading...</p>
            ) : error ? (
                <p className="">Error loading options</p>
            ) : (
                editing ? (
                    <select
                        {...props}
                        name={name}
                        ref={ref}
                        className={`rounded p-2 w-full ${fieldError ? 'border border-red-500' : ''}`}
                        defaultValue={defaultValue} // Use defaultValue here
                    >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option[labelKey]}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="">{options.find(option => option.id === parseInt(defaultValue))?.[labelKey]}</span>
                )
            )}
                    {(fieldError && editing) && <span className="text-red-500 block">{fieldError.message}</span>}

        </p>
    );
});

export default ProfileFieldSelect;
