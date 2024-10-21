import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../server'; // Ensure your server URL is correct
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Loader/Loader';

function AllUsers() {
    const [users, setUsers] = useState([]); // State to hold the users
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${server}/user/get-all-users`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include credentials
                });
                console.log('Fetched data:', response.data); // Log full response data
                setUsers(response.data.users); // Set users from the response
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching users'); // Handle errors
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUsers();
    }, []);

    // Render loading state
    if (loading) return <Loader />;

    // Render error state
    if (error) return <div>{error}</div>;

    // Define columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 150, flex: 1 },
        { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
        { 
            field: 'createdAt', 
            headerName: 'Created At', 
            minWidth: 150, 
            flex: 1,
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (
                params.value?.url ? <img src={params.value.url} alt="User Avatar" width={50} height={50} /> : 'No Avatar'
            ),
        },
    ];

    // Prepare rows for DataGrid
    const rows = users.map(user => ({
        id: user._id || 'N/A', // Fallback for missing id
        name: user.name || 'Unknown', // Fallback for missing name
        email: user.email || 'No Email', // Fallback for missing email
        createdAt: user?.createdAt ? user.createdAt.slice(0, 10) : 'N/A', // Fallback for missing createdAt
        avatar: user.avatar || {}, // Fallback for missing avatar
    }));

    return (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center text-[#000000b9]">All Users</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}

export default AllUsers;
