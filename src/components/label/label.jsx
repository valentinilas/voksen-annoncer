export default function Label({ children, Icon, ...props }) {
    // Default
    let classes = "rounded-lg font-normal flex gap-2 justify-items-center items-center bg-stone-100 text-stone-600 inline-flex py-1 px-4"
    return <label className={classes}>{Icon && <Icon className="size-5" />} {children}</label>
}

