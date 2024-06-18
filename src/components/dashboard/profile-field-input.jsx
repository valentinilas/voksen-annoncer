import { forwardRef } from 'react';
import Label from "../label/label";

import { useTranslation } from 'react-i18next';

const ProfileFieldInput = forwardRef(({ type, label, visibility, placeholder, icon: Icon, editing, name, fieldError, defaultValue, ...props }, ref) => {
    const [t] = useTranslation();
    return (
        <p className="mb-2 bg-base-200 p-4 rounded-box">
            <span className="flex justify-between">
                <Label type="profile" Icon={Icon}>
                    <span className="font-bold mb-1">{label}</span>

                </Label>

            </span>

            {editing ? (
                <input
                    {...props}
                    type={type || 'text'}
                    name={name}
                    ref={ref}
                    className={` ${type === 'checkbox' ? 'checkbox mt-2' : 'input input-bordered mt-2 w-full'} ${fieldError ? 'border border-red-500' : ''}`}
                    defaultValue={defaultValue} // Use defaultValue instead of value
                />
            ) : (
                <>

                    {visibility !== undefined ? (
                        <Label className="mt-2" type={visibility ? 'success' : 'warning'}>{visibility ? t("profile.visible") : t("profile.hidden")}</Label>
                    ) : <span className="">{!defaultValue ? placeholder : defaultValue}</span>}
                </>

            )}




            {fieldError && editing && <span className="text-red-500 block">{fieldError.message}</span>}
        </p>
    )
});

export default ProfileFieldInput;
