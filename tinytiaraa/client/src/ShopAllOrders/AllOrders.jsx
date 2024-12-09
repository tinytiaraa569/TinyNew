import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineExclamationCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { getAllOrdersOfShop } from '@/redux/actions/order'

function AllOrders() {
    const { seller } = useSelector((state) => state.seller)
    
    const { orders, isLoading } = useSelector((state) => state.order)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                switch (params.value) {
                    case "Delivered":
                        return "text-green-600";  // Green for Delivered
                    case "Processing":
                        return "text-red-600";   // Red for Processing
                    case "Shipping":
                        return "text-orange-600"; // Orange for Shipping
                    default:
                        return "text-gray-500";  // Default color if status is not matched
                }
            },
            renderCell: (params) => {
                let icon;
                switch (params.value) {
                    case "Delivered":
                        icon = <AiOutlineCheckCircle className="inline mr-2" size={16} />;
                        break;
                    case "Processing":
                        icon = <AiOutlineClockCircle className="inline mr-2" size={16} />;
                        break;
                    case "Shipping":
                        icon = <AiOutlineExclamationCircle className="inline mr-2" size={16} />;
                        break;
                    default:
                        icon = null;
                }

                return (
                    <div className="flex items-center">
                        {icon}
                        <span>{params.value}</span>
                    </div>
                );
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "action",
            flex: 1,
            minWidth: 150,
            headerName: "",
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <div className='flex justify-end items-center'>
                        <span className='font-Poppins'>Order Details</span>
                        <AiOutlineArrowRight size={20} />
                    </div>
                </Link>
            ),
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "Inr ₹" + item.totalPrice,
            status: item.status
        });
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className='mb-2'>
                        <h2 className='text-[22px] font-[500]'>All Orders</h2>
                    </div>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    )
}

export default AllOrders
