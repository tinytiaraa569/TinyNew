import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '@/server';
import ReferDetail from './ReferDetail';

function AllReferral() {
    const [referrals, setReferrals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [referralsPerPage] = useState(12); // Number of referrals to show per page
    const [loading, setLoading] = useState(true);
    const [selectedReferral, setSelectedReferral] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Search query state

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

    // Filter referrals based on the search query (code, name, or email)
    const filteredReferrals = referrals.filter(
        (referral) =>
            referral.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            referral.referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            referral.referrer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    // Calculate the referrals to show on the current page after filtering
    const indexOfLastReferral = currentPage * referralsPerPage;
    const indexOfFirstReferral = indexOfLastReferral - referralsPerPage;
    const currentReferrals = filteredReferrals.slice(indexOfFirstReferral, indexOfLastReferral);

    // Pagination logic
    const totalPages = Math.ceil(filteredReferrals.length / referralsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openDetails = (referralId) => {
        setSelectedReferral(referralId);
    };

    const closeDetails = () => {
        setSelectedReferral(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when the search query changes
    };

    return (
        <div className="p-6 bg-[#f0f8ff] rounded-lg shadow-lg w-full mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Referrals</h1>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by Referral Code, Referrer Name, or Email"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
            </div>

            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referral Code</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referrer Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Referrer Email</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Created At</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReferrals.map((referral) => (
                                <tr key={referral._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referralCode}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referrer.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{referral.referrer.email}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{new Date(referral.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-sm">
                                        <button
                                            onClick={() => openDetails(referral._id)}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-700">
                            Showing {indexOfFirstReferral + 1} to {Math.min(indexOfLastReferral, filteredReferrals.length)} of {filteredReferrals.length} referrals
                        </div>
                        <div>
                            <nav className="inline-flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-l-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 border text-sm ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-gray-100 rounded-md`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
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
