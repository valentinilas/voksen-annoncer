import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../button/button";
import Result from "../result/result";

import Filters from "../filters/filters";
import useFetchAdList from "../../hooks/useFetchAdList";
import { useTranslation } from "react-i18next";


export default function Results() {
  const [t] = useTranslation();


  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { ads, loading, error, total, refetchAdList } = useFetchAdList(selectedCategory, selectedSubCategory, selectedRegion, searchTerm, page, pageSize);


  if (loading) {
    return (
        <div className="bg-base-200 p-5 rounded-box shadow-sm text-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>

    );
  }

  if (error) {
    return (
        <div className="bg-base-200 p-5 rounded-box shadow-sm">
          <p className="text-center">Error loading Ads: {error}</p>
        </div>
    );
  }

  // const totalPages = total ? Math.ceil(total / pageSize) : 0;
  const totalPages = Math.ceil(total / pageSize);


  return (
    <>

      <section className="results">

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

          <div className="bg-base-200 rounded-box p-5 my-2">
            <p className="text-center dark:text-zinc-200 py-10">No ads found</p>
          </div>
        )}


        {/* Pagination Controls */}

        <div className="flex justify-center">
          <div className="join mx-auto mt-2">
            <button className={`join-item btn ${page === 1 ? 'btn-disabled' : ''}`} onClick={() => setPage(page > 1 ? page - 1 : 1)} >«</button>
            <button className="join-item btn">{t("pagination.Page")} {page} {t("pagination.of")} {totalPages}</button>
            <button className={`join-item btn ${page === totalPages ? 'btn-disabled' : ''}`} onClick={() => setPage(page < totalPages ? page + 1 : page)} >»</button>
          </div>

        </div>


      </section>
    </>
  );
}
