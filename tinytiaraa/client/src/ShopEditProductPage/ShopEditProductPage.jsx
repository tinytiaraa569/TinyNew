
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { categoriesData } from '../static/data'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { createProduct, getAllProducts, updateProduct } from '../redux/actions/product'
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify'
import { BsDash } from "react-icons/bs";
import '../ShopCreateProductPage/createproduct.css'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TfiHandDrag } from 'react-icons/tfi'
import DashboardHeader from '@/ShopDashboardPage/DashboardHeader'
import { IoArrowBack } from 'react-icons/io5'
import { server } from '@/server'
import axios from 'axios'

function ShopEditProductPage() {
    const { seller } = useSelector((state) => state.seller)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(seller, "seller information")
    const { success, error, isLoading } = useSelector((state) => state.products)

    const { id } = useParams(); // Get the product ID from the URL
    console.log(id, "id");
    const { products } = useSelector((state) => state.products);

    const [selectedProduct, setSelectedProduct] = useState(null);



    useEffect(() => {
        // Filter out the selected product based on the ID
        if (products?.length > 0) {
            const product = products.find(product => product?._id === id);
            setSelectedProduct(product);
        }
    }, [products, id]);

    // Log the selected product details
    console.log(selectedProduct, "selcetd products");
    // Load products if not already available
    useEffect(() => {
        if (products?.length === 0) {
            dispatch(getAllProducts(seller._id));
        }
    }, [dispatch, products, seller._id]);

    // Prefill form with selected product details




    const [name, setName] = useState("")
    const [skuid, setSkuid] = useState("")

    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("");

    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    const [stock, setStock] = useState("")
    const [designno, setDesignno] = useState("")



    const [images, setImages] = useState([])

    const [showWithChainImages, setShowWithChainImages] = useState(false);
    const [showWithoutChainImages, setShowWithoutChainImages] = useState(false);


    const [withchainimages, setwithchainImages] = useState([])
    const [withchainoutimages, setwithchainoutImages] = useState([])


    const [showWithYellowclrImages, setShowWithYellowclrImages] = useState(false);

    const [YellowGoldclr, setYellowGoldclr] = useState([])


    const [showWithRoseclrImages, setShowWithRoseclrImages] = useState(false);

    const [RoseGoldclr, setRoseGoldclr] = useState([])


    // whitegold

    const [showWithWhiteclrImages, setShowWithWhiteclrImages] = useState(false);

    const [WhiteGoldclr, setWhiteGoldclr] = useState([])



    //weight states 

    const [goldWeight, setGoldWeight] = useState({ weight: '', purity: '' });
    const [diamondWeight, setDiamondWeight] = useState({ weight: '', quality: '' });
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');



    const handleAddChain = () => {
        // Logic to gather chain data and update state or perform actions
        console.log("Adding Chain Data:", {
            withchainimages,
            withchainoutimages,
            // Include other relevant data as needed
        });
    };





    // useEffect(() => {

    //     if (error) {
    //         toast.error(error)
    //     }
    //     if (success) {
    //         toast.success("Product Created successfully")
    //         navigate("/dashboard-products")
    //         window.location.reload()
    //     }

    // }, [dispatch, error, success])


    const handleImageChange = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);

        // setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    const handlewithImageChange = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        // setwithchainImages([]);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setwithchainImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    const handlewithoutImageChange = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        // setwithchainoutImages([]);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setwithchainoutImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });


    }


    const handleToggleWithChainImages = () => {
        setShowWithChainImages(!showWithChainImages);
    };

    const handleToggleWithoutChainImages = () => {
        setShowWithoutChainImages(!showWithoutChainImages);
    };


    const handleDeleteWithChainImage = (index) => {
        const updatedImages = [...withchainimages];
        updatedImages.splice(index, 1);
        setwithchainImages(updatedImages);
    };

    const handleDeleteWithoutChainImage = (index) => {
        const updatedImages = [...withchainoutimages];
        updatedImages.splice(index, 1);
        setwithchainoutImages(updatedImages);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const foundCategory = categoriesData.find((cat) => cat.title === selectedCategory);
        if (foundCategory) {
            setCategory(selectedCategory);
            // Clear subcategory when category changes
            setSubcategory("");
        } else {
            setCategory("");
            setSubcategory("");
        }
    };

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    };


    const toggleShowImages = (type) => {
        if (type === 'withchain') {
            setShowWithChainImages(!showWithChainImages);
        } else if (type === 'withoutchain') {
            setShowWithoutChainImages(!showWithoutChainImages);
        }
    };

    // metal color
    // yellow color
    const handlewithYellowclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        // setYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }


    const handleToggleWithYellowclr = () => {
        setShowWithYellowclrImages(!showWithYellowclrImages);
    };

    const handleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...YellowGoldclr];
        updatedImages.splice(index, 1);
        setYellowGoldclr(updatedImages);
    };
    const handleDragStartYellowGold = (e, index) => {
        setDraggingIndex(index);
    };

    const handleDropYellowGold = (e, dropIndex) => {
        const draggedImage = YellowGoldclr[draggingIndex];
        const remainingImages = YellowGoldclr.filter((_, i) => i !== draggingIndex);
        const updatedImages = [
            ...remainingImages.slice(0, dropIndex),
            draggedImage,
            ...remainingImages.slice(dropIndex),
        ];

        setYellowGoldclr(updatedImages);
        setDraggingIndex(null);
    };


    // Rose color

    const handlewithRoseclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        // setRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }

    const handleToggleWithRoseclr = () => {
        setShowWithRoseclrImages(!showWithRoseclrImages);
    };

    const handleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...RoseGoldclr];
        updatedImages.splice(index, 1);
        setRoseGoldclr(updatedImages);
    };

    const handleDragStartRoseGold = (e, index) => {
        setDraggingIndex(index);
    };

    const handleDropRoseGold = (e, dropIndex) => {
        const draggedImage = RoseGoldclr[draggingIndex];
        const remainingImages = RoseGoldclr.filter((_, i) => i !== draggingIndex);
        const updatedImages = [
            ...remainingImages.slice(0, dropIndex),
            draggedImage,
            ...remainingImages.slice(dropIndex),
        ];

        setRoseGoldclr(updatedImages);
        setDraggingIndex(null);
    };


    // white color
    const handlewithWhiteclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        // setWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }

    const handleToggleWithWhiteclr = () => {
        setShowWithWhiteclrImages(!showWithRoseclrImages);
    };

    const handleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...WhiteGoldclr];
        updatedImages.splice(index, 1);
        setWhiteGoldclr(updatedImages);
    };
    const handleDragStartWhiteGold = (e, index) => {
        setDraggingIndex(index);
    };

    const handleDropWhiteGold = (e, dropIndex) => {
        const draggedImage = WhiteGoldclr[draggingIndex];
        const remainingImages = WhiteGoldclr.filter((_, i) => i !== draggingIndex);
        const updatedImages = [
            ...remainingImages.slice(0, dropIndex),
            draggedImage,
            ...remainingImages.slice(dropIndex),
        ];

        setWhiteGoldclr(updatedImages);
        setDraggingIndex(null);
    };


    const handleAddMetalColor = () => {
        console.log(YellowGoldclr, WhiteGoldclr, RoseGoldclr)
    }

    const toggleShowImagesColor = (type) => {
        if (type === 'yellowcolor') {
            setShowWithYellowclrImages(!showWithYellowclrImages);

        } else if (type === 'rosecolor') {
            setShowWithRoseclrImages(!showWithRoseclrImages);

        }
        else if (type === 'whitecolor') {
            setShowWithWhiteclrImages(!showWithWhiteclrImages);

        }
    };




    // enamel Color

    // deepblue

    const [deepblueshowWithYellowclrImages, deepbluesetShowWithYellowclrImages] = useState(false);

    const [deepblueYellowGoldclr, deepbluesetYellowGoldclr] = useState([])
    const deepbluehandlewithYellowclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        deepbluesetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepbluesetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }


    const deepbluehandleToggleWithYellowclr = () => {
        deepbluesetShowWithYellowclrImages(!deepblueshowWithYellowclrImages);
    };

    const deepbluehandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...deepblueYellowGoldclr];
        updatedImages.splice(index, 1);
        deepbluesetYellowGoldclr(updatedImages);
    };


    //deepblue rose gold

    const [deepblueshowWithRoseclrImages, deepbluesetShowWithRoseclrImages] = useState(false);

    const [deepblueRoseGoldclr, deepbluesetRoseGoldclr] = useState([])


    const deepbluehandlewithRoseclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        deepbluesetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepbluesetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }

    const deepbluehandleToggleWithRoseclr = () => {
        deepbluesetShowWithRoseclrImages(!deepblueshowWithRoseclrImages);
    };

    const deepbluehandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...deepblueRoseGoldclr];
        updatedImages.splice(index, 1);
        deepbluesetRoseGoldclr(updatedImages);
    };

    //deepblue white gold

    const [deepblueshowWithWhiteclrImages, deepbluesetShowWithWhiteclrImages] = useState(false);

    const [deepblueWhiteGoldclr, deepbluesetWhiteGoldclr] = useState([])


    const deepbluehandlewithWhiteclr = (e) => {
        e.preventDefault()

        const files = Array.from(e.target.files);
        deepbluesetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepbluesetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

    }

    const deepbluehandleToggleWithWhiteclr = () => {
        deepbluesetShowWithWhiteclrImages(!deepblueshowWithRoseclrImages);
    };

    const deepbluehandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...deepblueWhiteGoldclr];
        updatedImages.splice(index, 1);
        deepbluesetWhiteGoldclr(updatedImages);
    };



    // ------------- pink color -----------
    // Pink states and handlers
    const [pinkshowWithYellowclrImages, pinksetShowWithYellowclrImages] = useState(false);
    const [pinkYellowGoldclr, pinksetYellowGoldclr] = useState([]);
    const pinkhandlewithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        pinksetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    pinksetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const pinkhandleToggleWithYellowclr = () => {
        pinksetShowWithYellowclrImages(!pinkshowWithYellowclrImages);
    };
    const pinkhandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...pinkYellowGoldclr];
        updatedImages.splice(index, 1);
        pinksetYellowGoldclr(updatedImages);
    };

    // Pink Rose Gold
    const [pinkshowWithRoseclrImages, pinksetShowWithRoseclrImages] = useState(false);
    const [pinkRoseGoldclr, pinksetRoseGoldclr] = useState([]);
    const pinkhandlewithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        pinksetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    pinksetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const pinkhandleToggleWithRoseclr = () => {
        pinksetShowWithRoseclrImages(!pinkshowWithRoseclrImages);
    };
    const pinkhandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...pinkRoseGoldclr];
        updatedImages.splice(index, 1);
        pinksetRoseGoldclr(updatedImages);
    };

    // Pink White Gold
    const [pinkshowWithWhiteclrImages, pinksetShowWithWhiteclrImages] = useState(false);
    const [pinkWhiteGoldclr, pinksetWhiteGoldclr] = useState([]);
    const pinkhandlewithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        pinksetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    pinksetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const pinkhandleToggleWithWhiteclr = () => {
        pinksetShowWithWhiteclrImages(!pinkshowWithWhiteclrImages);
    };
    const pinkhandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...pinkWhiteGoldclr];
        updatedImages.splice(index, 1);
        pinksetWhiteGoldclr(updatedImages);
    };

    // ------------- pink color -----------



    // ------------- turquoise color -----------

    // Turquoise states and handlers
    const [turquoiseshowWithYellowclrImages, turquoisesetShowWithYellowclrImages] = useState(false);
    const [turquoiseYellowGoldclr, turquoisesetYellowGoldclr] = useState([]);
    const turquoisehandlewithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        turquoisesetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    turquoisesetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const turquoisehandleToggleWithYellowclr = () => {
        turquoisesetShowWithYellowclrImages(!turquoiseshowWithYellowclrImages);
    };
    const turquoisehandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...turquoiseYellowGoldclr];
        updatedImages.splice(index, 1);
        turquoisesetYellowGoldclr(updatedImages);
    };

    // Turquoise Rose Gold
    const [turquoiseshowWithRoseclrImages, turquoisesetShowWithRoseclrImages] = useState(false);
    const [turquoiseRoseGoldclr, turquoisesetRoseGoldclr] = useState([]);
    const turquoisehandlewithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        turquoisesetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    turquoisesetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const turquoisehandleToggleWithRoseclr = () => {
        turquoisesetShowWithRoseclrImages(!turquoiseshowWithRoseclrImages);
    };
    const turquoisehandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...turquoiseRoseGoldclr];
        updatedImages.splice(index, 1);
        turquoisesetRoseGoldclr(updatedImages);
    };

    // Turquoise White Gold
    const [turquoiseshowWithWhiteclrImages, turquoisesetShowWithWhiteclrImages] = useState(false);
    const [turquoiseWhiteGoldclr, turquoisesetWhiteGoldclr] = useState([]);
    const turquoisehandlewithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        turquoisesetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    turquoisesetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const turquoisehandleToggleWithWhiteclr = () => {
        turquoisesetShowWithWhiteclrImages(!turquoiseshowWithWhiteclrImages);
    };
    const turquoisehandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...turquoiseWhiteGoldclr];
        updatedImages.splice(index, 1);
        turquoisesetWhiteGoldclr(updatedImages);
    };
    // ------------- turquoise color -----------


    // ------------- red color -----------

    // Red states and handlers
    const [redshowWithYellowclrImages, redsetShowWithYellowclrImages] = useState(false);
    const [redYellowGoldclr, redsetYellowGoldclr] = useState([]);
    const redhandlewithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        redsetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    redsetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const redhandleToggleWithYellowclr = () => {
        redsetShowWithYellowclrImages(!redshowWithYellowclrImages);
    };
    const redhandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...redYellowGoldclr];
        updatedImages.splice(index, 1);
        redsetYellowGoldclr(updatedImages);
    };

    // Red Rose Gold
    const [redshowWithRoseclrImages, redsetShowWithRoseclrImages] = useState(false);
    const [redRoseGoldclr, redsetRoseGoldclr] = useState([]);
    const redhandlewithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        redsetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    redsetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const redhandleToggleWithRoseclr = () => {
        redsetShowWithRoseclrImages(!redshowWithRoseclrImages);
    };
    const redhandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...redRoseGoldclr];
        updatedImages.splice(index, 1);
        redsetRoseGoldclr(updatedImages);
    };

    // Red White Gold
    const [redshowWithWhiteclrImages, redsetShowWithWhiteclrImages] = useState(false);
    const [redWhiteGoldclr, redsetWhiteGoldclr] = useState([]);
    const redhandlewithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        redsetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    redsetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const redhandleToggleWithWhiteclr = () => {
        redsetShowWithWhiteclrImages(!redshowWithWhiteclrImages);
    };
    const redhandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...redWhiteGoldclr];
        updatedImages.splice(index, 1);
        redsetWhiteGoldclr(updatedImages);
    };



    // ------------- red color -----------

    // ------------- black color -----------

    // Black states and handlers
    const [blackshowWithYellowclrImages, blacksetShowWithYellowclrImages] = useState(false);
    const [blackYellowGoldclr, blacksetYellowGoldclr] = useState([]);
    const blackhandlewithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        blacksetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    blacksetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const blackhandleToggleWithYellowclr = () => {
        blacksetShowWithYellowclrImages(!blackshowWithYellowclrImages);
    };
    const blackhandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...blackYellowGoldclr];
        updatedImages.splice(index, 1);
        blacksetYellowGoldclr(updatedImages);
    };

    // Black Rose Gold
    const [blackshowWithRoseclrImages, blacksetShowWithRoseclrImages] = useState(false);
    const [blackRoseGoldclr, blacksetRoseGoldclr] = useState([]);
    const blackhandlewithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        blacksetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    blacksetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const blackhandleToggleWithRoseclr = () => {
        blacksetShowWithRoseclrImages(!blackshowWithRoseclrImages);
    };
    const blackhandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...blackRoseGoldclr];
        updatedImages.splice(index, 1);
        blacksetRoseGoldclr(updatedImages);
    };

    // Black White Gold
    const [blackshowWithWhiteclrImages, blacksetShowWithWhiteclrImages] = useState(false);
    const [blackWhiteGoldclr, blacksetWhiteGoldclr] = useState([]);
    const blackhandlewithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        blacksetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    blacksetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const blackhandleToggleWithWhiteclr = () => {
        blacksetShowWithWhiteclrImages(!blackshowWithWhiteclrImages);
    };
    const blackhandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...blackWhiteGoldclr];
        updatedImages.splice(index, 1);
        blacksetWhiteGoldclr(updatedImages);
    };


    // ------------- black color -----------


    // ------------- Deep Green color -----------

    // Deep Green states and handlers
    const [deepgreenShowWithYellowclrImages, deepgreenSetShowWithYellowclrImages] = useState(false);
    const [deepgreenYellowGoldclr, deepgreenSetYellowGoldclr] = useState([]);
    const deepgreenHandleWithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        deepgreenSetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepgreenSetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const deepgreenHandleToggleWithYellowclr = () => {
        deepgreenSetShowWithYellowclrImages(!deepgreenShowWithYellowclrImages);
    };
    const deepgreenHandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...deepgreenYellowGoldclr];
        updatedImages.splice(index, 1);
        deepgreenSetYellowGoldclr(updatedImages);
    };

    // Deep green Rose Gold
    const [deepgreenShowWithRoseclrImages, deepgreenSetShowWithRoseclrImages] = useState(false);
    const [deepgreenRoseGoldclr, deepgreenSetRoseGoldclr] = useState([]);
    const deepgreenHandleWithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        deepgreenSetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepgreenSetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const deepgreenHandleToggleWithRoseclr = () => {
        deepgreenSetShowWithRoseclrImages(!deepgreenShowWithRoseclrImages);
    };
    const deepgreenHandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...deepgreenRoseGoldclr];
        updatedImages.splice(index, 1);
        deepgreenSetRoseGoldclr(updatedImages);
    };

    // Deep green White Gold
    const [deepgreenShowWithWhiteclrImages, deepgreenSetShowWithWhiteclrImages] = useState(false);
    const [deepgreenWhiteGoldclr, deepgreenSetWhiteGoldclr] = useState([]);
    const deepgreenHandleWithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        deepgreenSetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    deepgreenSetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const deepgreenHandleToggleWithWhiteclr = () => {
        deepgreenSetShowWithWhiteclrImages(!deepgreenShowWithWhiteclrImages);
    };
    const deepgreenHandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...deepgreenWhiteGoldclr];
        updatedImages.splice(index, 1);
        deepgreenSetWhiteGoldclr(updatedImages);
    };



    // ------------- Lotus Green color -----------

    // Lotus Green states and handlers
    const [lotusgreenShowWithYellowclrImages, lotusgreenSetShowWithYellowclrImages] = useState(false);
    const [lotusgreenYellowGoldclr, lotusgreenSetYellowGoldclr] = useState([]);
    const lotusgreenHandleWithYellowclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        lotusgreenSetYellowGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    lotusgreenSetYellowGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const lotusgreenHandleToggleWithYellowclr = () => {
        lotusgreenSetShowWithYellowclrImages(!lotusgreenShowWithYellowclrImages);
    };
    const lotusgreenHandleDeleteWithYellowclrImage = (index) => {
        const updatedImages = [...lotusgreenYellowGoldclr];
        updatedImages.splice(index, 1);
        lotusgreenSetYellowGoldclr(updatedImages);
    };

    // Lotus green Rose Gold
    const [lotusgreenShowWithRoseclrImages, lotusgreenSetShowWithRoseclrImages] = useState(false);
    const [lotusgreenRoseGoldclr, lotusgreenSetRoseGoldclr] = useState([]);
    const lotusgreenHandleWithRoseclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        lotusgreenSetRoseGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    lotusgreenSetRoseGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const lotusgreenHandleToggleWithRoseclr = () => {
        lotusgreenSetShowWithRoseclrImages(!lotusgreenShowWithRoseclrImages);
    };
    const lotusgreenHandleDeleteWithRoseclrImage = (index) => {
        const updatedImages = [...lotusgreenRoseGoldclr];
        updatedImages.splice(index, 1);
        lotusgreenSetRoseGoldclr(updatedImages);
    };

    // Lotus green White Gold
    const [lotusgreenShowWithWhiteclrImages, lotusgreenSetShowWithWhiteclrImages] = useState(false);
    const [lotusgreenWhiteGoldclr, lotusgreenSetWhiteGoldclr] = useState([]);
    const lotusgreenHandleWithWhiteclr = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        lotusgreenSetWhiteGoldclr([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    lotusgreenSetWhiteGoldclr((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const lotusgreenHandleToggleWithWhiteclr = () => {
        lotusgreenSetShowWithWhiteclrImages(!lotusgreenShowWithWhiteclrImages);
    };
    const lotusgreenHandleDeleteWithWhiteclrImage = (index) => {
        const updatedImages = [...lotusgreenWhiteGoldclr];
        updatedImages.splice(index, 1);
        lotusgreenSetWhiteGoldclr(updatedImages);
    };


    //drag for images 
    const [draggingIndex, setDraggingIndex] = useState(null);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
        setDraggingIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData('text/plain');
        if (fromIndex === index) return;

        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(index, 0, movedImage);

        setImages(updatedImages);
        setDraggingIndex(null); // Reset dragging index
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };


    //drag for with & without change


    const [draggingIndexWithChain, setDraggingIndexWithChain] = useState(null);
    const [draggingIndexWithoutChain, setDraggingIndexWithoutChain] = useState(null);

    const handleDragStartWithChain = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
        setDraggingIndexWithChain(index);
    };

    const handleDragStartWithoutChain = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
        setDraggingIndexWithoutChain(index);
    };



    const handleDropWithChain = (e, index) => {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData('text/plain');
        if (fromIndex === index) return;

        const updatedImages = [...withchainimages];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(index, 0, movedImage);

        setwithchainImages(updatedImages);
        setDraggingIndexWithChain(null); // Reset dragging index
    };

    const handleDropWithoutChain = (e, index) => {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData('text/plain');
        if (fromIndex === index) return;

        const updatedImages = [...withchainoutimages];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(index, 0, movedImage);

        setwithchainoutImages(updatedImages);
        setDraggingIndexWithoutChain(null); // Reset dragging index
    };


    // stocks related code 
    const [YellowGoldclrStock, setYellowGoldclrStock] = useState('');
    const [RoseGoldclrStock, setRoseGoldclrStock] = useState('');
    const [WhiteGoldclrStock, setWhiteGoldclrStock] = useState('');

    // stock


    //enamel blue color stock
    const [deepblueYellowGoldclrStock, setdeepbluesetYellowGoldclrStock] = useState('');
    const [deepblueRoseGoldclrStock, setdeepbluesetRoseGoldclrStock] = useState('');
    const [deepblueWhiteGoldclrStock, setdeepbluesetWhiteGoldclrStock] = useState('');

    //enamel pink color stock
    const [pinkYellowGoldclrStock, setpinksetYellowGoldclrStock] = useState('');
    const [pinkRoseGoldclrStock, setpinksetRoseGoldclrStock] = useState('');
    const [pinkWhiteGoldclrStock, setpinksetWhiteGoldclrStock] = useState('');

    // turquoise emanel stock

    const [turquoiseYellowGoldclrStock, setturquoisesetYellowGoldclrStock] = useState('');
    const [turquoiseRoseGoldclrStock, setturquoisesetRoseGoldclrStock] = useState('');
    const [turquoiseWhiteGoldclrStock, setturquoisesetWhiteGoldclrStock] = useState('');

    // red emanel stock

    const [redYellowGoldclrStock, setredYellowGoldclrStock] = useState('');
    const [redRoseGoldclrStock, setredRoseGoldclrStock] = useState('');
    const [redWhiteGoldclrStock, setredWhiteGoldclrStock] = useState('');

    // black emanel stock

    const [blackYellowGoldclrStock, setblackYellowGoldclrStock] = useState('');
    const [blackRoseGoldclrStock, setblackRoseGoldclrStock] = useState('');
    const [blackWhiteGoldclrStock, setblackWhiteGoldclrStock] = useState('');

    // deepgreen emanel stock

    const [deepgreenYellowGoldclrStock, setdeepgreenYellowGoldclrStock] = useState('');
    const [deepgreenRoseGoldclrStock, setdeepgreenRoseGoldclrStock] = useState('');
    const [deepgreenWhiteGoldclrStock, setdeepgreenWhiteGoldclrStock] = useState('');

    // lotusgreen emanel stock

    const [lotusgreenYellowGoldclrStock, setlotusgreenYellowGoldclrStock] = useState('');
    const [lotusgreenRoseGoldclrStock, setlotusgreenRoseGoldclrStock] = useState('');
    const [lotusgreenWhiteGoldclrStock, setlotusgreenWhiteGoldclrStock] = useState('');



    const [gender, setGender] = useState({
        girl: false,
        boy: false,
        unisex: false,
    });
    const [ageGroup, setAgeGroup] = useState({
        infants: false,
        kids: false,
        teens: false,
        mom: false,
    });


    useEffect(() => {
        if (products?.length > 0) {
            const product = products.find(product => product._id === id);

            console.log(product, "product filterd")
            if (product) {
                setName(product.name);
                console.log("Name:", product.name);
                setSkuid(product.skuid);
                setDescription(product.description);
                setCategory(product.category);
                setSubcategory(product.subcategory);
                setTags(product.tags);
                setOriginalPrice(product.originalPrice);
                setDiscountPrice(product.discountPrice);
                setStock(product.stock);
                setDesignno(product.designno);
                setImages(product.images); // Update this if needed
                setGoldWeight({ weight: product.goldWeight.weight, purity: product.goldWeight.purity });
                setDiamondWeight({ weight: product.diamondWeight.weight, quality: product.diamondWeight.quality });
                setHeight(product.dimension.height);
                setWidth(product.dimension.width);

                // Initialize age group
                setAgeGroup(product.ageGroup);

                // Initialize gender
                setGender(product.gender);

                // chain without

                setwithchainImages(product?.withchainimages); // Update this if needed
                setwithchainoutImages(product?.withchainoutimages); // Update this if needed

                // metalcolor
                setYellowGoldclr(product.MetalColor?.YellowGoldclr);
                setRoseGoldclr(product.MetalColor?.RoseGoldclr);
                setWhiteGoldclr(product.MetalColor?.WhiteGoldclr);

                setYellowGoldclrStock(product.Metalcolorstock?.YellowGoldclrStock || null);
                setRoseGoldclrStock(product.Metalcolorstock?.RoseGoldclrStock || null);
                setWhiteGoldclrStock(product.Metalcolorstock?.WhiteGoldclrStock || null);



                if (product.enamelColors) {
                    deepbluesetYellowGoldclr(product.enamelColors.Deep_Blue?.deepblueYellowGoldclr || []);
                    deepbluesetRoseGoldclr(product.enamelColors.Deep_Blue?.deepblueRoseGoldclr || []);
                    deepbluesetWhiteGoldclr(product.enamelColors.Deep_Blue?.deepblueWhiteGoldclr || []);

                    pinksetYellowGoldclr(product.enamelColors.Pink?.pinkYellowGoldclr || []);
                    pinksetRoseGoldclr(product.enamelColors.Pink?.pinkRoseGoldclr || []);
                    pinksetWhiteGoldclr(product.enamelColors.Pink?.pinkWhiteGoldclr || []);

                    turquoisesetYellowGoldclr(product.enamelColors.Turquoise?.turquoiseYellowGoldclr || []);
                    turquoisesetRoseGoldclr(product.enamelColors.Turquoise?.turquoiseRoseGoldclr || []);
                    turquoisesetWhiteGoldclr(product.enamelColors.Turquoise?.turquoiseWhiteGoldclr || []);

                    redsetYellowGoldclr(product.enamelColors.Red?.redYellowGoldclr || []);
                    redsetRoseGoldclr(product.enamelColors.Red?.redRoseGoldclr || []);
                    redsetWhiteGoldclr(product.enamelColors.Red?.redWhiteGoldclr || []);

                    blacksetYellowGoldclr(product.enamelColors.Black?.blackYellowGoldclr || []);
                    blacksetRoseGoldclr(product.enamelColors.Black?.blackRoseGoldclr || []);
                    blacksetWhiteGoldclr(product.enamelColors.Black?.blackWhiteGoldclr || []);

                    deepgreenSetYellowGoldclr(product.enamelColors.Deep_Green?.deepgreenYellowGoldclr || []);
                    deepgreenSetRoseGoldclr(product.enamelColors.Deep_Green?.deepgreenRoseGoldclr || []);
                    deepgreenSetWhiteGoldclr(product.enamelColors.Deep_Green?.deepgreenWhiteGoldclr || []);

                    lotusgreenSetYellowGoldclr(product.enamelColors.Lotus_Green?.lotusgreenYellowGoldclr || []);
                    lotusgreenSetRoseGoldclr(product.enamelColors.Lotus_Green?.lotusgreenRoseGoldclr || []);
                    lotusgreenSetWhiteGoldclr(product.enamelColors.Lotus_Green?.lotusgreenWhiteGoldclr || []);




                    // stocks for enamel
                    setdeepbluesetYellowGoldclrStock(product.Enamelcolorstock.deepblue?.deepblueYellowGoldclrStock || '');
                    setdeepbluesetRoseGoldclrStock(product.Enamelcolorstock.deepblue?.deepblueRoseGoldclrStock || '');
                    setdeepbluesetWhiteGoldclrStock(product.Enamelcolorstock.deepblue?.deepblueWhiteGoldclrStock || '');

                    setpinksetYellowGoldclrStock(product.Enamelcolorstock.pink?.pinkYellowGoldclrStock || '');
                    setpinksetRoseGoldclrStock(product.Enamelcolorstock.pink?.pinkRoseGoldclrStock || '');
                    setpinksetWhiteGoldclrStock(product.Enamelcolorstock.pink?.pinkWhiteGoldclrStock || '');

                    setturquoisesetYellowGoldclrStock(product.Enamelcolorstock.turquoise?.turquoiseYellowGoldclrStock || '');
                    setturquoisesetRoseGoldclrStock(product.Enamelcolorstock.turquoise?.turquoiseRoseGoldclrStock || '');
                    setturquoisesetWhiteGoldclrStock(product.Enamelcolorstock.turquoise?.turquoiseWhiteGoldclrStock || '');

                    setredYellowGoldclrStock(product.Enamelcolorstock.red?.redYellowGoldclrStock || '');
                    setredRoseGoldclrStock(product.Enamelcolorstock.red?.redRoseGoldclrStock || '');
                    setredWhiteGoldclrStock(product.Enamelcolorstock.red?.redWhiteGoldclrStock || '');

                    setblackYellowGoldclrStock(product.Enamelcolorstock.black?.blackYellowGoldclrStock || '');
                    setblackRoseGoldclrStock(product.Enamelcolorstock.black?.blackRoseGoldclrStock || '');
                    setblackWhiteGoldclrStock(product.Enamelcolorstock.black?.blackWhiteGoldclrStock || '');

                    setdeepgreenYellowGoldclrStock(product.Enamelcolorstock.deepgreen?.deepgreenYellowGoldclrStock || '');
                    setdeepgreenRoseGoldclrStock(product.Enamelcolorstock.deepgreen?.deepgreenRoseGoldclrStock || '');
                    setdeepgreenWhiteGoldclrStock(product.Enamelcolorstock.deepgreen?.deepgreenWhiteGoldclrStock || '');

                    setlotusgreenYellowGoldclrStock(product.Enamelcolorstock.lotusgreen?.lotusgreenYellowGoldclrStock || '');
                    setlotusgreenRoseGoldclrStock(product.Enamelcolorstock.lotusgreen?.lotusgreenRoseGoldclrStock || '');
                    setlotusgreenWhiteGoldclrStock(product.Enamelcolorstock.lotusgreen?.lotusgreenWhiteGoldclrStock || '');


                }
            }
        }
    }, [products, id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const newForm = new FormData()

        images.forEach((image) => {
            newForm.set("images", image);
        });

        withchainimages.forEach((image) => {
            newForm.set("withchainimages", image)
        })

        withchainoutimages.forEach((image) => {
            newForm.set("withchainoutimages", image)
        })


        YellowGoldclr.forEach((image) => {
            newForm.set("YellowGoldclr", image)

        })
        RoseGoldclr.forEach((image) => {
            newForm.set("RoseGoldclr", image)

        })
        WhiteGoldclr.forEach((image) => {
            newForm.set("WhiteGoldclr", image)

        })








        //enamel 
        deepblueYellowGoldclr.forEach((image) => {
            newForm.set("deepblueYellowGoldclr", image)
        })
        deepblueRoseGoldclr.forEach((image) => {
            newForm.set("deepblueRoseGoldclr", image)
        })
        deepblueWhiteGoldclr.forEach((image) => {
            newForm.set("deepblueWhiteGoldclr", image)
        })

        pinkYellowGoldclr.forEach((image) => {
            newForm.set("pinkYellowGoldclr", image);
        });
        pinkRoseGoldclr.forEach((image) => {
            newForm.set("pinkRoseGoldclr", image);
        });
        pinkWhiteGoldclr.forEach((image) => {
            newForm.set("pinkWhiteGoldclr", image);
        });

        // For Turquoise
        turquoiseYellowGoldclr.forEach((image) => {
            newForm.set("turquoiseYellowGoldclr", image);
        });
        turquoiseRoseGoldclr.forEach((image) => {
            newForm.set("turquoiseRoseGoldclr", image);
        });
        turquoiseWhiteGoldclr.forEach((image) => {
            newForm.set("turquoiseWhiteGoldclr", image);
        });

        // For Red
        redYellowGoldclr.forEach((image) => {
            newForm.set("redYellowGoldclr", image);
        });
        redRoseGoldclr.forEach((image) => {
            newForm.set("redRoseGoldclr", image);
        });
        redWhiteGoldclr.forEach((image) => {
            newForm.set("redWhiteGoldclr", image);
        });

        // For Black
        blackYellowGoldclr.forEach((image) => {
            newForm.set("blackYellowGoldclr", image);
        });
        blackRoseGoldclr.forEach((image) => {
            newForm.set("blackRoseGoldclr", image);
        });
        blackWhiteGoldclr.forEach((image) => {
            newForm.set("blackWhiteGoldclr", image);
        });


        // For Deep Green
        deepgreenYellowGoldclr.forEach((image) => {
            newForm.set("deepgreenYellowGoldclr", image);
        });
        deepgreenRoseGoldclr.forEach((image) => {
            newForm.set("deepgreenRoseGoldclr", image);
        });
        deepgreenWhiteGoldclr.forEach((image) => {
            newForm.set("deepgreenWhiteGoldclr", image);
        });

        // For Lotus green
        lotusgreenYellowGoldclr.forEach((image) => {
            newForm.set("lotusgreenYellowGoldclr", image);
        });
        lotusgreenRoseGoldclr.forEach((image) => {
            newForm.set("lotusgreenRoseGoldclr", image);
        });
        lotusgreenWhiteGoldclr.forEach((image) => {
            newForm.set("lotusgreenWhiteGoldclr", image);
        });







        newForm.append("name", name)
        newForm.append("skuid", skuid)
        newForm.append("description", description)
        newForm.append("category", category)
        newForm.append("subcategory", subcategory)
        newForm.append("tags", tags)
        newForm.append("originalPrice", originalPrice)
        newForm.append("discountPrice", discountPrice)
        newForm.append("stock", stock)
        newForm.append("shopId", seller._id)

        newForm.append("designno", designno)
        newForm.append("gender", gender);
        newForm.append("ageGroup", ageGroup);




        // weight

        newForm.append('goldWeight.weight', goldWeight.weight);
        newForm.append('goldWeight.purity', goldWeight.purity);
        newForm.append('diamondWeight.weight', diamondWeight.weight);
        newForm.append('diamondWeight.quality', diamondWeight.quality);
        newForm.append('dimension.height', height);
        newForm.append('dimension.width', width);

        newForm.append("YellowGoldclrStock", YellowGoldclrStock);
        newForm.append("RoseGoldclrStock", RoseGoldclrStock);
        newForm.append("WhiteGoldclrStock", WhiteGoldclrStock);


        newForm.append("deepblueYellowGoldclrStock", deepblueYellowGoldclrStock);
        newForm.append("deepblueRoseGoldclrStock", deepblueRoseGoldclrStock);
        newForm.append("deepblueWhiteGoldclrStock", deepblueWhiteGoldclrStock);

        // pink emanel stock
        newForm.append("pinkYellowGoldclrStock", pinkYellowGoldclrStock);
        newForm.append("pinkRoseGoldclrStock", pinkRoseGoldclrStock);
        newForm.append("pinkWhiteGoldclrStock", pinkWhiteGoldclrStock);

        // turquoise emanel stock
        newForm.append("turquoiseYellowGoldclrStock", turquoiseYellowGoldclrStock);
        newForm.append("turquoiseRoseGoldclrStock", turquoiseRoseGoldclrStock);
        newForm.append("turquoiseWhiteGoldclrStock", turquoiseWhiteGoldclrStock);

        // red emanel stock
        newForm.append("redYellowGoldclrStock", redYellowGoldclrStock);
        newForm.append("redRoseGoldclrStock", redRoseGoldclrStock);
        newForm.append("redWhiteGoldclrStock", redWhiteGoldclrStock);



        // deepgreen emanel stock
        newForm.append("deepgreenYellowGoldclrStock", deepgreenYellowGoldclrStock);
        newForm.append("deepgreenRoseGoldclrStock", deepgreenRoseGoldclrStock);
        newForm.append("deepgreenWhiteGoldclrStock", deepgreenWhiteGoldclrStock)

        // lotusgreen emanel stock
        newForm.append("lotusgreenYellowGoldclrStock", lotusgreenYellowGoldclrStock);
        newForm.append("lotusgreenRoseGoldclrStock", lotusgreenRoseGoldclrStock);
        newForm.append("lotusgreenWhiteGoldclrStock", lotusgreenWhiteGoldclrStock)

        const dimension = {
            height: height,
            width: width
        };


        console.log("Product Details:", {
            id,
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId: seller?._id,
            goldWeight,
            diamondWeight,
            dimension: {
                height,
                width
            },
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,
            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,
            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,
            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,
            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,
            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup
        });

      
        dispatch(updateProduct({
            id,
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId: seller?._id,
            goldWeight,
            diamondWeight,
            dimension: {
                height,
                width
            },
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,
            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,
            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,
            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,
            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,
            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup
        }))





    }


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const newForm = new FormData();

//             // Append images
//             images.forEach((image) => newForm.append("images", image));
//             withchainimages.forEach((image) => newForm.append("withchainimages", image));
//             withchainoutimages.forEach((image) => newForm.append("withchainoutimages", image));

//             // Append metal color images
//             YellowGoldclr.forEach((image) => newForm.append("YellowGoldclr", image));
//             RoseGoldclr.forEach((image) => newForm.append("RoseGoldclr", image));
//             WhiteGoldclr.forEach((image) => newForm.append("WhiteGoldclr", image));

//             // Append enamel color images
//             deepblueYellowGoldclr.forEach((image) => newForm.append("deepblueYellowGoldclr", image));
//             deepblueRoseGoldclr.forEach((image) => newForm.append("deepblueRoseGoldclr", image));
//             deepblueWhiteGoldclr.forEach((image) => newForm.append("deepblueWhiteGoldclr", image));
//             pinkYellowGoldclr.forEach((image) => newForm.append("pinkYellowGoldclr", image));
//             pinkRoseGoldclr.forEach((image) => newForm.append("pinkRoseGoldclr", image));
//             pinkWhiteGoldclr.forEach((image) => newForm.append("pinkWhiteGoldclr", image));
//             turquoiseYellowGoldclr.forEach((image) => newForm.append("turquoiseYellowGoldclr", image));
//             turquoiseRoseGoldclr.forEach((image) => newForm.append("turquoiseRoseGoldclr", image));
//             turquoiseWhiteGoldclr.forEach((image) => newForm.append("turquoiseWhiteGoldclr", image));
//             redYellowGoldclr.forEach((image) => newForm.append("redYellowGoldclr", image));
//             redRoseGoldclr.forEach((image) => newForm.append("redRoseGoldclr", image));
//             redWhiteGoldclr.forEach((image) => newForm.append("redWhiteGoldclr", image));
//             blackYellowGoldclr.forEach((image) => newForm.append("blackYellowGoldclr", image));
//             blackRoseGoldclr.forEach((image) => newForm.append("blackRoseGoldclr", image));
//             blackWhiteGoldclr.forEach((image) => newForm.append("blackWhiteGoldclr", image));
//             deepgreenYellowGoldclr.forEach((image) => newForm.append("deepgreenYellowGoldclr", image));
//             deepgreenRoseGoldclr.forEach((image) => newForm.append("deepgreenRoseGoldclr", image));
//             deepgreenWhiteGoldclr.forEach((image) => newForm.append("deepgreenWhiteGoldclr", image));
//             lotusgreenYellowGoldclr.forEach((image) => newForm.append("lotusgreenYellowGoldclr", image));
//             lotusgreenRoseGoldclr.forEach((image) => newForm.append("lotusgreenRoseGoldclr", image));
//             lotusgreenWhiteGoldclr.forEach((image) => newForm.append("lotusgreenWhiteGoldclr", image));

//             // Append other form fields
//             newForm.append("name", name);
//             newForm.append("skuid", skuid);
//             newForm.append("description", description);
//             newForm.append("category", category);
//             newForm.append("subcategory", subcategory);
//             newForm.append("tags", tags);
//             newForm.append("originalPrice", originalPrice);
//             newForm.append("discountPrice", discountPrice);
//             newForm.append("stock", stock);
//             newForm.append("shopId", seller._id);
//             newForm.append("designno", designno);
//             newForm.append("gender", gender);
//             newForm.append("ageGroup", ageGroup);

//             // Append weight and dimensions
//             newForm.append('goldWeight.weight', goldWeight.weight);
//             newForm.append('goldWeight.purity', goldWeight.purity);
//             newForm.append('diamondWeight.weight', diamondWeight.weight);
//             newForm.append('diamondWeight.quality', diamondWeight.quality);
//             newForm.append('dimension.height', height);
//             newForm.append('dimension.width', width);

//             // Append stock for different metal and enamel colors
//             newForm.append("YellowGoldclrStock", YellowGoldclrStock);
//             newForm.append("RoseGoldclrStock", RoseGoldclrStock);
//             newForm.append("WhiteGoldclrStock", WhiteGoldclrStock);
//             newForm.append("deepblueYellowGoldclrStock", deepblueYellowGoldclrStock);
//             newForm.append("deepblueRoseGoldclrStock", deepblueRoseGoldclrStock);
//             newForm.append("deepblueWhiteGoldclrStock", deepblueWhiteGoldclrStock);
//             newForm.append("pinkYellowGoldclrStock", pinkYellowGoldclrStock);
//             newForm.append("pinkRoseGoldclrStock", pinkRoseGoldclrStock);
//             newForm.append("pinkWhiteGoldclrStock", pinkWhiteGoldclrStock);
//             newForm.append("turquoiseYellowGoldclrStock", turquoiseYellowGoldclrStock);
//             newForm.append("turquoiseRoseGoldclrStock", turquoiseRoseGoldclrStock);
//             newForm.append("turquoiseWhiteGoldclrStock", turquoiseWhiteGoldclrStock);
//             newForm.append("redYellowGoldclrStock", redYellowGoldclrStock);
//             newForm.append("redRoseGoldclrStock", redRoseGoldclrStock);
//             newForm.append("redWhiteGoldclrStock", redWhiteGoldclrStock);
//             newForm.append("blackYellowGoldclrStock", blackYellowGoldclrStock);
//             newForm.append("blackRoseGoldclrStock", blackRoseGoldclrStock);
//             newForm.append("blackWhiteGoldclrStock", blackWhiteGoldclrStock);
//             newForm.append("deepgreenYellowGoldclrStock", deepgreenYellowGoldclrStock);
//             newForm.append("deepgreenRoseGoldclrStock", deepgreenRoseGoldclrStock);
//             newForm.append("deepgreenWhiteGoldclrStock", deepgreenWhiteGoldclrStock);
//             newForm.append("lotusgreenYellowGoldclrStock", lotusgreenYellowGoldclrStock);
//             newForm.append("lotusgreenRoseGoldclrStock", lotusgreenRoseGoldclrStock);
//             newForm.append("lotusgreenWhiteGoldclrStock", lotusgreenWhiteGoldclrStock);

//             const response = await axios.put(`${server}/product/update-product/${id}`, newForm, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log(response.data, "updated data");

//             // Handle success
//             if (response.status === 200) {
//                 toast.success('Product updated successfully!');
//             } else {
//                 toast.error('Failed to update product. Please try again.');
//             }
//         } catch (error) {
//             // Handle error
//             console.error(error); // Log the error for debugging
//             toast.error(`Error: ${error.response.data.message || error.message}`);
//         }
//     };

//  const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedForm = new FormData();

//     images.forEach((image) => {
//         updatedForm.append("images", image);
//     });

//     withchainimages.forEach((image) => {
//         updatedForm.append("withchainimages", image);
//     });

//     withchainoutimages.forEach((image) => {
//         updatedForm.append("withchainoutimages", image);
//     });

//     YellowGoldclr.forEach((image) => {
//         updatedForm.append("YellowGoldclr", image);
//     });

//     RoseGoldclr.forEach((image) => {
//         updatedForm.append("RoseGoldclr", image);
//     });

//     WhiteGoldclr.forEach((image) => {
//         updatedForm.append("WhiteGoldclr", image);
//     });

//     // Enamel Colors
//     deepblueYellowGoldclr.forEach((image) => {
//         updatedForm.append("deepblueYellowGoldclr", image);
//     });
//     deepblueRoseGoldclr.forEach((image) => {
//         updatedForm.append("deepblueRoseGoldclr", image);
//     });
//     deepblueWhiteGoldclr.forEach((image) => {
//         updatedForm.append("deepblueWhiteGoldclr", image);
//     });

//     pinkYellowGoldclr.forEach((image) => {
//         updatedForm.append("pinkYellowGoldclr", image);
//     });
//     pinkRoseGoldclr.forEach((image) => {
//         updatedForm.append("pinkRoseGoldclr", image);
//     });
//     pinkWhiteGoldclr.forEach((image) => {
//         updatedForm.append("pinkWhiteGoldclr", image);
//     });

//     // Other Enamel Colors (Turquoise, Red, Black, Deep Green, Lotus Green)
//     // Add similar code for other enamel colors...

//     // Append other form fields
//     updatedForm.append("name", name);
//     updatedForm.append("skuid", skuid);
//     updatedForm.append("description", description);
//     updatedForm.append("category", category);
//     updatedForm.append("subcategory", subcategory);
//     updatedForm.append("tags", tags);
//     updatedForm.append("originalPrice", originalPrice);
//     updatedForm.append("discountPrice", discountPrice);
//     updatedForm.append("stock", stock);
//     updatedForm.append("designno", designno);
//     updatedForm.append("gender", gender);
//     updatedForm.append("ageGroup", ageGroup);
    
//     // Weight and Dimension
//     updatedForm.append('goldWeight.weight', goldWeight.weight);
//     updatedForm.append('goldWeight.purity', goldWeight.purity);
//     updatedForm.append('diamondWeight.weight', diamondWeight.weight);
//     updatedForm.append('diamondWeight.quality', diamondWeight.quality);
//     updatedForm.append('dimension.height', height);
//     updatedForm.append('dimension.width', width);

//     updatedForm.append("YellowGoldclrStock", YellowGoldclrStock);
//     updatedForm.append("RoseGoldclrStock", RoseGoldclrStock);
//     updatedForm.append("WhiteGoldclrStock", WhiteGoldclrStock);

//     updatedForm.append("deepblueYellowGoldclrStock", deepblueYellowGoldclrStock);
//     updatedForm.append("deepblueRoseGoldclrStock", deepblueRoseGoldclrStock);
//     updatedForm.append("deepblueWhiteGoldclrStock", deepblueWhiteGoldclrStock);

//     // Pink Enamel Stock
//     updatedForm.append("pinkYellowGoldclrStock", pinkYellowGoldclrStock);
//     updatedForm.append("pinkRoseGoldclrStock", pinkRoseGoldclrStock);
//     updatedForm.append("pinkWhiteGoldclrStock", pinkWhiteGoldclrStock);

//     // Other Enamel Stock (Turquoise, Red, Black, Deep Green, Lotus Green)
//     // Add similar code for other enamel stocks...

//     // Add product ID for updating
//     updatedForm.append("productId", selectedProduct._id);  // Ensure you have the product ID available

//     dispatch(updateProduct(updatedForm));  // Call the update action
// };

    

    return (

        <>
            <DashboardHeader />
            <div className='mt-[20px] ml-4 flex justify-start'>
                <button className='flex items-center bg-black text-white p-4 rounded-[10px]' onClick={() => {
                    navigate("/dashboard-products")
                }}><IoArrowBack className='mr-[9px]' /> Go Back</button>
            </div>

            <div className='createproduct mt-[20px] mb-[20px] m-[auto] w-[50%] bg-white shadow px-8 overflow-y-scroll h-[80vh] rounded-[4px] p-3'>
                {isLoading && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="text-white text-xl">Product is Loading, please wait...</div>
                    </div>
                )}
                <h4 className='text-[30px] font-Poppins text-center'>Update Product</h4>



                {selectedProduct ?
                    <div>
                        <form action="" onSubmit={handleSubmit}>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Name <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='Enter Product Name'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }} />
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Sku Id <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name='skuid'
                                    placeholder='Enter Product Sku'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={skuid}
                                    onChange={(e) => { setSkuid(e.target.value) }} />
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Description <span className='text-red-500'>*</span></label>
                                <textarea

                                    name='description'
                                    placeholder='Enter Product Description'
                                    className='mt-1 appearance-none block w-full px-3 h-[75px] border border-gray-300 rounded-[3px] pt-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                >

                                </textarea>

                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor='category' className='pb-2'>Category <span className='text-red-500'>*</span></label>
                                <select
                                    id='category'
                                    className='w-full mt-1 border h-[35px] rounded-[5px]'
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    <option value=''>Choose a Category</option>
                                    {categoriesData.map((cat) => (
                                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor='subcategory' className='pb-2'>Subcategory <span className='text-red-500'>*</span></label>
                                <select
                                    id='subcategory'
                                    className='w-full mt-1 border h-[35px] rounded-[5px]'
                                    value={subcategory}
                                    onChange={handleSubcategoryChange}
                                >
                                    <option value=''>Choose a Subcategory</option>
                                    {category &&
                                        categoriesData
                                            .find((cat) => cat.title === category)
                                            ?.subcategories.map((subcat, index) => (
                                                <option key={index} value={subcat.name}>{subcat.name}</option>
                                            ))}
                                </select>
                            </div>







                            {/* chain without chain */}

                            <div className='font-Poppins mt-4'>
                                <h2 className='mb-2'>Add Variants for the Product</h2>

                                <Popover className="">
                                    <PopoverTrigger>
                                        <div className='flex items-center'>
                                            <IoIosAdd size={20} />
                                            <label variant="outline">Chain <span className='text-red-500'>(Not Mandatory)</span></label>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[60%] h-[auto] bg-white relative left-[5%] top-10">
                                        <div className="grid gap-4 bg-white">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Chain Options</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Set the Chain with / without for the product.
                                                </p>
                                            </div>
                                            <div className="gap-2">
                                                {/* Option 1: With Chain */}
                                                <div className="mb-3">
                                                    <div className='flex gap-2'>
                                                        <input type="checkbox" id='withchain' onChange={() => toggleShowImages('withchain')} />
                                                        <label htmlFor="withchain">With Chain</label>
                                                    </div>

                                                    {showWithChainImages && (
                                                        <div>
                                                            <label htmlFor="withchains" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                            </label>
                                                            <input type="file" id='withchains' className='hidden' multiple onChange={handlewithImageChange} />
                                                            <div className='image-container flex flex-wrap justify-center gap-2'>
                                                                {withchainimages.map((image, index) => (
                                                                    <div
                                                                        key={`withchain_image_${index}`}
                                                                        draggable
                                                                        onDragStart={(e) => handleDragStartWithChain(e, index)}
                                                                        onDragOver={handleDragOver}
                                                                        onDrop={(e) => handleDropWithChain(e, index)}
                                                                        className={`image-item relative m-2 ${index === draggingIndexWithChain ? 'opacity-50' : ''}`}
                                                                    >
                                                                        <img
                                                                            src={image.url || image}
                                                                            alt={`With Chain ${index}`}
                                                                            className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                        />
                                                                        <AiOutlineCloseCircle
                                                                            size={22}
                                                                            className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                            onClick={() => handleDeleteWithChainImage(index)}
                                                                        />
                                                                        {index === draggingIndexWithChain && (
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                                                <TfiHandDrag size={30} color='#000' />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-3">
                                                    <div className='flex gap-2'>
                                                        <input type="checkbox" id='withoutchain' onChange={() => toggleShowImages('withoutchain')} />
                                                        <label htmlFor="withoutchain">Without Chain</label>
                                                    </div>
                                                    {showWithoutChainImages && (
                                                        <div>
                                                            <label htmlFor="withoutchains" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                            </label>
                                                            <input type="file" id='withoutchains' className='hidden' multiple onChange={handlewithoutImageChange} />
                                                            <div className='flex flex-wrap justify-center gap-2'>
                                                                {withchainoutimages.map((image, index) => (
                                                                    <div
                                                                        key={`withoutchain_image_${index}`}
                                                                        draggable
                                                                        onDragStart={(e) => handleDragStartWithoutChain(e, index)}
                                                                        onDragOver={handleDragOver}
                                                                        onDrop={(e) => handleDropWithoutChain(e, index)}
                                                                        className={`relative m-2 ${index === draggingIndexWithoutChain ? 'opacity-50' : ''}`}
                                                                    >
                                                                        <img
                                                                            src={image.url || image}
                                                                            alt={`Without Chain ${index}`}
                                                                            className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                        />
                                                                        <AiOutlineCloseCircle
                                                                            size={22}
                                                                            className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                            onClick={() => handleDeleteWithoutChainImage(index)}
                                                                        />
                                                                        {index === draggingIndexWithoutChain && (
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                                                <TfiHandDrag size={30} color='#000' />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button className='bg-slate-800 text-white w-[50%] px-2 py-2 rounded'>Add Chain</button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Display selected chain images */}
                                <div className='bg-white ml-5'>
                                    <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImages('withchain')}>
                                        <BsDash /> With Chain
                                    </h3>
                                    {showWithChainImages && (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b'>
                                                    <th className='px-4 py-2'>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {withchainimages.map((image, index) => (
                                                    <tr key={index} className='border-b'>
                                                        <td className='px-4 py-2'>
                                                            <img className='h-[80px] w-[80px] object-cover' src={image.url || image} alt={`With Chain ${index}`} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <div className='bg-white ml-5'>
                                    <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImages('withoutchain')}>
                                        <BsDash /> Without Chain
                                    </h3>
                                    {showWithoutChainImages && (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b'>
                                                    <th className='px-4 py-2'>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {withchainoutimages.map((image, index) => (
                                                    <tr key={index} className='border-b'>
                                                        <td className='px-4 py-2'>
                                                            <img className='h-[80px] w-[80px] object-cover' src={image.url || image} alt={`Without Chain ${index}`} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            {/* // metal color */}


                            <div className='font-Poppins mt-4'>

                                <h2 className='mb-2 p-2 border border-[#555]'>Add Color for the Product</h2>


                                <Popover className="">
                                    <PopoverTrigger>
                                        <div className="flex items-center">
                                            <IoIosAdd size={20} />
                                            <label variant="outline">
                                                Metal Color <span className="text-red-500">(Not Mandatory)</span>
                                            </label>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                        <div className="w-[100%] grid gap-4 bg-white">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Metal Color</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Set the Color of the product.
                                                </p>
                                            </div>
                                            <div className="gap-2">
                                                {/* Option 1: With yellow gold */}
                                                <div className="mb-3">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="yellowgold"
                                                            onChange={handleToggleWithYellowclr}
                                                        />
                                                        <label htmlFor="yellowgold">Yellow Gold</label>
                                                    </div>

                                                    {showWithYellowclrImages && (
                                                        <div>
                                                            <label
                                                                htmlFor="yellowclr"
                                                                className="w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer"
                                                            >
                                                                <AiOutlinePlusCircle size={20} color="#555" /> Select
                                                                Images
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id="yellowclr"
                                                                className="hidden"
                                                                multiple
                                                                onChange={handlewithYellowclr}
                                                            />
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {YellowGoldclr &&
                                                                    YellowGoldclr.map((image, index) => (
                                                                        <div
                                                                            key={image.url || image}
                                                                            className="relative m-2"
                                                                            draggable
                                                                            onDragStart={(e) =>
                                                                                handleDragStartYellowGold(e, index)
                                                                            }
                                                                            onDragOver={(e) => e.preventDefault()}
                                                                            onDrop={(e) =>
                                                                                handleDropYellowGold(e, index)
                                                                            }
                                                                        >
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className="absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1"
                                                                                onClick={() => handleDeleteWithYellowclrImage(index)}
                                                                            />
                                                                            <img
                                                                                src={image.url || image}
                                                                                alt={`With Yellow Gold ${index}`}
                                                                                className={`h-[70px] w-[70px] object-cover border-[#555] m-2 ${index === draggingIndex ? 'opacity-50' : ''
                                                                                    }`}
                                                                            />
                                                                            {index === draggingIndex && (
                                                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                                                    <TfiHandDrag size={30} color="#000" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Stock</label>
                                                                <input
                                                                    type="number"
                                                                    value={YellowGoldclrStock}
                                                                    className="border border-[#555] p-2 w-full"
                                                                    placeholder="Enter stock"
                                                                    onChange={(e) => { setYellowGoldclrStock(e.target.value) }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Option 2: With rose gold */}
                                                <div className="mb-3">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="rosegold"
                                                            onChange={handleToggleWithRoseclr}
                                                        />
                                                        <label htmlFor="rosegold">Rose Gold</label>
                                                    </div>

                                                    {showWithRoseclrImages && (
                                                        <div>
                                                            <label
                                                                htmlFor="rosegoldclr"
                                                                className="w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer"
                                                            >
                                                                <AiOutlinePlusCircle size={20} color="#555" /> Select
                                                                Images
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id="rosegoldclr"
                                                                className="hidden"
                                                                multiple
                                                                onChange={handlewithRoseclr}
                                                            />
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {RoseGoldclr &&
                                                                    RoseGoldclr.map((image, index) => (
                                                                        <div
                                                                            key={image.url || image}
                                                                            className="relative m-2"
                                                                            draggable
                                                                            onDragStart={(e) =>
                                                                                handleDragStartRoseGold(e, index)
                                                                            }
                                                                            onDragOver={(e) => e.preventDefault()}
                                                                            onDrop={(e) =>
                                                                                handleDropRoseGold(e, index)
                                                                            }
                                                                        >
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className="absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1"
                                                                                onClick={() => handleDeleteWithRoseclrImage(index)}
                                                                            />
                                                                            <img
                                                                                src={image.url || image}
                                                                                alt={`With Rose Gold ${index}`}
                                                                                className={`h-[70px] w-[70px] object-cover border-[#555] m-2 ${index === draggingIndex ? 'opacity-50' : ''
                                                                                    }`}
                                                                            />
                                                                            {index === draggingIndex && (
                                                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                                                    <TfiHandDrag size={30} color="#000" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Stock</label>
                                                                <input
                                                                    type="number"
                                                                    value={RoseGoldclrStock}
                                                                    className="border border-[#555] p-2 w-full"
                                                                    placeholder="Enter stock"
                                                                    onChange={(e) => { setRoseGoldclrStock(e.target.value) }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Option 3: With white gold */}
                                                <div className="mb-3">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="whitegold"
                                                            onChange={handleToggleWithWhiteclr}
                                                        />
                                                        <label htmlFor="whitegold">White Gold</label>
                                                    </div>

                                                    {showWithWhiteclrImages && (
                                                        <div>
                                                            <label
                                                                htmlFor="whitegoldclr"
                                                                className="w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer"
                                                            >
                                                                <AiOutlinePlusCircle size={20} color="#555" /> Select
                                                                Images
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id="whitegoldclr"
                                                                className="hidden"
                                                                multiple
                                                                onChange={handlewithWhiteclr}
                                                            />
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {WhiteGoldclr &&
                                                                    WhiteGoldclr.map((image, index) => (
                                                                        <div
                                                                            key={image.url || image}
                                                                            className="relative m-2"
                                                                            draggable
                                                                            onDragStart={(e) =>
                                                                                handleDragStartWhiteGold(e, index)
                                                                            }
                                                                            onDragOver={(e) => e.preventDefault()}
                                                                            onDrop={(e) =>
                                                                                handleDropWhiteGold(e, index)
                                                                            }
                                                                        >
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className="absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1"
                                                                                onClick={() => handleDeleteWithWhiteclrImage(index)}
                                                                            />
                                                                            <img
                                                                                src={image.url || image}
                                                                                alt={`With White Gold ${index}`}
                                                                                className={`h-[70px] w-[70px] object-cover border-[#555] m-2 ${index === draggingIndex ? 'opacity-50' : ''
                                                                                    }`}
                                                                            />
                                                                            {index === draggingIndex && (
                                                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                                                    <TfiHandDrag size={30} color="#000" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Stock</label>
                                                                <input
                                                                    type="number"
                                                                    value={WhiteGoldclrStock}
                                                                    className="border border-[#555] p-2 w-full"
                                                                    placeholder="Enter stock"
                                                                    onChange={(e) => { setWhiteGoldclrStock(e.target.value) }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Display selected color images */}
                                <div className='bg-white ml-5'>
                                    <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('yellowcolor')}> <BsDash />Yellow Gold </h3>
                                    {showWithYellowclrImages && (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b'>
                                                    <th className='px-4 py-2'>Image</th>
                                                    <th className='px-4 py-2'>stock</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {YellowGoldclr && YellowGoldclr.map((i) => (
                                                    <tr key={i.url} className='border-b'>
                                                        <td className='px-4 py-2'>
                                                            <img className='h-[80px] w-[80px] object-cover' src={i.url || i} alt="" />
                                                        </td>
                                                        <td className='px-4 py-2'>{i.stock}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>


                                <div className='bg-white ml-5'>
                                    <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('rosecolor')}><BsDash /> Rose Gold</h3>
                                    {showWithRoseclrImages && (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b'>
                                                    <th className='px-4 py-2'>Name</th>
                                                    <th className='px-4 py-2'>stock</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {RoseGoldclr && RoseGoldclr.map((i) => (
                                                    <tr key={i.url} className='border-b'>
                                                        <td className='px-4 py-2'>
                                                            <img className='h-[80px] w-[80px] object-cover' src={i.url || i} alt="" />
                                                        </td>
                                                        <td className='px-4 py-2'>{i.stock}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>


                                <div className='bg-white ml-5'>
                                    <h3 className='cursor-pointer flex items-center' onClick={() => toggleShowImagesColor('whitecolor')}><BsDash /> White Gold</h3>
                                    {showWithWhiteclrImages && (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b'>
                                                    <th className='px-4 py-2'>Name</th>
                                                    <th className='px-4 py-2'>stock</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {WhiteGoldclr && WhiteGoldclr.map((i) => (
                                                    <tr key={i.url} className='border-b'>
                                                        <td className='px-4 py-2'>
                                                            <img className='h-[80px] w-[80px] object-cover' src={i.url || i} alt="" />
                                                        </td>
                                                        <td className='px-4 py-2'>{i.stock}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>









                            </div>


                            {/* enamel color  */}

                            <div className='font-Poppins mt-4'>

                                <h2 className='mb-2 p-2 border border-[#555]'>Add Enamel Color for the Product</h2>

                                {/* deep_blue */}
                                <div>



                                    <Popover className="">
                                        <PopoverTrigger >
                                            <div className='flex  items-center'>

                                                <IoIosAdd size={20} />
                                                <label variant="outline">Deep Blue  <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color : - Deep Blue</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the Color of the product.
                                                    </p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold foe enamel*/}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepblueyellowgold' onChange={deepbluehandleToggleWithYellowclr} />
                                                            <label htmlFor="deepblueyellowgold">Enamel Yellow Gold</label>
                                                        </div>


                                                        {deepblueshowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="deepblueyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepblueyellowclr' className='hidden' multiple onChange={deepbluehandlewithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepblueYellowGoldclr && deepblueYellowGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepbluehandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepblueYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepbluesetYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel  */}

                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepbluerosegold' onChange={deepbluehandleToggleWithRoseclr} />
                                                            <label htmlFor="deepbluerosegold">Enamel Rose Gold</label>
                                                        </div>


                                                        {deepblueshowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="deepbluerosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepbluerosegoldclr' className='hidden' multiple onChange={deepbluehandlewithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepblueRoseGoldclr && deepblueRoseGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepbluehandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepblueRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepbluesetRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel*/}


                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepbluewhitegold' onChange={deepbluehandleToggleWithWhiteclr} />
                                                            <label htmlFor="deepbluewhitegold">Enamel White Gold</label>
                                                        </div>


                                                        {deepblueshowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="deepbluewhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepbluewhitegoldclr' className='hidden' multiple onChange={deepbluehandlewithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepblueWhiteGoldclr && deepblueWhiteGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepbluehandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepblueWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepbluesetWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>


                                            <div>
                                                <div className='m-auto w-[80%]'>

                                                    <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* pink */}

                                <div>
                                    <Popover className="">
                                        <PopoverTrigger >
                                            <div className='flex  items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">pink <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color : - pink</h4>
                                                    <p className="text-sm text-muted-foreground">Set the Color of the product.</p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='pinkyellowgold' onChange={pinkhandleToggleWithYellowclr} />
                                                            <label htmlFor="pinkyellowgold">Enamel Yellow Gold</label>
                                                        </div>
                                                        {pinkshowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="pinkyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='pinkyellowclr' className='hidden' multiple onChange={pinkhandlewithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {pinkYellowGoldclr && pinkYellowGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => pinkhandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={pinkYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setpinksetYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='pinkrosegold' onChange={pinkhandleToggleWithRoseclr} />
                                                            <label htmlFor="pinkrosegold">Enamel Rose Gold</label>
                                                        </div>
                                                        {pinkshowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="pinkrosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='pinkrosegoldclr' className='hidden' multiple onChange={pinkhandlewithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {pinkRoseGoldclr && pinkRoseGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => pinkhandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={pinkRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setpinksetRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='pinkwhitegold' onChange={pinkhandleToggleWithWhiteclr} />
                                                            <label htmlFor="pinkwhitegold">Enamel White Gold</label>
                                                        </div>
                                                        {pinkshowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="pinkwhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='pinkwhitegoldclr' className='hidden' multiple onChange={pinkhandlewithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {pinkWhiteGoldclr && pinkWhiteGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => pinkhandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={pinkWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setpinksetWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='m-auto w-[80%]'>
                                                    <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* turquoise */}

                                <div>
                                    <Popover className="">
                                        <PopoverTrigger>
                                            <div className='flex items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">turquoise <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color : - turquoise</h4>
                                                    <p className="text-sm text-muted-foreground">Set the Color of the product.</p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='turquoiseyellowgold' onChange={turquoisehandleToggleWithYellowclr} />
                                                            <label htmlFor="turquoiseyellowgold">Enamel Yellow Gold</label>
                                                        </div>
                                                        {turquoiseshowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="turquoiseyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='turquoiseyellowclr' className='hidden' multiple onChange={turquoisehandlewithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {turquoiseYellowGoldclr && turquoiseYellowGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => turquoisehandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={turquoiseYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setturquoisesetYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='turquoiserozegold' onChange={turquoisehandleToggleWithRoseclr} />
                                                            <label htmlFor="turquoiserozegold">Enamel Rose Gold</label>
                                                        </div>
                                                        {turquoiseshowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="turquoiserozegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='turquoiserozegoldclr' className='hidden' multiple onChange={turquoisehandlewithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {turquoiseRoseGoldclr && turquoiseRoseGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => turquoisehandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={turquoiseRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setturquoisesetRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='turquoisewhitegold' onChange={turquoisehandleToggleWithWhiteclr} />
                                                            <label htmlFor="turquoisewhitegold">Enamel White Gold</label>
                                                        </div>
                                                        {turquoiseshowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="turquoisewhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='turquoisewhitegoldclr' className='hidden' multiple onChange={turquoisehandlewithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {turquoiseWhiteGoldclr && turquoiseWhiteGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => turquoisehandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={turquoiseWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setturquoisesetWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='m-auto w-[80%]'>
                                                        <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>


                                </div>


                                {/* red */}

                                <div>
                                    <Popover className="">
                                        <PopoverTrigger>
                                            <div className='flex items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">red <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color : - red</h4>
                                                    <p className="text-sm text-muted-foreground">Set the Color of the product.</p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='redyellowgold' onChange={redhandleToggleWithYellowclr} />
                                                            <label htmlFor="redyellowgold">Enamel Yellow Gold</label>
                                                        </div>
                                                        {redshowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="redyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='redyellowclr' className='hidden' multiple onChange={redhandlewithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {redYellowGoldclr && redYellowGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => redhandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={redYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setredYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='redrosegold' onChange={redhandleToggleWithRoseclr} />
                                                            <label htmlFor="redrosegold">Enamel Rose Gold</label>
                                                        </div>
                                                        {redshowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="redrosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='redrosegoldclr' className='hidden' multiple onChange={redhandlewithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {redRoseGoldclr && redRoseGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => redhandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={redRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setredRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='redwhitegold' onChange={redhandleToggleWithWhiteclr} />
                                                            <label htmlFor="redwhitegold">Enamel White Gold</label>
                                                        </div>
                                                        {redshowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="redwhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='redwhitegoldclr' className='hidden' multiple onChange={redhandlewithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {redWhiteGoldclr && redWhiteGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => redhandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                    <div>
                                                                        <label className="block mt-2">Stock</label>
                                                                        <input
                                                                            type="number"
                                                                            value={redWhiteGoldclrStock}
                                                                            className="border border-[#555] p-2 w-full"
                                                                            placeholder="Enter stock"
                                                                            onChange={(e) => { setredWhiteGoldclrStock(e.target.value) }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='m-auto w-[80%]'>
                                                        <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>


                                {/* black */}
                                <div>

                                    <Popover className="">
                                        <PopoverTrigger>
                                            <div className='flex items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">black <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color : - black</h4>
                                                    <p className="text-sm text-muted-foreground">Set the Color of the product.</p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='blackyellowgold' onChange={blackhandleToggleWithYellowclr} />
                                                            <label htmlFor="blackyellowgold">Enamel Yellow Gold</label>
                                                        </div>
                                                        {blackshowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="blackyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='blackyellowclr' className='hidden' multiple onChange={blackhandlewithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {blackYellowGoldclr && blackYellowGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => blackhandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={blackYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setblackYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='blackrosegold' onChange={blackhandleToggleWithRoseclr} />
                                                            <label htmlFor="blackrosegold">Enamel Rose Gold</label>
                                                        </div>
                                                        {blackshowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="blackrosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='blackrosegoldclr' className='hidden' multiple onChange={blackhandlewithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {blackRoseGoldclr && blackRoseGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => blackhandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={blackRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setblackRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='blackwhitegold' onChange={blackhandleToggleWithWhiteclr} />
                                                            <label htmlFor="blackwhitegold">Enamel White Gold</label>
                                                        </div>
                                                        {blackshowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="blackwhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='blackwhitegoldclr' className='hidden' multiple onChange={blackhandlewithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {blackWhiteGoldclr && blackWhiteGoldclr.map((i) => (
                                                                        <div key={`withchain_${i}`} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => blackhandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={blackWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setblackWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='m-auto w-[80%]'>
                                                        <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>


                                {/* deep green */}
                                <div>


                                    <Popover className="">
                                        <PopoverTrigger>
                                            <div className='flex items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">Deep Green <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color: Deep Green</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the Color of the product.
                                                    </p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepgreenyellowgold' onChange={deepgreenHandleToggleWithYellowclr} />
                                                            <label htmlFor="deepgreenyellowgold">Enamel Yellow Gold</label>
                                                        </div>

                                                        {deepgreenShowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="deepgreenyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepgreenyellowclr' className='hidden' multiple onChange={deepgreenHandleWithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepgreenYellowGoldclr && deepgreenYellowGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepgreenHandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepgreenYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepgreenYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepgreenrosegold' onChange={deepgreenHandleToggleWithRoseclr} />
                                                            <label htmlFor="deepgreenrosegold">Enamel Rose Gold</label>
                                                        </div>

                                                        {deepgreenShowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="deepgreenrosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepgreenrosegoldclr' className='hidden' multiple onChange={deepgreenHandleWithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepgreenRoseGoldclr && deepgreenRoseGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepgreenHandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepgreenRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepgreenRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='deepgreenwhitegold' onChange={deepgreenHandleToggleWithWhiteclr} />
                                                            <label htmlFor="deepgreenwhitegold">Enamel White Gold</label>
                                                        </div>

                                                        {deepgreenShowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="deepgreenwhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='deepgreenwhitegoldclr' className='hidden' multiple onChange={deepgreenHandleWithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {deepgreenWhiteGoldclr && deepgreenWhiteGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => deepgreenHandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={deepgreenWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setdeepgreenWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className='m-auto w-[80%]'>
                                                    <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>


                                {/* lotus green */}
                                <div>


                                    <Popover className="">
                                        <PopoverTrigger>
                                            <div className='flex items-center'>
                                                <IoIosAdd size={20} />
                                                <label variant="outline">Lotus Green <span className='text-red-500'>(if Enamel product)</span></label>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] bg-white relative left-[5%] top-10">
                                            <div className="w-[100%] grid gap-4 bg-white">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Enamel Color: Lotus Green</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the Color of the product.
                                                    </p>
                                                </div>
                                                <div className="gap-2">
                                                    {/* Option 1: With yellow gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='lotusgreenyellowgold' onChange={lotusgreenHandleToggleWithYellowclr} />
                                                            <label htmlFor="lotusgreenyellowgold">Enamel Yellow Gold</label>
                                                        </div>

                                                        {lotusgreenShowWithYellowclrImages && (
                                                            <div>
                                                                <label htmlFor="lotusgreenyellowclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='lotusgreenyellowclr' className='hidden' multiple onChange={lotusgreenHandleWithYellowclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {lotusgreenYellowGoldclr && lotusgreenYellowGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => lotusgreenHandleDeleteWithYellowclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={lotusgreenYellowGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setlotusgreenYellowGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 2: With rose gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='lotusgreenrosegold' onChange={lotusgreenHandleToggleWithRoseclr} />
                                                            <label htmlFor="lotusgreenrosegold">Enamel Rose Gold</label>
                                                        </div>

                                                        {lotusgreenShowWithRoseclrImages && (
                                                            <div>
                                                                <label htmlFor="lotusgreenrosegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='lotusgreenrosegoldclr' className='hidden' multiple onChange={lotusgreenHandleWithRoseclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {lotusgreenRoseGoldclr && lotusgreenRoseGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => lotusgreenHandleDeleteWithRoseclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={lotusgreenRoseGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setlotusgreenRoseGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Option 3: With white gold for enamel */}
                                                    <div className="mb-3">
                                                        <div className='flex gap-2'>
                                                            <input type="checkbox" id='lotusgreenwhitegold' onChange={lotusgreenHandleToggleWithWhiteclr} />
                                                            <label htmlFor="lotusgreenwhitegold">Enamel White Gold</label>
                                                        </div>

                                                        {lotusgreenShowWithWhiteclrImages && (
                                                            <div>
                                                                <label htmlFor="lotusgreenwhitegoldclr" className='w-[180px] border border-[#555] flex items-center p-2 gap-2 cursor-pointer'>
                                                                    <AiOutlinePlusCircle size={20} color='#555' /> Select Images
                                                                </label>
                                                                <input type="file" id='lotusgreenwhitegoldclr' className='hidden' multiple onChange={lotusgreenHandleWithWhiteclr} />
                                                                <div className='flex flex-wrap justify-center gap-2'>
                                                                    {lotusgreenWhiteGoldclr && lotusgreenWhiteGoldclr.map((i) => (
                                                                        <div key={i.url || i} className='relative'>
                                                                            <AiOutlineCloseCircle
                                                                                size={22}
                                                                                className='absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-1'
                                                                                onClick={() => lotusgreenHandleDeleteWithWhiteclrImage(i)}
                                                                            />
                                                                            <img
                                                                                key={i.url || i}
                                                                                src={i.url || i}
                                                                                alt={`With Chain ${i}`}
                                                                                className='h-[70px] w-[70px] object-cover border-[#555] m-2'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <label className="block mt-2">Stock</label>
                                                            <input
                                                                type="number"
                                                                value={lotusgreenWhiteGoldclrStock}
                                                                className="border border-[#555] p-2 w-full"
                                                                placeholder="Enter stock"
                                                                onChange={(e) => { setlotusgreenWhiteGoldclrStock(e.target.value) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className='m-auto w-[80%]'>
                                                    <button className='bg-slate-800 text-white w-[80%] px-2 py-2 rounded' onClick={handleAddMetalColor}>Add Metal Color</button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                            </div>



                            {/* enamel color  */}



                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Tags</label>
                                <input type="text"
                                    name='tags'
                                    placeholder='Enter Product Tags'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={tags}
                                    onChange={(e) => { setTags(e.target.value) }} />
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Original Price <span className='text-red-500'>*</span></label>
                                <input type="number"
                                    name='oprice'
                                    placeholder='Enter Product Original Price'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={originalPrice}
                                    onChange={(e) => { setOriginalPrice(e.target.value) }} />
                            </div>
                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Price (With Discount) <span className='text-red-500'>*</span></label>
                                <input type="number"
                                    name='disprice'
                                    placeholder='Enter Product Discount Price'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={discountPrice}
                                    onChange={(e) => { setDiscountPrice(e.target.value) }} />
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2'>Product Stocks <span className='text-red-500'>*</span></label>
                                <input type="number"
                                    name='disprice'
                                    placeholder='Enter Product Stocks Availability'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={stock}
                                    onChange={(e) => { setStock(e.target.value) }} />
                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="designprice" className='pb-2'>Design Registration No <span className='text-red-500'>*</span></label>
                                <input type="text"
                                    name='designprice'
                                    placeholder='Enter Design Registration Number'
                                    className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                    value={designno}
                                    onChange={(e) => { setDesignno(e.target.value) }} />
                            </div>




                            {/* weight section */}

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2 font-[600]'>Gold Weight<span className='text-red-500'>*</span></label>
                                <div className='flex justify-between items-center'>

                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="goldWeight">Weight</label>

                                        <input type="text"
                                            id='goldWeight'
                                            placeholder='Enter Weight '
                                            value={goldWeight.weight}
                                            onChange={(e) => setGoldWeight({ ...goldWeight, weight: e.target.value })}
                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>
                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="goldPurity">Purity</label>

                                        <input type="text"
                                            id='goldPurity'
                                            placeholder='Enter Purity '
                                            value={goldWeight.purity}
                                            onChange={(e) => setGoldWeight({ ...goldWeight, purity: e.target.value })}

                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>

                                </div>

                            </div>

                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2 font-[600]'>Diamond Weight<span className='text-red-500'>*</span></label>
                                <div className='flex justify-between items-center'>

                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="diamondWeight">Weight</label>

                                        <input type="text"
                                            id='diamondWeight'
                                            placeholder='Enter Weight '
                                            value={diamondWeight.weight}
                                            onChange={(e) => setDiamondWeight({ ...diamondWeight, weight: e.target.value })}
                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>
                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="diamondQuality">Quality</label>

                                        <input type="text"
                                            id='diamondQuality'
                                            placeholder='Enter Quality '
                                            value={diamondWeight.quality}
                                            onChange={(e) => setDiamondWeight({ ...diamondWeight, quality: e.target.value })}
                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>

                                </div>

                            </div>





                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2 font-[600]'>Dimension <span className='text-red-500'>*</span></label>
                                <div className='flex justify-between items-center'>

                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="height">Height</label>

                                        <input type="text"
                                            id='height'
                                            placeholder='Enter Height '
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>
                                    <div className='mt-1 w-[45%]'>

                                        <label htmlFor="width">Width</label>

                                        <input type="text"
                                            name='width'
                                            placeholder='Enter Width '
                                            value={width}
                                            onChange={(e) => setWidth(e.target.value)}
                                            className='mt-1 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                        />
                                    </div>

                                </div>

                            </div>


                            {/* weight section */}



                            {/* gender */}
                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2 font-[600]'>Select Gender <span className='text-red-500'>*</span></label>
                                <div className='flex justify-between items-center'>
                                    <div className='mt-1 w-[30%]'>
                                        <input
                                            type="checkbox"
                                            id="girl"
                                            checked={gender.girl}
                                            onChange={(e) => setGender({ ...gender, girl: e.target.checked })}
                                        />
                                        <label htmlFor="girl" className="ml-2">Girl</label>
                                    </div>
                                    <div className='mt-1 w-[30%]'>
                                        <input
                                            type="checkbox"
                                            id="boy"
                                            checked={gender.boy}
                                            onChange={(e) => setGender({ ...gender, boy: e.target.checked })}
                                        />
                                        <label htmlFor="boy" className="ml-2">Boy</label>
                                    </div>
                                    <div className='mt-1 w-[30%]'>
                                        <input
                                            type="checkbox"
                                            id="unisex"
                                            checked={gender.unisex}
                                            onChange={(e) => setGender({ ...gender, unisex: e.target.checked })}
                                        />
                                        <label htmlFor="unisex" className="ml-2">Unisex</label>
                                    </div>
                                </div>
                            </div>

                            {/* Age Group Selection */}
                            <div className='font-Poppins mt-4'>
                                <label htmlFor="" className='pb-2 font-[600]'>Select Age Group <span className='text-red-500'>*</span></label>
                                <div className='flex justify-between items-center'>
                                    <div className='mt-1 w-[23%]'>
                                        <input
                                            type="checkbox"
                                            id="infants"
                                            checked={ageGroup.infants}
                                            onChange={(e) => setAgeGroup({ ...ageGroup, infants: e.target.checked })}
                                        />
                                        <label htmlFor="infants" className="ml-2">Infants (0-3 yrs)</label>
                                    </div>
                                    <div className='mt-1 w-[23%]'>
                                        <input
                                            type="checkbox"
                                            id="kids"
                                            checked={ageGroup.kids}
                                            onChange={(e) => setAgeGroup({ ...ageGroup, kids: e.target.checked })}
                                        />
                                        <label htmlFor="kids" className="ml-2">Kids (3-12 yrs)</label>
                                    </div>
                                    <div className='mt-1 w-[23%]'>
                                        <input
                                            type="checkbox"
                                            id="teens"
                                            checked={ageGroup.teens}
                                            onChange={(e) => setAgeGroup({ ...ageGroup, teens: e.target.checked })}
                                        />
                                        <label htmlFor="teens" className="ml-2">Teens</label>
                                    </div>
                                    <div className='mt-1 w-[23%]'>
                                        <input
                                            type="checkbox"
                                            id="mom"
                                            checked={ageGroup.mom}
                                            onChange={(e) => setAgeGroup({ ...ageGroup, mom: e.target.checked })}
                                        />
                                        <label htmlFor="mom" className="ml-2">Mom</label>
                                    </div>
                                </div>
                            </div>



                            <div className='font-Poppins mt-4 cursor-pointer'>
                                <label htmlFor="" className='pb-2'>Upload Images <span className='text-red-500'>*</span></label>
                                <div className='w-full flex items-center flex-wrap'>
                                    <input type="file" className='hidden' id='upload' multiple onChange={handleImageChange} />
                                    <label htmlFor="upload">
                                        <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                                    </label>

                                    {images.map((image, index) => (
                                        <div
                                            key={image.url || image}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, index)}
                                            className={`relative m-2 ${index === draggingIndex ? 'opacity-50' : ''}`}
                                        >
                                            <img
                                                src={image.url || image}
                                                alt=""
                                                className='h-[120px] w-[120px] object-cover rounded-md'
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className='absolute top-0 right-0 p-1 text-red-500'
                                            >
                                                X
                                            </button>
                                            {index === draggingIndex && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                    <TfiHandDrag size={30} color='#000' />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className='font-Poppins mt-4 mb-5 cursor-pointer'>
                                <input
                                    type="submit"
                                    value="Update Product"
                                    className=' cursor-pointer mt-1 appearance-none block w-full py-2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

                                />
                            </div>



                        </form>

                    </div>
                    :
                    <div>No product found</div>
                }


                {/* cproduct form  */}


            </div>

        </>

    )
}

export default ShopEditProductPage