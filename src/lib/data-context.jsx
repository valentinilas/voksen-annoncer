import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';

const DataContext = createContext(null);

export function useData() {
    return useContext(DataContext)
}


export function DataProvider({ children }) {
    const [data, setData] = useState({ ads: null, loading: true });



    useEffect(() => {
        console.log("FETCHING DATA");
        async function getAdList() {
            try {
                let { data: ads, error } = await supabase
                    .from('ads')
                    .select('*, regions (region_name), profiles(username)')
                    .order('created_at', { ascending: false });
                setData({ ads, loading: false });
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getAdList();
    }, []);



    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}





