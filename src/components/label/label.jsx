export default function Label({ children, type, Icon, className, ...props }) {
    // Default
    let classes = `rounded-lg font-normal flex gap-2 justify-items-center items-center dark:bg-black/20 dark:text-zinc-400 bg-black/10 text-stone-600 inline-flex py-1 px-4 text-black  text-sm	 ${className}`;

    // Profile
    if(type === 'profile'){
        classes = `flex gap-2 items-center text-sm text-black dark:text-zinc-200 ${className}`
    }

    if(type === 'danger'){
        classes = `inline-flex items-center rounded-md bg-red-50 dark:bg-red-50/20 px-2 py-1 text-xs font-medium text-red-700  dark:text-red-300 ring-1 ring-inset ring-red-600/20 dark:ring-red-300/60 ${className}`
    }

    if(type === 'success'){
        classes = `inline-flex items-center rounded-md bg-green-50 dark:bg-green-50/20 px-2 py-1 text-xs font-medium text-green-700  dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-300/60 ${className}`
    }
    if(type === 'warning'){
        classes = `inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-50/20 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-300/60 ${className}`
    }
 
    return <label className={classes}>{Icon && <Icon className="size-5 dark:text-zinc-200" />} {children}</label>
}

