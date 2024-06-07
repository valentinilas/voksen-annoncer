import Label from "../label/label";
export default function ProfileFieldSelect({ options, labelKey, label, value, placeholder, icon: Icon, editing, name, onChange, loading, error, ...props }) {
    


    return (
        <p className="mb-2 bg-stone-200 p-4 rounded-2xl">
            <Label type="profile" Icon={Icon}>
                <span className="font-bold mb-1">{label}</span>
            </Label>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading regions</p>
            ) : (
                editing ? (
                    <select
                        {...props}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="bg-stone-300 rounded p-2 w-full"
                    >
                        {/* <option value="">Select an option</option> */}
                        {options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option[labelKey]}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>{options.find(option => option.id === parseInt(value))?.[labelKey]}</span>
                )
            )}
        </p>
    );
}



