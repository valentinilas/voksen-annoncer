import React, { useState } from 'react';
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import Button from '../button/button';

export default function Filters() {
    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleDropdown1Change = (e) => {
      setDropdown1(e.target.value);
    };
  
    const handleDropdown2Change = (e) => {
      setDropdown2(e.target.value);
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearch = () => {
      // Perform the search with the selected filters and search term
      console.log('Search Term:', searchTerm);
      console.log('Dropdown 1:', dropdown1);
      console.log('Dropdown 2:', dropdown2);
    };
    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <div className="flex gap-4 items-center justify-center">
                <div className="filter-group ">
                    <select
                    className="border p-2 rounded-md"
                    id="dropdown1" value={dropdown1} onChange={handleDropdown1Change}>
                        <option value="">Whole country</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
               
                <div className="filter-group rounded-md">
                    <input
                    className="border p-2"
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                </div>

                <Button variant="secondary" onClick={handleSearch}>Search</Button>
                <Button variant="tertiary" size="m-icon-only" Icon={AdjustmentsHorizontalIcon}></Button>

            </div>
        </section>
    );
}