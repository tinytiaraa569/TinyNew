const express = require("express")
const router = express.Router()

const Product = require("../model/product")
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/Errorhandler")
const Shop = require("../model/shop")
const { isSeller, isAuthenticated } = require("../middleware/auth");

const fs = require('fs')
const Order = require("../model/order")
const cloudinary = require("cloudinary");


//create Product


router.post("/create-product", catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return next(new ErrorHandler("Shop ID is invalid", 400));
        }

        let images = [];
        let withchainimages = [];
        let withchainoutimages = [];

        // metal color 
        let YellowGoldclr = [];
        let RoseGoldclr = [];
        let WhiteGoldclr = [];



        // images 
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        //withchain

        if (typeof req.body.withchainimages === "string") {
            withchainimages.push(req.body.withchainimages);
        } else {
            withchainimages = req.body.withchainimages;
        }
        //without chain
        if (typeof req.body.withchainoutimages === "string") {
            withchainoutimages.push(req.body.withchainoutimages);
        } else {
            withchainoutimages = req.body.withchainoutimages;
        }


        // Metal color
        //yellow clr
        if (typeof req.body.YellowGoldclr === "string") {
            YellowGoldclr.push(req.body.YellowGoldclr);
        } else {
            YellowGoldclr = req.body.YellowGoldclr;
        }

        //RoseGoldclr 
        if (typeof req.body.RoseGoldclr === "string") {
            RoseGoldclr.push(req.body.RoseGoldclr);
        } else {
            RoseGoldclr = req.body.RoseGoldclr;
        }

        //WhiteGoldclr 
        if (typeof req.body.WhiteGoldclr === "string") {
            WhiteGoldclr.push(req.body.WhiteGoldclr);
        } else {
            WhiteGoldclr = req.body.WhiteGoldclr;
        }







        const imagesLinks = [];
        const withchainimagesLinks = [];
        const withchainoutimagesLinks = [];

        //meatl color links
        const YellowGoldclrLinks = [];
        const RoseGoldclrLinks = [];
        const WhiteGoldclrLinks = [];




        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        //with chain
        for (let i = 0; i < withchainimages.length; i++) {
            const result = await cloudinary.v2.uploader.upload(withchainimages[i], {
                folder: "products",
            });

            withchainimagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        //wihtout chian
        for (let i = 0; i < withchainoutimages.length; i++) {
            const result = await cloudinary.v2.uploader.upload(withchainoutimages[i], {
                folder: "products",
            });

            withchainoutimagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // yellow gold clr

        for (let i = 0; i < YellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(YellowGoldclr[i], {
                folder: "products",
            });

            YellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr

        for (let i = 0; i < RoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(RoseGoldclr[i], {
                folder: "products",
            });

            RoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr

        for (let i = 0; i < WhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(WhiteGoldclr[i], {
                folder: "products",
            });

            WhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }




        // Enamel colors

        //deep blue
        let deepblueYellowGoldclr = [];
        let deepblueRoseGoldclr = [];
        let deepblueWhiteGoldclr = [];

        // Metal color
        //deepblueyellow clr
        if (typeof req.body.deepblueYellowGoldclr === "string") {
            deepblueYellowGoldclr.push(req.body.deepblueYellowGoldclr);
        } else {
            deepblueYellowGoldclr = req.body.deepblueYellowGoldclr;
        }

        //deepblueRoseGoldclr 
        if (typeof req.body.deepblueRoseGoldclr === "string") {
            deepblueRoseGoldclr.push(req.body.deepblueRoseGoldclr);
        } else {
            deepblueRoseGoldclr = req.body.deepblueRoseGoldclr;
        }

        //WhiteGoldclr 
        if (typeof req.body.deepblueWhiteGoldclr === "string") {
            deepblueWhiteGoldclr.push(req.body.deepblueWhiteGoldclr);
        } else {
            deepblueWhiteGoldclr = req.body.deepblueWhiteGoldclr;
        }


        const deepblueYellowGoldclrLinks = [];
        const deepblueRoseGoldclrLinks = [];
        const deepblueWhiteGoldclrLinks = [];

        // yellow gold clr

        for (let i = 0; i < deepblueYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepblueYellowGoldclr[i], {
                folder: "products",
            });

            deepblueYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr

        for (let i = 0; i < deepblueRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepblueRoseGoldclr[i], {
                folder: "products",
            });

            deepblueRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr

        for (let i = 0; i < deepblueWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepblueWhiteGoldclr[i], {
                folder: "products",
            });

            deepblueWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // Pink
        let pinkYellowGoldclr = [];
        let pinkRoseGoldclr = [];
        let pinkWhiteGoldclr = [];

        // Metal color
        // pinkYellow clr
        if (typeof req.body.pinkYellowGoldclr === "string") {
            pinkYellowGoldclr.push(req.body.pinkYellowGoldclr);
        } else {
            pinkYellowGoldclr = req.body.pinkYellowGoldclr;
        }

        // pinkRoseGoldclr
        if (typeof req.body.pinkRoseGoldclr === "string") {
            pinkRoseGoldclr.push(req.body.pinkRoseGoldclr);
        } else {
            pinkRoseGoldclr = req.body.pinkRoseGoldclr;
        }

        // pinkWhiteGoldclr
        if (typeof req.body.pinkWhiteGoldclr === "string") {
            pinkWhiteGoldclr.push(req.body.pinkWhiteGoldclr);
        } else {
            pinkWhiteGoldclr = req.body.pinkWhiteGoldclr;
        }

        const pinkYellowGoldclrLinks = [];
        const pinkRoseGoldclrLinks = [];
        const pinkWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < pinkYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(pinkYellowGoldclr[i], {
                folder: "products",
            });

            pinkYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < pinkRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(pinkRoseGoldclr[i], {
                folder: "products",
            });

            pinkRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < pinkWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(pinkWhiteGoldclr[i], {
                folder: "products",
            });

            pinkWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // Turquoise
        let turquoiseYellowGoldclr = [];
        let turquoiseRoseGoldclr = [];
        let turquoiseWhiteGoldclr = [];

        // Metal color
        // turquoiseYellow clr
        if (typeof req.body.turquoiseYellowGoldclr === "string") {
            turquoiseYellowGoldclr.push(req.body.turquoiseYellowGoldclr);
        } else {
            turquoiseYellowGoldclr = req.body.turquoiseYellowGoldclr;
        }

        // turquoiseRoseGoldclr
        if (typeof req.body.turquoiseRoseGoldclr === "string") {
            turquoiseRoseGoldclr.push(req.body.turquoiseRoseGoldclr);
        } else {
            turquoiseRoseGoldclr = req.body.turquoiseRoseGoldclr;
        }

        // turquoiseWhiteGoldclr
        if (typeof req.body.turquoiseWhiteGoldclr === "string") {
            turquoiseWhiteGoldclr.push(req.body.turquoiseWhiteGoldclr);
        } else {
            turquoiseWhiteGoldclr = req.body.turquoiseWhiteGoldclr;
        }

        const turquoiseYellowGoldclrLinks = [];
        const turquoiseRoseGoldclrLinks = [];
        const turquoiseWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < turquoiseYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(turquoiseYellowGoldclr[i], {
                folder: "products",
            });

            turquoiseYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < turquoiseRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(turquoiseRoseGoldclr[i], {
                folder: "products",
            });

            turquoiseRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < turquoiseWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(turquoiseWhiteGoldclr[i], {
                folder: "products",
            });

            turquoiseWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // Red
        let redYellowGoldclr = [];
        let redRoseGoldclr = [];
        let redWhiteGoldclr = [];

        // Metal color
        // redYellow clr
        if (typeof req.body.redYellowGoldclr === "string") {
            redYellowGoldclr.push(req.body.redYellowGoldclr);
        } else {
            redYellowGoldclr = req.body.redYellowGoldclr;
        }

        // redRoseGoldclr
        if (typeof req.body.redRoseGoldclr === "string") {
            redRoseGoldclr.push(req.body.redRoseGoldclr);
        } else {
            redRoseGoldclr = req.body.redRoseGoldclr;
        }

        // redWhiteGoldclr
        if (typeof req.body.redWhiteGoldclr === "string") {
            redWhiteGoldclr.push(req.body.redWhiteGoldclr);
        } else {
            redWhiteGoldclr = req.body.redWhiteGoldclr;
        }

        const redYellowGoldclrLinks = [];
        const redRoseGoldclrLinks = [];
        const redWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < redYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(redYellowGoldclr[i], {
                folder: "products",
            });

            redYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < redRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(redRoseGoldclr[i], {
                folder: "products",
            });

            redRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < redWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(redWhiteGoldclr[i], {
                folder: "products",
            });

            redWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // Black
        let blackYellowGoldclr = [];
        let blackRoseGoldclr = [];
        let blackWhiteGoldclr = [];

        // Metal color
        // blackYellow clr
        if (typeof req.body.blackYellowGoldclr === "string") {
            blackYellowGoldclr.push(req.body.blackYellowGoldclr);
        } else {
            blackYellowGoldclr = req.body.blackYellowGoldclr;
        }

        // blackRoseGoldclr
        if (typeof req.body.blackRoseGoldclr === "string") {
            blackRoseGoldclr.push(req.body.blackRoseGoldclr);
        } else {
            blackRoseGoldclr = req.body.blackRoseGoldclr;
        }

        // blackWhiteGoldclr
        if (typeof req.body.blackWhiteGoldclr === "string") {
            blackWhiteGoldclr.push(req.body.blackWhiteGoldclr);
        } else {
            blackWhiteGoldclr = req.body.blackWhiteGoldclr;
        }

        const blackYellowGoldclrLinks = [];
        const blackRoseGoldclrLinks = [];
        const blackWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < blackYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(blackYellowGoldclr[i], {
                folder: "products",
            });

            blackYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < blackRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(blackRoseGoldclr[i], {
                folder: "products",
            });

            blackRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < blackWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(blackWhiteGoldclr[i], {
                folder: "products",
            });

            blackWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // stocks for metal color


        // Deep Green
        let deepgreenYellowGoldclr = [];
        let deepgreenRoseGoldclr = [];
        let deepgreenWhiteGoldclr = [];

        // Metal color
        // deepgreenYellow clr
        if (typeof req.body.deepgreenYellowGoldclr === "string") {
            deepgreenYellowGoldclr.push(req.body.deepgreenYellowGoldclr);
        } else {
            deepgreenYellowGoldclr = req.body.deepgreenYellowGoldclr;
        }

        // deepgreenRoseGoldclr
        if (typeof req.body.deepgreenRoseGoldclr === "string") {
            deepgreenRoseGoldclr.push(req.body.deepgreenRoseGoldclr);
        } else {
            deepgreenRoseGoldclr = req.body.deepgreenRoseGoldclr;
        }

        // deepgreenWhiteGoldclr
        if (typeof req.body.deepgreenWhiteGoldclr === "string") {
            deepgreenWhiteGoldclr.push(req.body.deepgreenWhiteGoldclr);
        } else {
            deepgreenWhiteGoldclr = req.body.deepgreenWhiteGoldclr;
        }

        const deepgreenYellowGoldclrLinks = [];
        const deepgreenRoseGoldclrLinks = [];
        const deepgreenWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < deepgreenYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepgreenYellowGoldclr[i], {
                folder: "products",
            });

            deepgreenYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < deepgreenRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepgreenRoseGoldclr[i], {
                folder: "products",
            });

            deepgreenRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < deepgreenWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(deepgreenWhiteGoldclr[i], {
                folder: "products",
            });

            deepgreenWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        // Lotus green
        let lotusgreenYellowGoldclr = [];
        let lotusgreenRoseGoldclr = [];
        let lotusgreenWhiteGoldclr = [];

        // Metal color
        // lotusgreenYellow clr
        if (typeof req.body.lotusgreenYellowGoldclr === "string") {
            lotusgreenYellowGoldclr.push(req.body.lotusgreenYellowGoldclr);
        } else {
            lotusgreenYellowGoldclr = req.body.lotusgreenYellowGoldclr;
        }

        // lotusgreenRoseGoldclr
        if (typeof req.body.lotusgreenRoseGoldclr === "string") {
            lotusgreenRoseGoldclr.push(req.body.lotusgreenRoseGoldclr);
        } else {
            lotusgreenRoseGoldclr = req.body.lotusgreenRoseGoldclr;
        }

        // lotusgreenWhiteGoldclr
        if (typeof req.body.lotusgreenWhiteGoldclr === "string") {
            lotusgreenWhiteGoldclr.push(req.body.lotusgreenWhiteGoldclr);
        } else {
            lotusgreenWhiteGoldclr = req.body.lotusgreenWhiteGoldclr;
        }

        const lotusgreenYellowGoldclrLinks = [];
        const lotusgreenRoseGoldclrLinks = [];
        const lotusgreenWhiteGoldclrLinks = [];

        // yellow gold clr
        for (let i = 0; i < lotusgreenYellowGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(lotusgreenYellowGoldclr[i], {
                folder: "products",
            });

            lotusgreenYellowGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // RoseGoldclr clr
        for (let i = 0; i < lotusgreenRoseGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(lotusgreenRoseGoldclr[i], {
                folder: "products",
            });

            lotusgreenRoseGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // WhiteGoldclr clr
        for (let i = 0; i < lotusgreenWhiteGoldclr.length; i++) {
            const result = await cloudinary.v2.uploader.upload(lotusgreenWhiteGoldclr[i], {
                folder: "products",
            });

            lotusgreenWhiteGoldclrLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        const {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            // other fields...
        } = req.body;

        const {
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

            // other fields...
        } = req.body;


        const {gender,ageGroup} = req.body;


        const productData = req.body;
        productData.images = imagesLinks;
        productData.withchainimages = withchainimagesLinks;
        productData.withchainoutimages = withchainoutimagesLinks;
        productData.shop = shop;
        productData.Metalcolorstock = {
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock
        }

        productData.Enamelcolorstock = {
            deepblue: {
                deepblueYellowGoldclrStock,
                deepblueRoseGoldclrStock,
                deepblueWhiteGoldclrStock,
            },
            pink: {
                pinkYellowGoldclrStock,
                pinkRoseGoldclrStock,
                pinkWhiteGoldclrStock
            },
            turquoise: {
                turquoiseYellowGoldclrStock,
                turquoiseRoseGoldclrStock,
                turquoiseWhiteGoldclrStock,

            },
            red: {
                redYellowGoldclrStock,
                redRoseGoldclrStock,
                redWhiteGoldclrStock,
            },
            black: {
                blackYellowGoldclrStock,
                blackRoseGoldclrStock,
                blackWhiteGoldclrStock,
            },
            deepgreen: {
                deepgreenYellowGoldclrStock,
                deepgreenRoseGoldclrStock,
                deepgreenWhiteGoldclrStock,

            },
            lotusgreen: {
                lotusgreenYellowGoldclrStock,
                lotusgreenRoseGoldclrStock,
                lotusgreenWhiteGoldclrStock,

            }






        }



        productData.MetalColor = {
            YellowGoldclr: YellowGoldclrLinks,
            RoseGoldclr: RoseGoldclrLinks,
            WhiteGoldclr: WhiteGoldclrLinks,
        }
        productData.enamelColors = {
            Deep_Blue: {
                deepblueYellowGoldclr: deepblueYellowGoldclrLinks,
                deepblueRoseGoldclr: deepblueRoseGoldclrLinks,
                deepblueWhiteGoldclr: deepblueWhiteGoldclrLinks,
            },
            Deep_Green: {
                deepgreenYellowGoldclr: deepgreenYellowGoldclrLinks,
                deepgreenRoseGoldclr: deepgreenRoseGoldclrLinks,
                deepgreenWhiteGoldclr: deepgreenWhiteGoldclrLinks,
            },
            Lotus_Green: {
                lotusgreenYellowGoldclr: lotusgreenYellowGoldclrLinks,
                lotusgreenRoseGoldclr: lotusgreenRoseGoldclrLinks,
                lotusgreenWhiteGoldclr: lotusgreenWhiteGoldclrLinks,
            },
            Pink: {
                pinkYellowGoldclr: pinkYellowGoldclrLinks,
                pinkRoseGoldclr: pinkRoseGoldclrLinks,
                pinkWhiteGoldclr: pinkWhiteGoldclrLinks,
            },
            Turquoise: {
                turquoiseYellowGoldclr: turquoiseYellowGoldclrLinks,
                turquoiseRoseGoldclr: turquoiseRoseGoldclrLinks,
                turquoiseWhiteGoldclr: turquoiseWhiteGoldclrLinks,
            },
            Red: {
                redYellowGoldclr: redYellowGoldclrLinks,
                redRoseGoldclr: redRoseGoldclrLinks,
                redWhiteGoldclr: redWhiteGoldclrLinks,
            },
            Black: {
                blackYellowGoldclr: blackYellowGoldclrLinks,
                blackRoseGoldclr: blackRoseGoldclrLinks,
                blackWhiteGoldclr: blackWhiteGoldclrLinks,
            },
        };

        productData.gender = gender;
        productData.ageGroup = ageGroup;




        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product,
            enamelColors: product.enamelColors
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error", 400));
    }
}));


// router.post("/create-product", upload.fields([
//     { name: 'images' },
//     { name: 'withchainimages' },
//     { name: 'withchainoutimages' },
//     { name: 'YellowGoldclr' },
//     { name: 'RoseGoldclr' },
//     { name: 'WhiteGoldclr' },
//     { name: 'enamelColors[0].enamelColorImages' },
//     { name: 'enamelColors[0].enamelColorName' },
//     { name: 'enamelColors[1].enamelColorImages' },
//     { name: 'enamelColors[1].enamelColorName' },
//     { name: 'enamelColors[2].enamelColorImages' },
//     { name: 'enamelColors[2].enamelColorName' },
//     {name:'enamelColorImages'}




// ]), catchAsyncErrors(async (req, res, next) => {
//     try {
//         const shopId = req.body.shopId;
//         const shop = await Shop.findById(shopId);

//         if (!shop) {
//             return next(new ErrorHandler("Shop ID is invalid", 400));
//         }

//         const files = req.files;
//         const imageUrls = files.images.map((file) => file.filename);

//         const withChainFiles = files.withchainimages ? files.withchainimages.map((file) => file.filename) : [];
//         const withChainoutFiles = files.withchainoutimages ? files.withchainoutimages.map((file) => file.filename) : [];


//         const YellowGoldclrFiles = files.YellowGoldclr ? files.YellowGoldclr.map((file) => file.filename) : [];
//         const RoseGoldclrFiles = files.RoseGoldclr ? files.RoseGoldclr.map((file) => file.filename) : [];
//         const WhiteGoldclrFiles = files.WhiteGoldclr ? files.WhiteGoldclr.map((file) => file.filename) : [];

//         // Handle enamelColorImages


//         const enamelColors = [];

//         // Iterate through req.files.enamelColors
//         if (req.body.enamelColors && Array.isArray(req.body.enamelColors)) {
//             for (let i = 0; i < req.body.enamelColors.length; i++) {
//                 const enamelColorName = req.body.enamelColors[i].enamelColorName;
//                 const enamelColorImagesUrls = files[`enamelColors[${i}].enamelColorImages`]
//                     ? files[`enamelColors[${i}].enamelColorImages`].map(file => file.filename)
//                     : [];

//                 enamelColors.push({
//                     enamelColorName,
//                     enamelColorImages: enamelColorImagesUrls,
//                 });
//             }
//         }


//         // files.forEach((file, index) => {
//         //     enamelColors.push({
//         //         enamelColorImages: [file.filename], // Assuming only one image per color in this example
//         //         // Optionally include enamelColorName if you have it on the frontend
//         //     });
//         // });




//         const productData = req.body;
//         productData.images = imageUrls;
//         productData.withchainimages = withChainFiles;
//         productData.withchainoutimages = withChainoutFiles;
//         productData.shop = shop;
//         productData.MetalColor = {
//             YellowGoldclr: YellowGoldclrFiles,
//             RoseGoldclr: RoseGoldclrFiles,
//             WhiteGoldclr: WhiteGoldclrFiles,
//         }
//         productData.enamelColors = {enamelColors}


//         const product = await Product.create(productData);

//         res.status(201).json({
//             success: true,
//             product
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message || "Internal Server Error", 400));
//     }
// }));


//get all Products of a shop

router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const products = await Product.find({ shopId: req.params.id })

        res.status(201).json({
            success: true,
            products
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))


//delete product of a shop


router.delete("/delete-shop-product/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id

        const productData = await Product.findById(productId)
        productData.images.forEach((imageUrl) => {
            const filename = imageUrl
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })

        const product = await Product.findByIdAndDelete(productId)


        if (!product) {
            return next(new ErrorHandler('product Not Found with this Id !', 500))
        }

        res.status(201).json({
            success: true,
            message: "Product Deleted Successfully"
        })




    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}))

// get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


//review of a product

router.put("/create-new-review", isAuthenticated, catchAsyncErrors(async (req, res, next) => {

    try {
        const { user, rating, comment, productId, orderId } = req.body;



        const review = {
            user,
            rating,
            comment,
            productId,
        };
        // const files = req.files;
        // const reviewimages = files.reviewimages ? files.reviewimages.map((file) => file.filename) : [];
        // review.reviewimages = reviewimages

        const product = await Product.findById(productId)
        const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id)

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user._id === req.user._id) {
                    (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                }
            });
        } else {
            product.reviews.push(review);
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });

        await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters: [{ "elem._id": productId }], new: true }
        );


        res.status(200).json({
            success: true,
            message: "Reviwed succesfully Posted!",
        });



    } catch (error) {
        return next(new ErrorHandler(error, 400));

    }

}))


//update rate card with all prices 

router.post('/update-rate-card', async (req, res) => {
    const { goldRate, diamondRate, labourCharge, gstCharge, miscellaneous } = req.body;

    try {
        // Ensure all rate inputs are valid numbers
        const parsedGoldRate = parseFloat(goldRate);
        const parsedDiamondRate = parseFloat(diamondRate);
        const parsedLabourCharge = parseFloat(labourCharge);
        const parsedMiscellaneous = parseFloat(miscellaneous || 0);

        if (isNaN(parsedGoldRate) || isNaN(parsedDiamondRate) || isNaN(parsedLabourCharge) || isNaN(parsedMiscellaneous)) {
            throw new Error('Invalid rate card values provided.');
        }

        // Fetch all products
        const products = await Product.find();

        // Update each product's price based on the new rates
        for (const product of products) {
            const goldWeight = parseFloat(product.goldWeight.weight.replace("gm", "").trim());
            const diamondWeight = parseFloat(product.diamondWeight.weight.replace("Ct", "").trim());

            if (isNaN(goldWeight) || isNaN(diamondWeight)) {
                console.warn(`Invalid weights for product ID: ${product._id}`);
                continue; // Skip products with invalid weights
            }

            const goldCost = parsedGoldRate * goldWeight;
            const diamondCost = parsedDiamondRate * diamondWeight;
            const totalLabour = parsedLabourCharge;
            const miscCharge = parsedMiscellaneous;
            const gst = (goldCost + diamondCost + totalLabour + miscCharge) * (parseFloat(gstCharge) / 100 || 0.03); // Default 3% GST

            // Calculate new discount price
            const newDiscountPrice = goldCost + diamondCost + totalLabour + gst + miscCharge;

            // Ensure the discount price is a valid number
            if (isNaN(newDiscountPrice)) {
                console.warn(`Calculated NaN discount price for product ID: ${product._id}`);
                continue; // Skip saving this product if calculation fails
            }

            // Update the product's discount price
            product.discountPrice = newDiscountPrice.toFixed(2);
            // const hikePercentage = 11.111 / 100;
            // const newOriginalPrice = (newDiscountPrice * (1 + hikePercentage)).toFixed(2);

            // product.originalPrice = newOriginalPrice;
            await product.save();
        }

        res.json({ message: 'Rate card and product prices updated successfully!' });
    } catch (error) {
        console.error('Error updating rate card:', error);
        res.status(500).json({ error: 'Failed to update rate card.' });
    }
});



// Update product by ID
router.put("/update-product/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id;

        console.log(productId,"productID")

        // Extract data from the request body
        const {
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
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            goldWeight,
            diamondWeight,
            dimension,
            enamelColors,
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
        } = req.body;

        console.log(req.body,"request data")


        // Prepare the update object
        const updateData = {
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
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            goldWeight,
            diamondWeight,
            dimension,
            enamelColors,
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
        };

        console.log(updateData,"updated data")


        // Find the product by ID and update
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
            new: true, // Return the updated document
            runValidators: true // Validate the update data
        });

        if (!updatedProduct) {
            return next(new ErrorHandler('Product Not Found with this Id!', 404));
        }

        res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));



// router.put("/update-product/:id", catchAsyncErrors(async (req, res, next) => {
//     try {
//         const productId = req.params.id;
//         const product = await Product.findById(productId);
//         if (!product) {
//             return next(new ErrorHandler("Product not found", 404));
//         }

//         const uploadImages = async (imageArray, folder) => {
//             const uploadPromises = imageArray.map(image => 
//                 cloudinary.v2.uploader.upload(image, { folder })
//             );
//             return Promise.all(uploadPromises);
//         };

//         const handleColorImages = async (colorKey) => {
//             const colorImages = req.body[colorKey];
//             if (typeof colorImages === "string") {
//                 return [await cloudinary.v2.uploader.upload(colorImages, { folder: "products" })];
//             } else {
//                 return uploadImages(colorImages, "products");
//             }
//         };

//         // Handle images
//         const imagesLinks = await uploadImages(
//             typeof req.body.images === "string" ? [req.body.images] : req.body.images, 
//             "products"
//         );
//         const withchainimagesLinks = await uploadImages(
//             typeof req.body.withchainimages === "string" ? [req.body.withchainimages] : req.body.withchainimages, 
//             "products"
//         );
//         const withchainoutimagesLinks = await uploadImages(
//             typeof req.body.withchainoutimages === "string" ? [req.body.withchainoutimages] : req.body.withchainoutimages, 
//             "products"
//         );

//         // Handle metal colors
//         const YellowGoldclrLinks = await handleColorImages("YellowGoldclr");
//         const RoseGoldclrLinks = await handleColorImages("RoseGoldclr");
//         const WhiteGoldclrLinks = await handleColorImages("WhiteGoldclr");

//         // Handle enamel colors
//         const deepblueYellowGoldclrLinks = await handleColorImages("deepblueYellowGoldclr");
//         const deepblueRoseGoldclrLinks = await handleColorImages("deepblueRoseGoldclr");
//         const deepblueWhiteGoldclrLinks = await handleColorImages("deepblueWhiteGoldclr");

//         const pinkYellowGoldclrLinks = await handleColorImages("pinkYellowGoldclr");
//         const pinkRoseGoldclrLinks = await handleColorImages("pinkRoseGoldclr");
//         const pinkWhiteGoldclrLinks = await handleColorImages("pinkWhiteGoldclr");

//         const turquoiseYellowGoldclrLinks = await handleColorImages("turquoiseYellowGoldclr");
//         const turquoiseRoseGoldclrLinks = await handleColorImages("turquoiseRoseGoldclr");
//         const turquoiseWhiteGoldclrLinks = await handleColorImages("turquoiseWhiteGoldclr");

//         const redYellowGoldclrLinks = await handleColorImages("redYellowGoldclr");
//         const redRoseGoldclrLinks = await handleColorImages("redRoseGoldclr");
//         const redWhiteGoldclrLinks = await handleColorImages("redWhiteGoldclr");

//         const blackYellowGoldclrLinks = await handleColorImages("blackYellowGoldclr");
//         const blackRoseGoldclrLinks = await handleColorImages("blackRoseGoldclr");
//         const blackWhiteGoldclrLinks = await handleColorImages("blackWhiteGoldclr");

//         const deepgreenYellowGoldclrLinks = await handleColorImages("deepgreenYellowGoldclr");
//         const deepgreenRoseGoldclrLinks = await handleColorImages("deepgreenRoseGoldclr");
//         const deepgreenWhiteGoldclrLinks = await handleColorImages("deepgreenWhiteGoldclr");

//         const lotusgreenYellowGoldclrLinks = await handleColorImages("lotusgreenYellowGoldclr");
//         const lotusgreenRoseGoldclrLinks = await handleColorImages("lotusgreenRoseGoldclr");
//         const lotusgreenWhiteGoldclrLinks = await handleColorImages("lotusgreenWhiteGoldclr");

//         // Update product with new links
//         product.images = imagesLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));
//         product.withchainimages = withchainimagesLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));
//         product.withchainoutimages = withchainoutimagesLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));
//         product.YellowGoldclr = YellowGoldclrLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));
//         product.RoseGoldclr = RoseGoldclrLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));
//         product.WhiteGoldclr = WhiteGoldclrLinks.map(result => ({ public_id: result.public_id, url: result.secure_url }));

//         // Update enamel colors similarly
//         // Add the remaining code for updating product with enamel color links...

//         await product.save();
//         res.status(200).json({ success: true, message: "Product updated successfully", product });
//     } catch (error) {
//         next(error);
//     }
// }));





module.exports = router