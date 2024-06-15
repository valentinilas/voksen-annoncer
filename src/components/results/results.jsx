import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import Result from "../result/result";

import Filters from "../filters/filters";
import useFetchAdList from "../../hooks/useFetchAdList";

export default function Results() {


  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { ads, loading, error, refetchAdList } = useFetchAdList(selectedCategory, selectedSubCategory, selectedRegion, searchTerm);


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
    <>

      <section className="container mx-auto">

        {/* Filters */}
        <div className="filters">
          <Filters
            refetchAdList={refetchAdList}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>



        {ads && ads.length > 0 ? (
          ads.map(ad => (
            <Result key={ad.uuid} data={ad} />
          ))
        ) : (

          <div className="bg-white dark:bg-zinc-900 p-5 my-2 rounded-lg shadow-sm">
            <p className="text-center dark:text-zinc-200 py-10">No ads found</p>
          </div>
        )}




      </section>
    </>
  );
}
