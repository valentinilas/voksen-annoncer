import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';
import useFetchRegions from '../../hooks/useFetchRegions';
import useFetchCategories from '../../hooks/useFetchCategories';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import translateArray from '../../util/translate-array';

export default function CreateAd() {
    const [t] = useTranslation();
    const { regions, loading: regionsLoading, error: regionsError } = useFetchRegions();
    const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories();
    const [selectedMainCategory, setSelectedMainCategory] = useState(''); // New state for main category
    const [uploading, setUploading] = useState(false); // New loading state

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [submitError, setSubmitError] = useState('');
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState('');
    const fileInput = useRef(null);
    const navigate = useNavigate();

    const handleImageUpload = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `ad-images/${fileName}`;

        const image = new Image();
        image.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const width = image.width;
        const height = image.height;

        let { error } = await supabase.storage
            .from('voksen-annoncer')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        }

        return { filePath, width, height };
    };

    const getPublicUrl = async (filePath) => {
        const { data, error } = await supabase.storage.from('voksen-annoncer').getPublicUrl(filePath);
        if (error) {
            console.error('Error getting public URL:', error);
            return null;
        }
        return data.publicUrl;
    };

    const onSubmit = async (data) => {
        setUploading(true); // Start loading

        // Upload files and get their URLs along with dimensions
        const imageDetails = [];
        for (let i = 0; i < images.length; i++) {
            const uploadResult = await handleImageUpload(images[i]);
            if (uploadResult) {
                const publicUrl = await getPublicUrl(uploadResult.filePath);
                if (publicUrl) {
                    imageDetails.push({
                        image_url: publicUrl,
                        width: uploadResult.width,
                        height: uploadResult.height
                    });
                }
            }
        }

        // Save the ad details to the database
        const { data: adData, error: adError } = await supabase
            .from('ads')
            .insert({
                title: data.title,
                description: data.description,
                region_id: data.region_id,
                category_id: data.category_id,
                sub_category_id: data.sub_category_id
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
                imageDetails.map((imageDetail) => ({
                    ad_id: adId,
                    image_url: imageDetail.image_url,
                    image_width: imageDetail.width,
                    image_height: imageDetail.height
                }))
            );

        if (imageError) {
            console.error('Error inserting image URLs:', imageError);
            setUploading(false); // End loading on error
            return;
        }

        // Reset the form fields
        fileInput.current.value = '';
        setImages([]);
        setUploading(false); // End loading on success

        navigate('/dashboard');
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 12) {
            setImageError(t("create-ad.image-length"));
            fileInput.current.value = ''; // Clear the file input
            return;
        }

        for (let file of selectedFiles) {
            if (!file.type.startsWith('image/')) {
                setImageError(t("create-ad.image-type"));
                fileInput.current.value = ''; // Clear the file input
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2 MB in bytes
                setImageError(t("create-ad.image-size"));
                fileInput.current.value = ''; // Clear the file input
                return;
            }
        }

        setImageError('');
        setImages(selectedFiles);
    };

    const handleMainCategoryChange = (e) => {
        setSelectedMainCategory(e.target.value);
    };

    const translatedCategories = categories
        ? translateArray(t, 'categories', 'category_name', categories)
        : [];


    return (

        <div className="bg-base-200 p-5  rounded-box shadow-sm">
            <h2 className="text-2xl font-bold mb-4 dark:text-zinc-400">Create Ad</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="title">
                        {t("create-ad.title")}
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="input input-bordered w-full"
                        {...register("title", {
                            required: `${t("validation.required")}`,
                            maxLength: {
                                value: 160,
                                message: `${t("validation.title-length")}`
                            }
                        })}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                </div>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="description">
                        {t("create-ad.description")}
                    </label>
                    <textarea
                        id="description"
                        rows="7"
                        className="textarea textarea-bordered w-full"
                        {...register("description", {
                            required: `${t("validation.required")}`,
                        })}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                </div>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="images">
                        {t("create-ad.upload-images")}
                    </label>
                    <input
                        ref={fileInput}
                        id="images"
                        type="file"
                        multiple
                        className="file-input file-input-bordered w-full"
                        onChange={handleFileChange}
                    />
                    {imageError && <p className="text-red-500 text-sm">{imageError}</p>}


                </div>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="region">
                        {t("create-ad.region")}
                    </label>
                    {regionsLoading ? (
                        <p className="dark:text-zinc-200">Loading regions...</p>
                    ) : regionsError ? (
                        <p className="dark:text-zinc-200">Error loading regions</p>
                    ) : (
                        <select
                            id="region"
                            className="select select-bordered w-full"
                            {...register("region_id", {
                                required: `${t("validation.required")}`,
                            })}
                        >
                            <option value="">{t("create-ad.select-region")}</option>
                            {regions?.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.region_name}
                                </option>
                            ))}
                        </select>

                    )}
                    {errors.region_id && <p className="text-red-500 text-sm">{errors.region_id.message}</p>}

                </div>

                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="region">
                        {t("create-ad.category")}
                    </label>
                    {categoriesLoading ? (
                        <p className="dark:text-zinc-200">Loading categories...</p>
                    ) : categoriesError ? (
                        <p className="dark:text-zinc-200">Error loading categories</p>
                    ) : (
                        <select
                            id="category"
                            className="select select-bordered w-full"
                            {...register("category_id", {
                                required: `${t("validation.select-category")}`,
                            })}
                            onChange={handleMainCategoryChange}
                        >
                            <option value=""> {t("create-ad.select-category")}</option>
                            {translatedCategories?.map((category) =>

                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>

                            )}
                        </select>

                    )}
                    {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}

                </div>
                {selectedMainCategory && (
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="sub-category">
                            {t("create-ad.sub-category")}
                        </label>
                        <select
                            id="sub-category"
                            className="select select-bordered w-full"
                            {...register("sub_category_id", {
                                required: `${t("validation.select-subcategory")}`,
                            })}
                        >
                            <option value="">{t("create-ad.select-subcategory")}</option>
                            {categories
                                ?.filter(category => category.category_id === Number(selectedMainCategory))
                                .flatMap(category => translateArray(t, 'subcategories', 'sub_category_name', category.ad_sub_categories))
                                .map((subCategory) => (
                                    <option key={subCategory.sub_category_id} value={subCategory.sub_category_id}>
                                        {subCategory.sub_category_name}
                                    </option>
                                ))}
                        </select>
                        {errors.sub_category_id && <p className="text-red-500 text-sm">{errors.sub_category_id.message}</p>}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <Button type="submit" disabled={uploading}>
                        {uploading ? (
                            <>
                                <span className="loading loading-spinner loading-md"></span> {t("create-ad.creating-ad")}
                            </>
                        ) : (
                            `${t("create-ad.submit")}`
                        )}
                    </Button>
                </div>
            </form>
        </div>

    );
}
