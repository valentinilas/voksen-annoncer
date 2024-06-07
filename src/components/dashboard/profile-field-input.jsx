import Label from "../label/label";

export default function ProfileFieldInput({ type, label, value, placeholder, icon: Icon, editing, name, onChange, ...props }) {
    return (
        <p className="mb-2 bg-stone-200 p-4 rounded-2xl">
            <Label type="profile" Icon={Icon}>
                <span className="font-bold mb-1">{label}</span>
            </Label>
            {editing ? (
                <input
                    {...props}
                    type={type ? type : 'text'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="bg-stone-300 rounded p-2 w-full"
                />
            ) : (
                
                <span>{!value ? placeholder : value}</span>
            )}
        </p>
    );
}





