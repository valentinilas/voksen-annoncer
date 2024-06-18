import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from '../button/button';
import useFetchRegions from '../../hooks/useFetchRegions';
import useFetchCategories from '../../hooks/useFetchCategories';
import { useTranslation } from 'react-i18next';

import translateArray from '../../util/translate-array';

export default function Filters({ refetchAdList, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, selectedRegion, setSelectedRegion, searchTerm, setSearchTerm }) {
  const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions();
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();
  const [t] = useTranslation();

  // Handle change in main category selection
  const handleMainCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory('all'); // Reset sub-category selection
  };

  // Handle change in sub category selection
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    refetchAdList();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      refetchAdList();
    }
  }

  if (categoriesLoading) {
    return <p>Loading profile...</p>;
  }

  // Render options for sub-categories based on selected main category
  const renderSubCategoryOptions = () => {
    const mainCategory = categories.find(cat => cat.category_id === Number(selectedCategory));
    if (mainCategory && mainCategory.ad_sub_categories) {
      const subCategories = mainCategory.ad_sub_categories || [];

      const translatedSubCategories = translateArray(t,'subcategories', 'sub_category_name', subCategories);
      return translatedSubCategories.map(subcategory => (
        <option key={subcategory.sub_category_id} value={subcategory.sub_category_id}>{subcategory.sub_category_name}</option>
      ));
    }
    return null;
  };

  console.log(categories);

  const translatedCategories = categories
    ? translateArray(t, 'categories', 'category_name', categories)
    : [];


  return (
    <section className="bg-base-200 p-5  rounded-box shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-start">
        <div className="filter-group rounded-md w-full">

          <input
            className="input input-bordered w-full "
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`${t("filters.Search")}...`}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="filter-group w-full">
          {regionsLoading ? (
            <p>Loading regions...</p>
          ) : regionsError ? (
            <p>Error loading regions</p>
          ) : (
            <>
              <select
                className="select select-bordered w-full"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="all">{t("filters.All locations")}</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.region_name}</option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className="filter-group w-full">
          {categoriesLoading ? (
            <p>Loading Categories...</p>
          ) : categoriesError ? (
            <p>Error loading categories</p>
          ) : (
            <>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={handleMainCategoryChange}>
                <option value="all">{t("categories.All categories")}</option>
                {translatedCategories.map(category => (
                  <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                ))}
              </select>

            </>
          )}
        </div>

        {categoriesLoading ? (
          <p>Loading Categories...</p>
        ) : categoriesError ? (
          <p>Error loading categories</p>
        ) : (
          <>
            <div className="filter-group w-full">

              <>
                <select
                  className="select select-bordered w-full "
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}>
                  <option value="all">{t("subcategories.All sub-categories")}</option>
                  {renderSubCategoryOptions()}
                </select>
              </>


            </div>
          </>
        )}






        <Button variant="secondary" Icon={MagnifyingGlassIcon} onClick={handleSearch}>{t("filters.Filter")}</Button>
        {/* <Button variant="tertiary" size="m-icon-only" Icon={AdjustmentsHorizontalIcon}></Button> */}
      </div>
    </section>
  );
}
