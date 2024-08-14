const express = require('express')
const router = express.Router()
const ErrorHandler = require('../utils/Errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const { isAuthenticated, isSeller } = require('../middleware/auth')

const Order = require("../model/order")
const Product = require("../model/product")
const sendOrder = require('../utils/sendOrder');
const Referral = require('../model/referralModel');
const User = require('../model/user');


const { render } = require("@react-email/components")



const Welcome = require("@react-email/components").default;
// const { Welcome } = require("@react-email/components");


//create new order 


// router.post("/create-order" ,catchAsyncErrors(async (req, res, next) => {

//     try {

//         const { cart, shippingAddress, user, totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;
//         const metalColors = {
//             0: "Yellow Gold",
//             1: "Rose Gold",
//             2: "White Gold",
//         };
//         const backend_url = "http://localhost:8000/"

//         const htmlContent = `
//         <html>

// <head>
//     <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
//         rel="stylesheet">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             font-family: "Poppins", sans-serif;
//             box-sizing: border-box;
//         }

//         .headeremail {
//             padding-bottom: 10px;
//         }

//         .emailconfirm {
//             padding-top: 50px;
//             width: 50%;
//             margin: auto;

//         }

//         .yourorder {
//             padding: 30px 0;
//         }

//         .orderdetails {
//             height: 230px;
//             padding: 20px;

//         }

//         .totalcost {
//             margin-top: 10px !important;
//             padding: 15px 0;
//             border-top: 1px solid grey;
//         }

//         .totalcost {
//             text-align: end;
//         }

//         .shippingaddress {
//             padding: 10px 0;
//         }

//         .adjustw {
//             width: 30% !important;
//             float: left !important;
//         }

//         .adjustw1 {
//             width: 65% !important;
//             float: left !important;
//         }

//         @media (max-width:1100px) {
//             .emailconfirm {
//                 width: 65%;

//             }
//         }

//         @media (max-width:800px) {
//             .emailconfirm {
//                 width: 80%;

//             }
//         }

//         @media (max-width:650px) {
//             .emailconfirm {
//                 width: 80%;
//             }

//             .orderdetails {
//                     height: auto;
//                     padding: 0px;

//             }

//             .headeremail {
//                 align-items: center;
//             }

//             .adj {
//                 font-size: 25px;
//             }

//             .a1adjust {
//                 width: 75% !important;
//             }

//             .a2adjust {
//                 width: 25% !important;

//             }

//             .adjustw {
//                 width: 100% !important;
//             }

//             .adjustw1 {
//                 width: 100% !important;
//             }


//         }
//     </style>
// </head>

// <body>
//     <div class="emailconfirm">
//         <div>


//             <div class="headeremail">
//                 <div style="width: 90%;float: left;" class="a1adjust">
//                     <h1 class="adj" style="font-weight: 600;">Order Confirmation</h1>
//                     <p style="font-size: 14px;color: #000000c0;">OrderId :- ${cart[0]._id}</p>
//                 </div>
//                 <div style="width: 10%;float: left;" class="a2adjust">
//                     <img style="width: 100px; height: 100px; object-fit: contain;"
//                         src="https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4185711157.png" alt="">
//                 </div>
//             </div>

//             <div style="clear: both;">
//                 <p>Dear ${shippingAddress.name},</p>
//                 <p>We have received your Tiny Tiaraa order! Thank you for your purchase.</p>
//             </div>


//             <div class="yourorder">
//                 <div>
//                     <!-- <div style="width: 75%;float: left;" class="adjust4">
//                     </div> -->
//                     <h3>Order Summary </h3>


//                 </div>

//                 ${cart.map(item => `

//                     <div class="orderdetails" style="clear: both;">
//                     <div style="width: 200px; height: 200px;margin-top: 8px;" class="adjustw">
//                         <img style="width: 200px; height: 200px;"
//                         src="https://d11s7fcxy18ubx.cloudfront.net/node/static/2024/2024-33032-g1a1225a3b57fe3/icons/notification_yoda.jpg"
//                             // src="${backend_url}${item.images[0]}"
//                             alt="">
//                     </div>
//                     <div style="padding-left: 20px;padding-bottom: 20px;" class="adjustw1">
//                         <h3 style="font-size: 15px;">${item.name}</h3>
//                         <p style="font-size: 13px;color: #0000008b;"><span>${item.skuid}</span></p>
//                         <p style="font-size: 14px;">Metal Color :- ${metalColors[item.selectedColor]}</p>
//                         <p style="font-size: 14px;">Chain :- ${item.showWithChain ? 'With Chain' : 'Without Chain'}</p>
//                         <p style="font-size: 14px;">Enamel Color :- Red</p>

//                         <div style="padding-top: 5px;">
//                             <p> ${item.qty} x ${item.discountPrice}</p>
//                         </div>

//                     </div>

//                 </div>`).join('')}



//                 <div class="totalcost" style="clear: both;">
//                     <div>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">SubTotal :</span>
//                             ₹${totalPrice}</p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;"> shipping :
//                             </span>Free </p>
//                         <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">Coupon :</span> ₹${couponDiscount ? couponDiscount : 'No coupon applied'} </p>
//                         <p style="text-align: end;"> <span style="font-weight: 600;padding-right: 5x;">Total :</span> ₹${totalPrice}</p>

//                     </div>
//                 </div>
//                 <div class="shippingaddress">
//                     <h3>Shiping Address </h3>
//                     <div style="padding-top: 10px;">
//                         <p>${shippingAddress.name}</p>
//                         <p>Email: ${shippingAddress.email}</p>
//                         <p>${shippingAddress.address1}</p>
//                         <p>${shippingAddress.address2}</p>
//                         <p>${shippingAddress.city} ${shippingAddress.country} ${shippingAddress.zipCode}</p>
//                         <p>${shippingAddress.phoneNumber}</p>
//                     </div>



//                 </div>
//                 <div style="padding-top: 15px;">
//                     <h3>Payment Method </h3>
//                     <div style="padding-top: 5px;">
//                         <p>Status : <span>${paymentInfo.status ? paymentInfo.status : "Not Paid"}</span></p>
//                         <p>Payment Type :- ${paymentInfo.type}</p>
//                     </div>

//                 </div>
//                 <div style="text-align: center; padding: 15px 0;">
//                     <button
//                         style="padding: 10px 22px;background-color: black;color: white;border: none;font-size: 17px;border-radius: 2px;cursor: pointer;">View
//                         Order Details</button>
//                 </div>


//                 <div style="padding: 10px 4px;">
//                     <h4 style="padding: 6px 0;font-size: 18px; font-weight: 500;">Thanks for shopping with us!</h4>
//                     <p style="padding-top: 7px;">You can check the status of your orders at any time on our Orders
//                         History Page.</p>
//                     <p style="padding-top: 7px;">We welcome you to our store anytime. If you need assistance or have any
//                         questions, please email us at <span><a style="color: rgb(42, 42, 226);"
//                                 href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a></span> or call +91 86570
//                         62511. We are happy to help!</p>

//                     <p style="padding-top: 10px;">Sincerely,</p>
//                     <p>Tiny Tiaraa</p>

//                 </div>

//             </div>


//             <div style="color: #3535358b;font-size: 12px;padding-bottom: 20px;">
//                 <p>© Tiny Tiaraa</p>
//                 <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central
//                     Road, Opp. Seepz Main Gate,, WICEL,Andheri(East),, Mumbai, 400093, Maharashtra, India</p>
//                 <p>GST registration number: 27AAKCR3049R1ZL</p>
//             </div>

//         </div>
//     </div>
// </body>

// </html>

//         `

//         const shopItemsMap = new Map();

//         for (const item of cart) {
//             const shopId = item.shopId;
//             if (!shopItemsMap.has(shopId)) {
//                 shopItemsMap.set(shopId, [])
//             }
//             shopItemsMap.get(shopId).push(item)
//         }

//         //order for 1 shop

//         const orders = []

//         for (const [shopId, items] of shopItemsMap) {
//             const order = await Order.create({ cart: items, shippingAddress, user, totalPrice, paymentInfo, couponDiscount });
//             orders.push(order)
//         }

//         // Debugging: Check if referral code is present
//         console.log('Referral code:', referralCode);

//         if (referralCode) {
//             const referral = await Referral.findOne({ referralCode });

//             // Debugging: Check if referral is found
//             console.log('Referral found:', referral);

//             if (!referral) {
//                 return next(new ErrorHandler('Invalid referral code', 400));
//             }

//             if (referral.referralUsed) {
//                 console.log('Referral code already used');
//                 return res.status(400).json({ success: false, message: 'Referral code already used' });
//             }

//             try {
//                 for (const order of orders) {
//                     order.referralCodeUsed = referralCode;
//                     order.referredUser = req.user.id;
//                     await order.save();

//                     // Debugging: Check if order is updated with referral code
//                     console.log('Order updated with referral code:', order._id);
//                 }

//                 // const referrer = await User.findById(referral.referrer);
//                 const referrer = referral.referrer;

//                 // Debugging: Check if referrer is found
//                 console.log('Referrer found:', referrer);

//                 if (!referrer) {
//                     return next(new ErrorHandler('Referrer not found', 404));
//                 }

//                 referrer.referralBalance += referral.rewardAmount;
//                 await referrer.save();

//                 referral.referralUsed = true;
//                 referral.referredUser = req.user.id;
//                 await referral.save();

//                 // Debugging: Log updated referrer balance
//                 console.log('Updated referrer balance:', referrer.referralBalance);

//             } catch (error) {
//                 console.error('Error applying referral:', error.message);
//                 console.error('Stack trace:', error.stack);
//                 console.error('Referral Code:', referralCode);
//                 console.error('Referral:', referral);
//                 console.error('Orders:', orders);
//                 console.error('Error applying referral:', error);
//                 return next(new ErrorHandler('An error occurred while applying the referral', 500));
//             }
//         }
//         try {
//             await sendOrder({
//                 email: user.email,
//                 subject: "Order Confirmation mail",
//                 html: htmlContent

//             })


//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));

//         }


//         res.status(201).json({
//             success: true,
//             orders
//         })


//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));


//     }
// }))

// router.post(
//     "/create-order",
//     catchAsyncErrors(async (req, res, next) => {
//         const { cart, shippingAddress, totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;

//         try {
//             // Determine the user or guest email
//             const userId = req.user ? req.user._id : null;
//             const guestEmail = shippingAddress.email; // Assuming shippingAddress contains email
//             const guestName = shippingAddress.name;
//             // Create order object
//             const orderData = {
//                 cart,
//                 shippingAddress,
//                 user: userId, // Store user ID if authenticated
//                 totalPrice,
//                 paymentInfo,
//                 couponDiscount,
//                 referralCodeUsed: referralCode || null,
//                 guestEmail: userId ? null : guestEmail, // Store guest email if user is not authenticated
//                 guestName: userId ? null : guestName, // Store guest email if user is not authenticated

//             };

//             const order = await Order.create(orderData);

//             // Handle referral code if provided
//             if (referralCode) {
//                 const referral = await Referral.findOne({ referralCode }).populate("referrer");

//                 if (!referral) {
//                     return next(new ErrorHandler("Invalid referral code", 400));
//                 }

//                 if (referral.referralUsed) {
//                     return res.status(400).json({ success: false, message: "Referral code already used" });
//                 }

//                 // Update referral and referrer
//                 referral.referralUsed = true;
//                 referral.referredUsers = userId || null; // Set referredUser if user is authenticated
//                 referral.referredGuestEmails = userId ? null : guestEmail; // Set guest email if user is not authenticated
//                 referral.referredGuestNames = userId ? null : guestName;
//                 await referral.save();

//                 const referrer = referral.referrer;

//                 if (!referrer) {
//                     return next(new ErrorHandler("Referrer not found", 404));
//                 }

//                 referrer.referralBalance += referral.rewardAmount;
//                 await referrer.save();
//             }

//             res.status(201).json({
//                 success: true,
//                 order,
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );



// router.post(
//     "/create-order",
//     catchAsyncErrors(async (req, res, next) => {
//         const { cart, shippingAddress, totalPrice, paymentInfo, couponDiscount, referralCode, referralPointsApplied } = req.body;

//         try {
//             // Determine the user or guest details
//             const userId = req.user ? req.user._id : null;
//             const guestEmail = shippingAddress.email;
//             const guestName = shippingAddress.name;

//             // Calculate the updated total price considering referral points applied
//             const updatedTotalPrice = totalPrice - (referralPointsApplied || 0);
//             console.log('Updated Total Price:', updatedTotalPrice);

//             // Create the order object
//             const orderData = {
//                 cart,
//                 shippingAddress,
//                 user: userId,
//                 totalPrice: updatedTotalPrice,
//                 paymentInfo,
//                 couponDiscount,
//                 referralCodeUsed: referralCode || null,
//                 guestEmail: userId ? null : guestEmail,
//                 guestName: userId ? null : guestName,
//                 rewardAmount: 200, // Assume a fixed reward amount
//                 referralPointsApplied: referralPointsApplied || 0,
//             };

//             // Create the order in the database
//             const order = await Order.create(orderData);
//             console.log('Order Data:', orderData);

//             // Handle referral code if provided
//             if (referralCode) {
//                 const referral = await Referral.findOne({ referralCode }).populate('referrer');

//                 // Check if the referral code is valid and not used
//                 if (!referral) {
//                     return next(new ErrorHandler('Invalid referral code', 400));
//                 }

//                 let rewardGranted = false;

//                 // Check if the referral is valid for a new user or guest
//                 if (userId && !referral.referredUsers.includes(userId)) {
//                     referral.referredUsers.push(userId);
//                     rewardGranted = true;
//                 } else if (guestEmail && !referral.referredGuestEmails.includes(guestEmail)) {
//                     referral.referredGuestEmails.push(guestEmail);
//                     referral.referredGuestNames.push(guestName || 'Unknown');
//                     rewardGranted = true;
//                 }

//                 // Grant referral reward if applicable
//                 if (rewardGranted) {
//                     const referrer = referral.referrer;
//                     console.log('Referrer:', referrer);

//                     if (referrer) {
//                         const rewardAmount = 200;
//                         referrer.referralBalance = (referrer.referralBalance || 0) + rewardAmount;
//                         await referrer.save();
//                         console.log('Referrer Balance Updated:', referrer.referralBalance);

//                         referral.referralUsed = true;
//                         await referral.save();
//                         console.log('Referral Marked as Used:', referral);
//                     } else {
//                         return next(new ErrorHandler('Referrer not found', 404));
//                     }
//                 }
//             }

//             // Deduct referral points if applicable
//             if (userId && referralPointsApplied > 0) {
//                 const user = await User.findById(userId);
//                 if (!user) {
//                     return next(new ErrorHandler('User not found', 404));
//                 }

//                 if (user.referralBalance < referralPointsApplied) {
//                     return next(new ErrorHandler('Insufficient referral balance', 400));
//                 }

//                 user.referralBalance -= referralPointsApplied;
//                 await user.save();
//                 console.log('User Referral Balance Updated:', user.referralBalance);
//             }

//             // Respond with order details
//             res.status(201).json({
//                 success: true,
//                 order,
//             });
//         } catch (error) {
//             console.error('Error creating order:', error);
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );

router.post(
    "/create-order",
    catchAsyncErrors(async (req, res, next) => {
        const { cart, user, shippingAddress, totalPrice, paymentInfo, couponDiscount, referralCode } = req.body;
        const metalColors = {
            0: "Yellow Gold",
            1: "Rose Gold",
            2: "White Gold",
        };
        const backend_url = "https://tinytiaraa.vercel.app/"

        const htmlContent = `
                <html>
        
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    font-family: "Poppins", sans-serif;
                    box-sizing: border-box;
                }
        
                .headeremail {
                    padding-bottom: 10px;
                }
        
                .emailconfirm {
                    padding-top: 50px;
                    width: 50%;
                    margin: auto;
        
                }
        
                .yourorder {
                    padding: 30px 0;
                }
        
                .orderdetails {
                    height: 230px;
                    padding: 20px;
        
                }
        
                .totalcost {
                    margin-top: 10px !important;
                    padding: 15px 0;
                    border-top: 1px solid grey;
                }
        
                .totalcost {
                    text-align: end;
                }
        
                .shippingaddress {
                    padding: 10px 0;
                }
        
                .adjustw {
                    width: 30% !important;
                    float: left !important;
                }
        
                .adjustw1 {
                    width: 65% !important;
                    float: left !important;
                }
        
                @media (max-width:1100px) {
                    .emailconfirm {
                        width: 65%;
        
                    }
                }
        
                @media (max-width:800px) {
                    .emailconfirm {
                        width: 80%;
        
                    }
                }
        
                @media (max-width:650px) {
                    .emailconfirm {
                        width: 80%;
                    }
        
                    .orderdetails {
                            height: auto;
                            padding: 0px;
        
                    }
        
                    .headeremail {
                        align-items: center;
                    }
        
                    .adj {
                        font-size: 25px;
                    }
        
                    .a1adjust {
                        width: 75% !important;
                    }
        
                    .a2adjust {
                        width: 25% !important;
        
                    }
        
                    .adjustw {
                        width: 100% !important;
                    }
        
                    .adjustw1 {
                        width: 100% !important;
                    }
        
        
                }
            </style>
        </head>
        
        <body>
            <div class="emailconfirm">
                <div>
        
        
                    <div class="headeremail">
                        <div style="width: 90%;float: left;" class="a1adjust">
                            <h1 class="adj" style="font-weight: 600;">Order Confirmation</h1>
                            <p style="font-size: 14px;color: #000000c0;">OrderId :- ${cart[0]._id}</p>
                        </div>
                        <div style="width: 10%;float: left;" class="a2adjust">
                            <img style="width: 100px; height: 100px; object-fit: contain;"
                                src="https://d2j6dbq0eux0bg.cloudfront.net/images/90976509/4185711157.png" alt="">
                        </div>
                    </div>
        
                    <div style="clear: both;">
                        <p>Dear ${shippingAddress.name},</p>
                        <p>We have received your Tiny Tiaraa order! Thank you for your purchase.</p>
                    </div>
        
        
                    <div class="yourorder">
                        <div>
                            <!-- <div style="width: 75%;float: left;" class="adjust4">
                            </div> -->
                            <h3>Order Summary </h3>
        
        
                        </div>
        
                        ${cart.map(item => `
        
                            <div class="orderdetails" style="clear: both;">
                            <div style="width: 200px; height: 200px;margin-top: 8px;" class="adjustw">
                                <img style="width: 200px; height: 200px;"
                                src="https://d11s7fcxy18ubx.cloudfront.net/node/static/2024/2024-33032-g1a1225a3b57fe3/icons/notification_yoda.jpg"
                                    // src="${backend_url}${item.images[0]}"
                                    alt="">
                            </div>
                            <div style="padding-left: 20px;padding-bottom: 20px;" class="adjustw1">
                                <h3 style="font-size: 15px;">${item.name}</h3>
                                <p style="font-size: 13px;color: #0000008b;"><span>${item.skuid}</span></p>
                                <p style="font-size: 14px;">Metal Color :- ${metalColors[item.selectedColor]}</p>
                                <p style="font-size: 14px;">Chain :- ${item.showWithChain ? 'With Chain' : 'Without Chain'}</p>
                                <p style="font-size: 14px;">Enamel Color :- Red</p>
        
                                <div style="padding-top: 5px;">
                                    <p> ${item.qty} x ${item.discountPrice}</p>
                                </div>
        
                            </div>
        
                        </div>`).join('')}
        
        
        
                        <div class="totalcost" style="clear: both;">
                            <div>
                                <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">SubTotal :</span>
                                    ₹${totalPrice}</p>
                                <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;"> shipping :
                                    </span>Free </p>
                                <p style="text-align: end;"><span style="font-weight: 600;padding-right: 5x;">Coupon :</span> ₹${couponDiscount ? couponDiscount : 'No coupon applied'} </p>
                                <p style="text-align: end;"> <span style="font-weight: 600;padding-right: 5x;">Total :</span> ₹${totalPrice}</p>
        
                            </div>
                        </div>
                        <div class="shippingaddress">
                            <h3>Shiping Address </h3>
                            <div style="padding-top: 10px;">
                                <p>${shippingAddress.name}</p>
                                <p>Email: ${shippingAddress.email}</p>
                                <p>${shippingAddress.address1}</p>
                                <p>${shippingAddress.address2}</p>
                                <p>${shippingAddress.city} ${shippingAddress.country} ${shippingAddress.zipCode}</p>
                                <p>${shippingAddress.phoneNumber}</p>
                            </div>
        
        
        
                        </div>
                        <div style="padding-top: 15px;">
                            <h3>Payment Method </h3>
                            <div style="padding-top: 5px;">
                                <p>Status : <span>${paymentInfo.status ? paymentInfo.status : "Not Paid"}</span></p>
                                <p>Payment Type :- ${paymentInfo.type}</p>
                            </div>
        
                        </div>
                        <div style="text-align: center; padding: 15px 0;">
                            <button
                                style="padding: 10px 22px;background-color: black;color: white;border: none;font-size: 17px;border-radius: 2px;cursor: pointer;">View
                                Order Details</button>
                        </div>
        
        
                        <div style="padding: 10px 4px;">
                            <h4 style="padding: 6px 0;font-size: 18px; font-weight: 500;">Thanks for shopping with us!</h4>
                            <p style="padding-top: 7px;">You can check the status of your orders at any time on our Orders
                                History Page.</p>
                            <p style="padding-top: 7px;">We welcome you to our store anytime. If you need assistance or have any
                                questions, please email us at <span><a style="color: rgb(42, 42, 226);"
                                        href="mailto:care@tinytiaraa.com">care@tinytiaraa.com</a></span> or call +91 86570
                                62511. We are happy to help!</p>
        
                            <p style="padding-top: 10px;">Sincerely,</p>
                            <p>Tiny Tiaraa</p>
        
                        </div>
        
                    </div>
        
        
                    <div style="color: #3535358b;font-size: 12px;padding-bottom: 20px;">
                        <p>© Tiny Tiaraa</p>
                        <p>Ru- Brama Retail Private Limited, Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central
                            Road, Opp. Seepz Main Gate,, WICEL,Andheri(East),, Mumbai, 400093, Maharashtra, India</p>
                        <p>GST registration number: 27AAKCR3049R1ZL</p>
                    </div>
        
                </div>
            </div>
        </body>
        
        </html>
        
                `

        try {
            const userId = req.user ? req.user._id : null;
            const guestEmail = shippingAddress.email;
            const guestName = shippingAddress.name;

            const orderData = {
                cart,
                shippingAddress,
                user: userId,
                totalPrice,
                paymentInfo,
                couponDiscount,
                referralCodeUsed: referralCode || null,
                referredGuestEmail: userId ? null : guestEmail,
                referredGuestName: userId ? null : guestName,
                rewardAmount: 200 // Adjust based on your logic
            };

            const order = await Order.create(orderData);

            if (referralCode) {
                const referral = await Referral.findOne({ referralCode }).populate('referrer');
                if (!referral) {
                    return next(new ErrorHandler('Invalid referral code', 400));
                }

                let rewardGranted = false;

                if (userId && !referral.referredUsers.includes(userId)) {
                    referral.referredUsers.push(userId);
                    rewardGranted = true;
                } else if (guestEmail && !referral.referredGuestEmails.includes(guestEmail)) {
                    referral.referredGuestEmails.push(guestEmail);
                    referral.referredGuestNames.push(guestName || 'Unknown');
                    rewardGranted = true;
                }

                if (rewardGranted) {
                    const referrer = referral.referrer;

                    if (referrer) {
                        // Assuming each order has a fixed reward amount of 200 INR
                        const rewardAmount = 200;

                        referrer.referralBalance = (referrer.referralBalance || 0) + rewardAmount;
                        await referrer.save();

                        referral.referralUsed = true;
                        await referral.save();
                    } else {
                        return next(new ErrorHandler('Referrer not found', 404));
                    }
                }
            }

            try {
                await sendOrder({
                    email: user ? user.email : shippingAddress.email,
                    subject: "Order Confirmation mail",
                    html: htmlContent

                })


            } catch (error) {
                return next(new ErrorHandler(error.message, 500));

            }

            res.status(201).json({ success: true, order });
        } catch (error) {
            console.error('Error creating order:', error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);





// get all orders of users

router.get("/get-all-orders/:userId", catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find({ "user._id": req.params.userId }).sort({
            createdAt: -1,
        })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))


// get all orders of seller

router.get(
    "/get-seller-all-orders/:shopId",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const orders = await Order.find({
                "cart.shopId": req.params.shopId,
            }).sort({
                createdAt: -1,
            });

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


//order update details status


router.put("/update-order-status/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 400));
        }
        if (req.body.status === "Shipping") {
            order.cart.forEach(async (o) => {
                await updateOrder(o._id, o.qty);
            });
        }
        order.status = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "Succeeded";

        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            order,
        });

        async function updateOrder(id, qty) {
            const product = await Product.findById(id);

            product.stock -= qty;
            product.sold_out += qty;

            await product.save({ validateBeforeSave: false });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))

//give a refund 

router.put(
    "/order-refund/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this id", 400));
            }

            order.status = req.body.status;

            await order.save({ validateBeforeSave: false });

            res.status(200).json({
                success: true,
                order,
                message: "Order Refund Request successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// accept the refund

router.put(
    "/order-refund-success/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id);

            if (!order) {
                return next(new ErrorHandler("Order not found with this id", 400));
            }

            order.status = req.body.status;

            await order.save();

            res.status(200).json({
                success: true,
                message: "Order Refund successfull!",
            });

            if (req.body.status === "refund Success") {
                order.cart.forEach(async (o) => {
                    await updateOrder(o._id, o.qty);
                });
            }

            async function updateOrder(id, qty) {
                const product = await Product.findById(id);

                product.stock += qty;
                product.sold_out -= qty;

                await product.save({ validateBeforeSave: false });
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);




module.exports = router
