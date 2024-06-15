export default function Label({ children, type, Icon, className, ...props }) {
    // Default
    let classes = `rounded-lg font-normal flex gap-2 justify-items-center items-center dark:bg-black/20 dark:text-zinc-400 bg-black/10 text-stone-600 inline-flex py-1 px-4 mb-5 dark:text-zinc-200 text-sm	 ${className}`;

    // Profile
    if(type === 'profile'){
        classes = `flex gap-2 items-center text-sm dark:text-zinc-200 ${className}`
    }
    return <label className={classes}>{Icon && <Icon className="size-5 dark:text-zinc-200" />} {children}</label>
}

