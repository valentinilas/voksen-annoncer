import { PhotoIcon } from "@heroicons/react/24/outline";
export default function DefaultImage(){
    return (
        <div className="mb-2 rounded-md w-full object-cover aspect-square border-solid border-2 bg-stone-100 dark:bg-zinc-900 dark:border-zinc-700 border-stone-100 hover:border-cherry-600 transition-colors relative group"><PhotoIcon className="text-stone-200 size-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/></div>
    )
}