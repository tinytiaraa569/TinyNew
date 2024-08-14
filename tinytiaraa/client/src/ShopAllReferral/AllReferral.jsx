import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import ReferDetail from './ReferDetail';

function AllReferral() {
    const [referrals, setReferrals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [referralsPerPage] = useState(5); // Number of referrals to show per page
    const [loading, setLoading] = useState(true);
    const [selectedReferral, setSelectedReferral] = useState(null);


    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await axios.get(`${server}/referral/all-referrals`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                setReferrals(response.data.referrals);
            } catch (error) {
                console.error('Error fetching referrals:', error);
                toast.error('Failed to fetch referrals.');
            } finally {
                setLoading(false);
            }
        };

        fetchReferrals();
    }, []);

    // Calculate the referrals to show on the current page
    const indexOfLastReferral = currentPage * referralsPerPage;
    const indexOfFirstReferral = indexOfLastReferral - referralsPerPage;
    const currentReferrals = referrals.slice(indexOfFirstReferral, indexOfLastReferral);

    // Pagination logic
    const totalPages = Math.ceil(referrals.length / referralsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const openDetails = (referralId) => {
        setSelectedReferral(referralId);
    };

    const closeDetails = () => {
        setSelectedReferral(null);
    };

    return (
        <div className="p-4 w-[90%] ">
            <h1 className="text-xl font-bold mb-4">All Referrals</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="py-2 px-4 border-r">Referral Code</th>
                                <th className="py-2 px-4 border-r">Referrer Name</th>
                                <th className="py-2 px-4 border-r">Referrer Email</th>
                                <th className="py-2 px-4 border-r">Created At</th>
                                <th className="py-2 px-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReferrals.map((referral) => (
                                <tr key={referral._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b border-gray-200">{referral.referralCode}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{referral.referrer.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{referral.referrer.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{new Date(referral.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <button
                                            onClick={() => openDetails(referral._id)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-500 hover:bg-gray-100"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} hover:bg-gray-100`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-500 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            )}
            {selectedReferral && (
                <ReferDetail
                    referralId={selectedReferral}
                    onClose={closeDetails}
                />
            )}

        </div>
    );
}

export default AllReferral;
