import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import Result from "../result/result";

import useFetchAdList from "../../hooks/useFetchAdList";

export default function Results() {
    const { ads, loading, error } = useFetchAdList();

    if (loading) {
        return (
          <section className="container mx-auto bg-white dark:bg-zinc-900 mt-1 p-5 rounded-lg shadow-sm">
            <p>Loading data...</p>
          </section>
        );
      }
    
      if (error) {
        return (
          <section className="container mx-auto bg-white dark:bg-zinc-900 mt-1 p-5 rounded-lg shadow-sm">
            <p>Error loading data: {error}</p>
          </section>
        );
      }
    
      return (
        <section className="container mx-auto bg-white dark:bg-zinc-900 mt-1 p-5 rounded-lg shadow-sm">
          {ads && ads.map(ad => (
            <Result key={ad.uuid} data={ad} />
          ))}
        </section>
      );
}
