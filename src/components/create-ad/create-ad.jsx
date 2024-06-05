import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../button/button';

import { useNavigate } from 'react-router-dom';



export default function CreateAd() {



    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const fileInput = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        let { data, error } = await supabase
            .from('regions')
            .select('*');
        if (error) {
            console.error('Error fetching regions:', error);
        } else {
            setRegions(data);
        }
    };

    const handleImageUpload = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `ad-images/${fileName}`;

        let { error } = await supabase.storage
            .from('voksen-annoncer')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        return filePath;
    };



    const getPublicUrl = (filePath) => {
        const { data } = supabase
            .storage
            .from('voksen-annoncer')
            .getPublicUrl(filePath)
        return data.publicUrl;
    };

    const handleSubmit = async (event) => {
        console.log('submit');
        console.log(images);
        event.preventDefault();

        // Upload files and get their URLs
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const filePath = await handleImageUpload(images[i]);
            if (filePath) {
                console.log('filePath', filePath);
                const publicUrl = getPublicUrl(filePath);
                if (publicUrl) {
                    imageUrls.push(publicUrl);
                }
            }
        }

        console.log(imageUrls);

        // Save the ad details to the database
        const { data, error } = await supabase
            .from('ads')
            .insert([
                { title, description, region_id: selectedRegion, image_urls: imageUrls }
            ]);

        if (error) {
            console.error('Error creating ad:', error);
        } else {
            console.log('Ad created successfully:', data);
            // Reset the form fields
            setTitle('');
            setDescription('');
            setImages([]);
            fileInput.current.value = '';
            setSelectedRegion('');
          
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto bg-white mt-10 p-5 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Create Ad</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                        Upload Images
                    </label>
                    <input
                    ref={fileInput}
                        id="images"
                        type="file"
                        multiple
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setImages(e.target.files)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                        Region
                    </label>
                    <select
                        id="region"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        required
                    >
                        <option value="">Select a region</option>
                        {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.region_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" value="Submit">Create Ad</Button>
                </div>
            </form>
        </div>
    );
}
