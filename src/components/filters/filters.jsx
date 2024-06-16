import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from '../button/button';
import useFetchRegions from '../../hooks/useFetchRegions';
import useFetchCategories from '../../hooks/useFetchCategories';

export default function Filters({ refetchAdList, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, selectedRegion, setSelectedRegion, searchTerm, setSearchTerm }) {
  const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions();
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();

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

  // Render options for sub-categories based on selected main category
  const renderSubCategoryOptions = () => {
    const mainCategory = categories.find(cat => cat.category_id === Number(selectedCategory));
    if (mainCategory && mainCategory.ad_sub_categories) {
      return mainCategory.ad_sub_categories.map(subcategory => (
        <option key={subcategory.sub_category_id} value={subcategory.sub_category_id}>{subcategory.sub_category_name}</option>
      ));
    }
    return null;
  };

  return (
    <section className="bg-base-200 p-5 mt-2 mb-2 rounded-box shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-start">
        <div className="filter-group rounded-md w-full">

          <input
            className="input input-bordered w-full "
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
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
                <option value="all">All locations</option>
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
                <option value="all">All categories</option>
                {categories.map(category => (
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
                    <option value="all">All sub-categories</option>
                    {renderSubCategoryOptions()}
                  </select>
                </>

        
            </div>
          </>
        )}






        <Button variant="primary" Icon={MagnifyingGlassIcon} onClick={handleSearch}>Filter</Button>
        {/* <Button variant="tertiary" size="m-icon-only" Icon={AdjustmentsHorizontalIcon}></Button> */}
      </div>
    </section>
  );
}
