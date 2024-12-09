import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import RequestDetail from './Requestdetail';

function AllRequest() {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${server}/customised/all/requests`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });

                const sortedRequests = response.data.customisationRequests.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setRequests(sortedRequests);
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const totalPages = Math.ceil(requests.length / requestsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openDetails = (requestId) => {
        setSelectedRequest(requestId);
    };

    const closeDetails = () => {
        setSelectedRequest(null);
    };

    return (
        <div className="p-8 w-full  min-h-screen">
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Customisation Orders</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="text-xl text-gray-600">Loading...</div>
                </div>
            ) : (
                <div className="rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {currentRequests.map((request) => (
                                <tr key={request._id} className="hover:bg-gray-50 cursor-pointer">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
                                        {request.phonenumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 border-b border-gray-200">
                                        <button
                                            onClick={() => openDetails(request._id)}
                                            className="font-medium hover:underline"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Showing {indexOfFirstRequest + 1} to{' '}
                            {Math.min(indexOfLastRequest, requests.length)} of {requests.length} requests
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-sm font-medium ${
                                    currentPage === 1
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                } rounded-l-lg`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 text-sm font-medium ${
                                        currentPage === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 text-sm font-medium ${
                                    currentPage === totalPages
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                } rounded-r-lg`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedRequest && (
                <RequestDetail requestId={selectedRequest} onClose={closeDetails} />
            )}
        </div>
    );
}

export default AllRequest;
