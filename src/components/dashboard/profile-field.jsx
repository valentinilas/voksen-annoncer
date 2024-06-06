import Label from "../label/label";

export default function ProfileField({ label, value, icon: Icon }) {


    return (
        <p className="mb-2 bg-stone-200  p-4 rounded-2xl">
            <Label type="profile" Icon={Icon}>
                <span className="font-bold mb-1">{label}</span>
            </Label>
            <span>{value}</span>
        </p>
    );
}

