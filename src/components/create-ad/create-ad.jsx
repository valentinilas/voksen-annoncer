import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';
import useFetchRegions from '../../hooks/useFetchRegions';

export default function CreateAd() {
    const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions();
    const [uploading, setUploading] = useState(false); // New loading state

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const fileInput = useRef(null);
    const navigate = useNavigate();

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

    const getPublicUrl = async (filePath) => {
        const { data, error } = await supabase.storage.from('voksen-annoncer').getPublicUrl(filePath);
        if (error) {
            console.error('Error getting public URL:', error);
            return null;
        }
        return data.publicUrl;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true); // Start loading

        // Upload files and get their URLs
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const filePath = await handleImageUpload(images[i]);
            if (filePath) {
                const publicUrl = await getPublicUrl(filePath);
                if (publicUrl) {
                    imageUrls.push(publicUrl);
                }
            }
        }

        // Save the ad details to the database
        const { data: adData, error: adError } = await supabase
            .from('ads')
            .insert({
                title,
                description,
                region_id: selectedRegion,
            })
            .select();

        if (adError) {
            console.error('Error creating ad:', adError);
            setUploading(false); 
            return;
        }
        const adId = adData[0].uuid;  

        // Insert image URLs into the ad_images table
        const { error: imageError } = await supabase
            .from('ad_images')
            .insert(
                imageUrls.map((imageUrl) => ({
                    ad_id: adId,
                    image_url: imageUrl,
                }))
            );

        if (imageError) {
            console.error('Error inserting image URLs:', imageError);
            setUploading(false); // End loading on error

            return;
        }

        // Reset the form fields
        setTitle('');
        setDescription('');
        setImages([]);
        fileInput.current.value = '';
        setSelectedRegion('');
        setUploading(false); // End loading on success

        navigate('/dashboard');
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
                        onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                        Region
                    </label>
                    {regionsLoading ? (
                        <p>Loading regions...</p>
                    ) : regionsError ? (
                        <p>Error loading regions</p>
                    ) : (
                        <select
                            id="region"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            required
                        >
                            <option value="">Select a region</option>
                            {regions?.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.region_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Create Ad'}</Button>
                </div>
                {uploading && <p>Uploading images, please wait...</p>}
            </form>
        </div>
    );
}
