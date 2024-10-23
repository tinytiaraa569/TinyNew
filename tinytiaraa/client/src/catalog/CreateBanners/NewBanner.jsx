import React, { useEffect, useState, useRef } from 'react';
import { IoIosClose } from "react-icons/io";
import { IoMdCloudUpload } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '@/ShopDashboardPage/DashboardHeader';
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar';
import { IoMdArrowRoundBack } from "react-icons/io";

// Sample data
const data = [
    {
        id: 1,
        title: "Summer Sale Banner",
        link: "/summer-sale",
        imageUrl: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1729239445/slidersbanner/upglf2ndz3cgbfhnsgbk.webp",
        selected: false,
    },
    {
        id: 2,
        title: "Winter Sale Banner",
        link: "/winter-sale",
        imageUrl: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1729239665/slidersbanner/snfilzvqmzpj83ck2kmp.webp",
        selected: false,
    },
    {
        id: 3,
        title: "New Arrivals Banner",
        link: "/new-arrivals",
        imageUrl: "https://res.cloudinary.com/ddaef5aw1/image/upload/f_auto,q_auto/v1/slidersbanner/czo3frgxqtg7yaovwrga",
        selected: false,
    },
];

function NewBanner() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the banner ID from the URL
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        // If an ID is provided, fetch the banner data to pre-fill the form
        if (id) {
            const banner = data.find(b => b.id === parseInt(id));
            if (banner) {
                setTitle(banner.title);
                setLink(banner.link);
                setImages([{ file: null, preview: banner.imageUrl }]); // Set the image for preview
            }
        }
    }, [id]);

    // Handle drag and drop events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length > 0 && images.length === 0) {
            const previewFile = {
                file: validFiles[0],
                preview: URL.createObjectURL(validFiles[0]),
            };
            setImages([previewFile]);
            setErrors(prev => ({ ...prev, images: null }));
        } else if (images.length > 0) {
            setErrors(prev => ({ ...prev, images: "Only one image is allowed." }));
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length > 0 && images.length === 0) {
            const previewFile = {
                file: validFiles[0],
                preview: URL.createObjectURL(validFiles[0]),
            };
            setImages([previewFile]);
            setErrors(prev => ({ ...prev, images: null }));
        } else if (images.length > 0) {
            setErrors(prev => ({ ...prev, images: "Only one image is allowed." }));
        }
    };

    const handleClickToSelect = () => {
        fileInputRef.current.click();
    };

    const removeImage = () => {
        setImages([]);
        setErrors(prev => ({ ...prev, images: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (images.length === 0) {
            newErrors.images = "At least one image is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit form logic here
            if (id) {
                // Update logic
                console.log('Updating banner:', { id, title, link, imageUrl: images[0].preview });
            } else {
                // Create logic
                console.log('Creating banner:', { title, link, imageUrl: images[0].preview });
            }
            // After submission, navigate back or reset form
            navigate("/create-Banners");
        }
    };

    return (
        <div>
            <DashboardHeader />
            <div className="w-full flex justify-between">
                <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
                    <DashboardSideBar />
                </div>
                <div className="w-full m-5 shadow-lg border border-gray-200">
                    <div className="flex mt-4">
                        <div className="ml-4 flex items-center justify-start">
                            <div
                                className="bg-slate-700 rounded text-white flex items-center justify-center py-3 px-5 cursor-pointer"
                                onClick={() => navigate("/create-Banners")}
                            >
                                <IoMdArrowRoundBack />
                                <button className="ml-2">Go Back</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-[90%] m-4 shadow-md border border-gray-100 flex justify-between items-center px-3 py-3">
                            <h1 className="text-[18px] text-[#000000cf] pl-7">{id ? 'Edit Banner' : 'New Banner'}</h1>
                            <IoIosClose size={24} className="cursor-pointer" onClick={() => navigate("/create-Banners")} />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="mx-auto py-6 w-[90%] shadow-lg border border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center w-[100%] m-3 gap-4">
                                <div className="mb-2 w-[45%]">
                                    <label className="block text-sm text-gray-600 mb-2">Banner Title <span className='text-red-500'>*</span></label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Enter banner title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                                </div>

                                <div className="mb-2 w-[45%]">
                                    <label className="block text-sm text-gray-600 mb-2">Banner Link (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Enter link URL"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div className="m-3 mx-auto w-[90%]">
                                <div className="mb-5">
                                    <label className="block text-sm text-gray-600 mb-2">Upload Banner Image <span className='text-red-500'>*</span></label>

                                    {/* Drop zone */}
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={handleClickToSelect}
                                        className={`border-2 ${isDragging ? 'border-blue-600' : 'border-dashed border-gray-400'} rounded-lg p-6 cursor-pointer text-center bg-gray-50 hover:bg-gray-100 transition duration-300`}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                        />
                                        {/* Upload Icon */}
                                        <IoMdCloudUpload size={50} className="mx-auto text-gray-400 mb-3" />
                                        <p className="text-gray-600">Drag and drop an image here, or click to select a file</p>
                                    </div>
                                    {errors.images && <p className="text-red-600 text-sm">{errors.images}</p>}

                                    {images.length > 0 && (
                                        <div className="mt-4">
                                            <img
                                                src={images[0].preview}
                                                alt="Banner Preview"
                                                className="w-[320px] h-[200px] object-contain border border-gray-200 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="mt-2 text-red-600"
                                                onClick={removeImage}
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center mb-5">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-500 transition duration-300"
                                >
                                    {id ? 'Update Banner' : 'Create Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewBanner;
