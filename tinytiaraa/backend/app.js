const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require('cors')
const Razorpay = require("razorpay");
const path = require("path")
const crypto = require('crypto');
const mongoose = require('mongoose')
require('dotenv').config();
const CryptoJS = require('crypto-js');

const app = express()



app.use(cors({
    origin: 'https://tiny-tiaraanew.vercel.app',
    credentials: true
}));

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());


// const allowedOrigins = [
//     'https://tinytiaraa.com',
//     'https://www.tinytiaraa.com'
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));



app.use("/test", (req, res) => {
    res.send("hello world")

})

// app.use("/", express.static(path.join(__dirname, "./uploads")))
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    })
}

//routes

const user = require("./controller/user")
const shop = require("./controller/shop")
const product = require("./controller/product")
const event = require("./controller/event")
const coupon = require("./controller/coupounCode")
// const payment = require("./controller/payment")
const order = require("./controller/order")
const conversation = require("./controller/conversation")
const message = require("./controller/message")
const customised = require("./controller/Customised")
const contactus = require("./controller/contactus")
const ttclub = require("./controller/ttclub")
const subscribe = require("./controller/subscribe")
const spin = require("./controller/spin")
const banner = require("./controller/banner")
const aboutbanner = require("./controller/aboutbanner")
const custombanner = require("./controller/custombanner")
const contactbanner = require("./controller/contactbanner")
const category = require("./controller/category")











const referralRoutes = require('./controller/referralRoutes');
const calculateEDDRoutes = require("./controller/sequel");
const Order = require("./model/order");

app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
// app.use("/api/v2/payment" ,payment)
app.use("/api/v2/order", order)
app.use("/api/v2/conversation", conversation)
app.use("/api/v2/message", message)
app.use('/api/v2/referral', referralRoutes);
app.use('/api/v2/customised', customised);
app.use('/api/v2/contactus', contactus);
app.use('/api/v2/ttclub', ttclub);
app.use('/api/v2/subscribe', subscribe);
app.use('/api/v2/spin', spin);

app.use("/api/v2", banner);
app.use("/api/v2", aboutbanner);
app.use("/api/v2", custombanner);
app.use("/api/v2", contactbanner);





app.use("/api/v2", calculateEDDRoutes);
app.use("/api/v2", category);







app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error");
        }

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
});

// PayU payment initiation route

// app.post("/payu/hash", async (req, res) => {
//     const { name, email, amount, transactionId } = req.body;

//     console.log("Received data:", { name, email, amount, transactionId });

//     const data = {
//         key: process.env.PAYU_MERCHANT_KEY,
//         salt: process.env.PAYU_SALT,
//         txnid: transactionId,
//         amount: amount,
//         productinfo: "TEST PRODUCT",
//         firstname: name,
//         email: email,
//         udf1: 'details1',
//         udf2: 'details2',
//         udf3: 'details3',
//         udf4: 'details4',
//         udf5: 'details5',

//     };

//     const cryp = crypto.createHash('sha512');
//     const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|' + data.udf2 + '|' + data.udf3 + '|' + data.udf4 + '|' + data.udf5 + '||||||' + data.salt;

//     console.log("String to hash:", string);

//     cryp.update(string);
//     const hash = cryp.digest('hex');

//     console.log("Generated hash:", hash);

//     return res.status(200).send({
//         hash: hash,
//         transactionId: transactionId
//     });
// });


app.post("/payu/hash", async (req, res) => {
    function decryptAmount(encryptedAmount, encryptionKey) {
        try {
            // The encrypted string in the format: U2FsdGVkX18fQ0ir73v9GOPIA52hYrKuezlqaxuz4U0=
            // CryptoJS AES encrypts the data in base64 and includes a header like 'U2FsdGVkX1' for OpenSSL encryption compatibility.
            
            // Decode the base64 encrypted data
            const encryptedBytes = CryptoJS.AES.decrypt(encryptedAmount, encryptionKey);
    
            // If the decryption process failed
            if (!encryptedBytes) {
                throw new Error("Decryption failed");
            }
    
            // Convert the decrypted bytes back to a string
            const decryptedText = encryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedText; // Return the decrypted amount
        } catch (error) {
            console.error("Decryption error:", error);
            throw new Error("Decryption failed");
        }
    }

    try {
        const { name, email, amount, transactionId } = req.body;
        const encryptionKey = 'qwertyuiopasdfghjklzxcvbnm123456'; // Replace with your actual key

        console.log("Received data:", { name, email, transactionId ,amount });

        // Encrypt the amount for PayU
        const decryptedAmount = decryptAmount(amount, encryptionKey);
        console.log("Decrypted amount:", decryptedAmount); // Should log the orig
        // Prepare the data to generate the hash
        const data = {
            key: process.env.PAYU_MERCHANT_KEY,
            salt: process.env.PAYU_SALT,
            txnid: transactionId,
            amount: decryptedAmount, // Use plain amount here for hash generation
            productinfo: "TEST PRODUCT",
            firstname: name,
            email: email,
            udf1: 'details1',
            udf2: 'details2',
            udf3: 'details3',
            udf4: 'details4',
            udf5: 'details5',
        };

        // Generate the hash using the original, unencrypted amount
        const cryp = crypto.createHash('sha512');
        const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|' + data.udf2 + '|' + data.udf3 + '|' + data.udf4 + '|' + data.udf5 + '||||||' + data.salt;

        console.log("String to hash:", string);

        cryp.update(string);
        const hash = cryp.digest('hex');

        console.log("Generated hash:", hash);

        // Return the hash and encrypted amount to frontend
        return res.status(200).send({
            hash: hash,
            transactionId: transactionId,
           
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ error: "Server error occurred" });
    }
});

// payu  new route crypto.hash

// app.post("/payu/hash", async (req, res) => {
//     const { name, email, amount, transactionId } = req.body;

//     console.log("Received data:", { name, email, amount, transactionId });

//     const data = {
//         key: process.env.PAYU_MERCHANT_KEY,
//         salt: process.env.PAYU_SALT,
//         txnid: transactionId,
//         amount: amount,
//         productinfo: "TEST PRODUCT",
//         firstname: name,
//         email: email,
//         udf1: 'details1',
//         udf2: 'details2',
//         udf3: 'details3',
//         udf4: 'details4',
//         udf5: 'details5',
//     };

//     // Construct the hash string following PayU's format
//     const stringToHash = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}||||||${data.salt}`;

//     console.log("String to hash:", stringToHash);

//     // Use crypto to hash the string
//     const cryp = crypto.createHash('sha512');
//     cryp.update(stringToHash);
//     const hash = cryp.digest('hex');

//     console.log("Generated hash:", hash);

//     return res.status(200).send({
//         hash: hash,
//         transactionId: transactionId
//     });
// });

app.post("/payu/success", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    if (status === "success") {
        // Handle successful payment
        // You can store the transaction details in your database, update order status, etc.

        // Redirect to success page with transaction details
        return res.redirect(`https://www.tinytiaraa.com/payu/order/success?txnid=${txnid}&status=success`);
    } else {
        // If the status isn't success, treat it as a failure
        return res.redirect(`https://www.tinytiaraa.com/payu/order/failure?txnid=${txnid}&status=${status}`);
    }
});

app.post("/payu/failure", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    console.log(req,"from backend payu")

    // Handle failed payment
    // You can log the failure details, notify the user, etc.

    // Redirect to failure page with transaction details
    return res.redirect('https://www.tinytiaraa.com/payment');
});


// app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

app.get('/invoices/:orderId', async (req, res) => {
    try {
        // Make sure you're retrieving the order by its ObjectId, not a string filename
        const orderId = req.params.orderId;

        // Validate that the orderId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID' });
        }

        const order = await Order.findById(orderId);

        if (!order || !order.invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Convert the Base64 string back to a buffer
        const pdfBuffer = Buffer.from(order.invoice, 'base64');

        // Set the appropriate headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${order._id}.pdf`);

        // Send the PDF buffer to the client
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.post("/calculateEDD", async (req, res) => {
//     const { origin_pincode, destination_pincode, pickup_date } = req.body;
//     const token = "b525f7a40e4a5ed99fdfc95897925641"; // Use the token from Sequel API

//     try {
//         const response = await axios.post(
//             "https://test.sequel247.com/api/shipment/calculateEDD",
//             {
//                 origin_pincode,
//                 destination_pincode,
//                 pickup_date,
//                 token,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
        
//         // Return the calculated EDD to the frontend
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error calculating EDD:", error.response?.data || error.message);
//         res.status(500).json({
//             message: "Error calculating EDD",
//             error: error.response?.data || error.message,
//         });
//     }
// });
//error handling


app.get('/api/conversion-rates', (req, res) => {
    const conversionRates = {
      INR: 1,
      USD: 0.012,
      EUR: 0.011,
      // Add more currencies if needed
    };
    res.json(conversionRates);
  });
app.use(ErrorHandler)
module.exports = app;
