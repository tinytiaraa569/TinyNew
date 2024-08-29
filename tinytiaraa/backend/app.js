const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require('cors')
const Razorpay = require("razorpay");
const path = require("path")
const crypto = require('crypto');
require('dotenv').config();

const app = express()



app.use(cors({
    origin: 'https://tiny-tiaraanew.vercel.app',
    credentials: true
}));

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());





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








const referralRoutes = require('./controller/referralRoutes');













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

app.post("/payu/hash", async (req, res) => {
    const { name, email, amount, transactionId } = req.body;

    console.log("Received data:", { name, email, amount, transactionId });

    const data = {
        key: process.env.PAYU_MERCHANT_KEY,
        salt: process.env.PAYU_SALT,
        txnid: transactionId,
        amount: amount,
        productinfo: "TEST PRODUCT",
        firstname: name,
        email: email,
        udf1: 'details1',
        udf2: 'details2',
        udf3: 'details3',
        udf4: 'details4',
        udf5: 'details5',

    };

    const cryp = crypto.createHash('sha512');
    const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|' + data.udf2 + '|' + data.udf3 + '|' + data.udf4 + '|' + data.udf5 + '||||||' + data.salt;

    console.log("String to hash:", string);

    cryp.update(string);
    const hash = cryp.digest('hex');

    console.log("Generated hash:", hash);

    return res.status(200).send({
        hash: hash,
        transactionId: transactionId
    });
});

app.post("/payu/success", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    if (status === "success") {
        // Handle successful payment
        // You can store the transaction details in your database, update order status, etc.

        // Redirect to success page with transaction details
        return res.redirect(`https://tiny-tiaraanew.vercel.app/order/success?txnid=${txnid}&status=success`);
    } else {
        // If the status isn't success, treat it as a failure
        return res.redirect(`https://tiny-tiaraanew.vercel.app/order/failure?txnid=${txnid}&status=${status}`);
    }
});

app.post("/payu/failure", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    // Handle failed payment
    // You can log the failure details, notify the user, etc.

    // Redirect to failure page with transaction details
    return res.redirect(`https://tiny-tiaraanew.vercel.app/order/failure?txnid=${txnid}&status=${status}`);
});

//error handling

app.use(ErrorHandler)
module.exports = app;
;