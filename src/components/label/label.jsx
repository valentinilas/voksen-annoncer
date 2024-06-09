export default function Label({ children, type, Icon, className, ...props }) {
    // Default
    let classes = `rounded-lg font-normal flex gap-2 justify-items-center items-center bg-black/5 text-stone-600 inline-flex py-1 px-4 mb-5 ${className}`;

    // Profile
    if(type === 'profile'){
        classes = `flex gap-2 items-center text-sm ${className}`
    }
    return <label className={classes}>{Icon && <Icon className="size-5" />} {children}</label>
}

