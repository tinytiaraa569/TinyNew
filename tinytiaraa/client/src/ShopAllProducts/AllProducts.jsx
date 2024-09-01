import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProductShop } from '../redux/actions/product';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineWarning } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DataGrid } from '@mui/x-data-grid';

function AllProducts() {
    const { seller } = useSelector((state) => state.seller);
    const { products = [], isLoading } = useSelector((state) => state.products);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload();
    };

    const handleEdit = (id) => {
        navigate(`/editproduct/${id}`);
    };

    useEffect(() => {
        dispatch(getAllProductShop(seller._id));
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.skuid.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [products, searchQuery]);

    const checkLowStock = (item) => {
        let isLowStock = false;

        // Check Metalcolorstock
        if (item.Metalcolorstock) {
            for (let key in item.Metalcolorstock) {
                if (item.Metalcolorstock[key] !== null && item.Metalcolorstock[key] <= 1) {
                    isLowStock = true;
                    break;
                }
            }
        }

        // Check Enamelcolorstock if Metalcolorstock didn't trigger low stock
        if (!isLowStock && item.Enamelcolorstock) {
            for (let enamelKey in item.Enamelcolorstock) {
                const enamelStock = item.Enamelcolorstock[enamelKey];
                for (let key in enamelStock) {
                    if (enamelStock[key] !== null && enamelStock[key] <= 1) {
                        isLowStock = true;
                        break;
                    }
                }
                if (isLowStock) break;
            }
        }

        // Check the general stock if neither Metalcolorstock nor Enamelcolorstock triggered low stock
        if (!isLowStock && item.stock !== null && item.stock <= 1) {
            isLowStock = true;
        }

        return isLowStock;
    };

    const rows = filteredProducts?.map((item) => {
        return {
            id: item._id,
            skuid: item.skuid,
            name: item.name,
            price: `₹ ${item.discountPrice}`,
            Stock: item.stock !== null ? item.stock : 'M/E',
            sold: 10, // Replace with actual sold count if available
            isLowStock: checkLowStock(item),
        };
    });

    const columns = [
        { field: 'id', headerName: 'Product Id', minWidth: 150, flex: 0.7 },
        { field: 'skuid', headerName: 'Sku Id', minWidth: 150, flex: 0.7 },
        { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
        { field: 'sold', headerName: 'Sold out', type: 'number', minWidth: 130, flex: 0.6 },
        { field: 'price', headerName: 'Price', minWidth: 100, flex: 0.6 },
        { field: 'Stock', headerName: 'Stock', type: 'number', minWidth: 80, flex: 0.5 },

        {
            field: 'LowStock',
            headerName: 'Low Stock',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                params.row.isLowStock ? <AiOutlineWarning size={20} color="red" /> : null
            ),
        },
        {
            field: 'Preview',
            headerName: 'Preview',
            flex: 0.8,
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/shopproduct/${params.row.name}`}>
                    <button>
                        <AiOutlineEye size={20} />
                    </button>
                </Link>
            ),
        },
        {
            field: 'Edit',
            headerName: 'Edit',
            flex: 0.8,
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleEdit(params.id)}>
                    <AiOutlineEdit size={20} />
                </button>
            ),
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            flex: 0.8,
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.id)}>
                    <AiOutlineDelete size={20} />
                </button>
            ),
        },
    ];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className="w-full flex items-center justify-between">
                        <div className="mb-4 w-[25%]">
                            <input
                                type="text"
                                placeholder="Search by SKU ID or Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 w-[100%] border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <h3>Total Products : - <span className="font-[600]">{products?.length}</span> products</h3>
                        </div>
                    </div>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    );
}

export default AllProducts;
