export default function Label({ children, type, Icon, ...props }) {
    // Default
    let classes = "rounded-lg font-normal flex gap-2 justify-items-center items-center bg-black/5 text-stone-600 inline-flex py-1 px-4 mb-5"

    // Profile
    if(type === 'profile'){
        classes = 'flex gap-2 items-center text-sm'
    }
    return <label className={classes}>{Icon && <Icon className="size-5" />} {children}</label>
}

