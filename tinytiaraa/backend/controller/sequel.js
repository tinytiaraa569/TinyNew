const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/calculateEDD", async (req, res) => {
    const { origin_pincode, destination_pincode, pickup_date } = req.body;
    const token = "b525f7a40e4a5ed99fdfc95897925641"; // Sequel API token

    try {
        const response = await axios.post(
            "https://test.sequel247.com/api/shipment/calculateEDD",
            {
                origin_pincode,
                destination_pincode,
                pickup_date,
                token,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Return the calculated EDD to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error calculating EDD:", error.response?.data || error.message);
        res.status(500).json({
            message: "Error calculating EDD",
            error: error.response?.data || error.message,
        });
    }
});

module.exports = router;
