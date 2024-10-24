import styles from "@/Styles/styles";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdDownload, MdEdit } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing arrow icons
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import XLSX

function CreateBanner() {
  // Dummy data for banners
  const [banners, setBanners] = useState([
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
  ]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bannersToDelete, setBannersToDelete] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State for notification

  // Handle banner selection
  const handleSelectBanner = (id) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, selected: !banner.selected } : banner
      )
    );
  };

  // Handle banner deletion
  const handleDeleteBanner = (id) => {
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== id));
  };

  const handleMultipleDelete = () => {
    setBanners((prevBanners) => prevBanners.filter((banner) => !bannersToDelete.includes(banner.id)));
    setBannersToDelete([]);
    setShowDeletePopup(false);
  };

  // Example function to change order of banners
  const changeBannerOrder = (index, direction) => {
    const newBanners = [...banners]; // Create a copy of the banners array
    const targetIndex = index + direction;
  
    // Check if the new index is out of bounds
    if (targetIndex < 0 || targetIndex >= newBanners.length) return;
  
    // Swap the banners in the newBanners array
    [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];
  
    // Update the state with the new order
    setBanners(newBanners);
  };

  // Function to export banners to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(banners.map(({ id, title, link, imageUrl }) => ({
      ID: id,
      Title: title,
      Link: link,
      ImageURL: imageUrl,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
    XLSX.writeFile(workbook, "banners.xlsx");
  };

  return (
    <div className="w-full mt-5 p-5 bg-white shadow-md rounded-lg">
      <h3 className={`font-poppins text-[22px] text-center text-gray-700 font-bold`}>
        Create Banners
      </h3>

      <div className="flex items-center justify-between font-Poppins mb-4">
        <h2 className="text-[22px] text-[#555]">Home Banners Collection</h2>

        <Link to="/dashboard/banner/create">
          <div
            className={`${styles.button} w-[180px] flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md text-white px-2 py-2`}
          >
            <IoMdAdd />
            <span className={`${styles.cart_button_text} font-semibold`}>
              Add Banner
            </span>
          </div>
        </Link>
      </div>

      <div className="flex bg-slate-700 text-white rounded-lg py-4 px-6 justify-between items-center shadow-inner">
        {/* Excel Export Button */}
        <button
          className="flex items-center bg-green-600 px-4 py-2 rounded transition duration-300 hover:bg-green-500"
          onClick={exportToExcel} // Call export function
        >
          <MdDownload className="mr-2" /> Export to Excel
        </button>

        <button
          className="flex items-center bg-red-600 px-4 py-2 rounded transition duration-300 hover:bg-red-500"
          onClick={() => {
            const selectedBanners = banners.filter(banner => banner.selected);
            if (selectedBanners.length > 0) {
              setBannersToDelete(selectedBanners.map(banner => banner.id));
              setShowDeletePopup(true);
            } else {
              setShowNotification(true); // Show notification instead of alert
            }
          }}
        >
          <MdDelete className="mr-2" /> Delete
        </button>
      </div>

      {/* Banner list */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`border rounded-lg p-4 shadow-sm ${
                banner.selected ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
            >
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-[150px] object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{banner.title}</h4>
              <a href={banner.link} className="text-blue-500 hover:underline">
                {banner.link}
              </a>

              <div className="mt-4 flex items-center justify-between">
                {/* Edit Button */}
                <Link
                  to={`/dashboard/banner/edit/${banner.id}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <MdEdit className="mr-2" /> Edit
                </Link>

                {/* Delete Button */}
                <button
                  className="text-red-600 hover:underline flex items-center"
                  onClick={() => handleDeleteBanner(banner.id)}
                >
                  <MdDelete className="mr-2" /> Delete
                </button>
              </div>

              {/* Select Checkbox */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={banner.selected}
                  onChange={() => handleSelectBanner(banner.id)}
                  className="mr-2"
                />
                <label>Select</label>
              </div>

              {/* Reorder Buttons with icons */}
              <div className="flex justify-between mt-2">
  <button
    className="flex items-center text-gray-600 hover:text-gray-800"
    onClick={() => changeBannerOrder(index, -1)}
    disabled={index === 0}
  >
    <FaArrowUp className="mr-1" /> Move Up
  </button>
  <button
    className="flex items-center text-gray-600 hover:text-gray-800"
    onClick={() => changeBannerOrder(index, 1)}
    disabled={index === banners.length - 1}
  >
    <FaArrowDown className="mr-1" /> Move Down
  </button>
</div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the selected banners?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleMultipleDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-black">Please select at least one banner.</p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mr-2 mt-2"
              onClick={() => setShowNotification(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateBanner;
