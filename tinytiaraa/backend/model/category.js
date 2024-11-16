const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
    },
    bannerimg: {
        public_id: {
            type: String,
            // Not required, as per your preference
        },
        url: {
            type: String,
            // Not required, as per your preference
        },
    },
    productbanner: {
        public_id: {
            type: String,
            // Not required, as per your preference
        },
        url: {
            type: String,
            // Not required, as per your preference
        },
    },
    image_Url: {
        public_id: {
            type: String,
            // Not required, as per your preference
        },
        url: {
            type: String,
            // Not required, as per your preference
        },
    },
    type: {
        type: String,
        enum: ['gold', 'silver', 'coin'],
        required: true
    },
    order: {
        type: Number,
        default: 0, // Optional field for sorting/display order
    },
    subcategories: [
        {
          name: String,  // Name of the subcategory
          // You can add more details for each subcategory as needed
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now without parentheses for the default value
    },
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
