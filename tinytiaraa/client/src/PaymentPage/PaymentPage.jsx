import React, { useEffect, useState } from 'react'
import razopayimg from './images/razorpay-icon.svg'
import { backend_url, server } from '@/server';
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '@/redux/actions/order';

function PaymentPage() {
    const [orderData, setOrderData] = useState([])
    const [orderID, setOrderID] = useState(null)
    const [fullCountryName, setFullCountryName] = useState('');
    const [fullStateName, setFullStateName] = useState('');



    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const getReferralCode = () => {
        const referralCode = sessionStorage.getItem('referralCode');
        console.log('Retrieved referral code:', referralCode); // Debugging line
        return referralCode;
    };

    useEffect(() => {
        if (orderData?.shippingAddress?.country) {
            const country = Country.getCountryByCode(orderData.shippingAddress.country);
            setFullCountryName(country?.name || '');
        } else {
            setFullCountryName('');
        }
    }, [orderData?.shippingAddress?.country]);

    useEffect(() => {
        if (orderData?.shippingAddress?.city && orderData?.shippingAddress?.country) {
            const state = State.getStateByCodeAndCountry(orderData.shippingAddress.city, orderData.shippingAddress.country);
            setFullStateName(state?.name || '');
        } else {
            setFullStateName('');
        }
    }, [orderData?.shippingAddress?.city, orderData?.shippingAddress?.country]);
    // console.log(fullCountryName, fullStateName)



    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"))
        setOrderData(orderData)
    }, [])

    console.log(orderData, "from payment page")


    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
        couponDiscount: orderData?.discountPrice,
        paymentInfo: {},
        appliedReferral: orderData?.appliedReferral || 0
    }

    console.log(order, "orderdata")



    // function handlepayment() {
    //     let data = {
    //         amount: 5 * 100,
    //         currency: "INR",
    //         receipt: "qwsaq1",
    //     };

    //     fetch("http://localhost:8000/order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     }).then((result) => {
    //         result.json().then((res) => {
    //             setOrderID(res.id)
    //         });
    //     });

    //     var options = {
    //         key: "rzp_test_TKfJulmRsFjGyI", // Enter the Key ID generated from the Dashboard
    //         amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "Ru-brama", //your business name
    //         description: "Test Transaction",
    //         image: "https://example.com/your_logo",
    //         order_id: orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "/success",
    //         prefill: {
    //             //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    //             name: "Gaurav Kumar", //your customer's name
    //             email: "gaurav.kumar@example.com",
    //             contact: "9000090000", //Provide the customer's phone number for better conversion rates
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    //     var rzp1 = new Razorpay(options);
    //     rzp1.open();

    //     rzp1.on("payment.success", function (e) {
    //         e.preventDefault();

    //         alert("Order placed successfully! Order ID: " + res.id);

    //         // Dispatch an action to clear the cart upon successful payment
    //     });

    // }

    const handleRazorpayPayment = async () => {
        try {
            // Step 1: Create an order on your backend
            const response = await fetch(`${backend_url}order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: orderData.totalPrice * 100,
                    currency: "INR",
                    receipt: "qwsaq1",
                })
            });
            const data = await response.json();
            setOrderID(data.id);

            // Step 2: Initiate Razorpay payment
            const options = {
                key: "rzp_test_TKfJulmRsFjGyI", // Replace with your Razorpay key
                amount: orderData.totalPrice * 100, // Amount in paisa (INR)
                currency: "INR",
                name: "Tiny Tiaraa", // Your business name
                description: "Test Transaction",
                image: "https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png",
                order_id: data.id, // Order ID obtained from your server
                handler: function (response) {
                    handlePaymentSuccess(response);
                    console.log(response, "check reponse for gateway")
                },
                prefill: {
                    name: orderData?.shippingAddress?.name,
                    email: orderData?.shippingAddress?.email,
                    contact: orderData?.shippingAddress?.phoneNumber,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in handleRazorpayPayment:", error);
            alert("Error occurred while processing payment.");
        }
    };

    // const handlePaymentSuccess = async (paymentDetails) => {
    //     console.log('Payment successful. Details:', paymentDetails);
    //     const updatedOrder = {
    //         ...order,
    //         paymentInfo: {
    //             id: paymentDetails.razorpay_payment_id,
    //             status: 'success',
    //             type: 'Razorpay',
    //         },
    //     };

    //     try {
    //         console.log('Sending updated order to server:', updatedOrder);
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         console.log('Server response:', response.data);

    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         window.location.reload()

    //         // Handle actions upon successful payment
    //         alert(`Payment successful! Payment ID: ${paymentDetails.razorpay_payment_id}`);
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Failed to place order. Please try again.");
    //     }
    //     // You can perform actions like updating database, clearing cart, etc.
    // };

    // const handlecashondel = async (e) => {
    //     e.preventDefault()
    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);


    //     const referralPointsToApply = orderData?.appliedReferral || 0;
    //     // const updatedTotalPrice = orderData?.totalPrice - referralPointsToApply;


    //     try {
    //         const response = await axios.get(`${server}/referral/user-referrals`, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true
    //         });

    //         if (response.data && response.data.referrals) {
    //             setReferrals(response.data.referrals);
    //         } else {
    //             throw new Error('Unexpected response format');
    //         }

    //         toast.success("Referrals fetched successfully");
    //     } catch (err) {
    //         console.error('API Error:', err);
    //         setError(err.message || 'An error occurred while fetching referrals');
    //     } finally {
    //         setLoading(false);
    //     }


    //     const updatedOrder = {
    //         ...order,
    //         referralCode: referralCode,
    //         paymentInfo: {
    //             type: 'Cash on Delivery',
    //         },
    //         referralPointsApplied: referralPointsToApply,
    //         // totalPrice: updatedTotalPrice,


    //     };


    //     console.log(updatedOrder, "order")

    //     try {
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true
    //         });
    //         console.log('Server response:', response.data);
    //         console.log('Server response:', response.data._id);



    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));

    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         // window.location.reload()

    //         // Handle actions upon successful payment

    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data.message);
    //     }

    // }




    // const handlecashondel = async (e) => {
    //     e.preventDefault();

    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);

    //     const referralPointsToApply = orderData?.appliedReferral || 0;

    //     try {
    //         // Fetch user referrals only if the referralCode is provided
    //         if (referralCode) {
    //             const referralResponse = await axios.get(`${server}/referral/user-referrals`, {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //                 // ,
    //                 // withCredentials: true
    //             });

    //             if (referralResponse.data && referralResponse.data.referrals) {
    //                 const referrals = referralResponse.data.referrals;
    //                 const referral = referrals.find(r => r.referralCode === referralCode);

    //                 if (!referral) {
    //                     throw new Error('Referral code not valid or not found in user referrals');
    //                 }

    //                 // Fetch user referral balance
    //                 const userResponse = await axios.get(`${server}/referral/referral-balance`, {
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     withCredentials: true
    //                 });

    //                 if (!userResponse.data || userResponse.data.success === false) {
    //                     throw new Error('User data not found');
    //                 }

    //                 const userId = userResponse.data.userId;
    //                 const userBalance = userResponse.data.referralBalance || 0;

    //                 if (userBalance < referralPointsToApply) {
    //                     throw new Error('Insufficient referral balance');
    //                 }

    //                 // Proceed with creating the order
    //                 const updatedOrder = {
    //                     ...order,
    //                     referralCode: referralCode,
    //                     paymentInfo: {
    //                         type: 'Cash on Delivery',
    //                     },
    //                     referralPointsApplied: referralPointsToApply,
    //                 };

    //                 console.log('Updated Order:', updatedOrder);

    //                 try {
    //                     const orderResponse = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         }
    //                     });

    //                     console.log('Order Creation Response:', orderResponse.data);

    //                     // Deduct referral points after successful order creation
    //                     const deductionResponse = await axios.post(`${server}/referral/deduct-points`, {
    //                         userId: userId, // Pass the userId here
    //                         points: referralPointsToApply
    //                     }, {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         withCredentials: true
    //                     });

    //                     console.log('Deduction Response:', deductionResponse.data);

    //                     toast.success("Order Successfully Placed");
    //                     localStorage.setItem("cartItems", JSON.stringify([]));
    //                     localStorage.setItem("latestOrder", JSON.stringify([]));
    //                     localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //                     navigate("/order/success");
    //                     window.location.reload()

    //                 } catch (error) {
    //                     console.error('Order creation or deduction error:', error);
    //                     toast.error(error.response?.data?.message || 'An error occurred while processing your request');
    //                 }
    //             } else {
    //                 throw new Error('Referrals data not found');
    //             }
    //         } else {
    //             // Handle order creation for a referred user without referral validation
    //             const updatedOrder = {
    //                 ...order,
    //                 paymentInfo: {
    //                     type: 'Cash on Delivery',
    //                 },
    //                 referralPointsApplied: 0, // No referral points applied
    //             };

    //             try {
    //                 const orderResponse = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     }
    //                 });

    //                 console.log('Order Creation Response:', orderResponse.data);

    //                 toast.success("Order Successfully Placed");
    //                 localStorage.setItem("cartItems", JSON.stringify([]));
    //                 localStorage.setItem("latestOrder", JSON.stringify([]));
    //                 localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //                 navigate("/order/success");
    //                  window.location.reload()


    //             } catch (error) {
    //                 console.error('Order creation error:', error);
    //                 toast.error(error.response?.data?.message || 'An error occurred while processing your request');
    //             }
    //         }
    //     } catch (err) {
    //         console.error('API Error:', err);
    //         toast.error(err.message || 'An error occurred while checking referral code');
    //     }
    // };


    // const handlecashondel = async (e) => {
    //     e.preventDefault();
    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);

    //     const latestOrderData = localStorage.getItem("latestOrder");

    //     if (!latestOrderData) {
    //         console.error("No latest order data found.");
    //         return;
    //     }
    //     const latestOrder = JSON.parse(latestOrderData);
    //     const referralBalanceUsed = latestOrder.appliedReferral || 0;
    //     const user = latestOrder.user;
    //     // const latestOrder = JSON.parse(latestOrderData);
    //     // const referralBalanceUsed = latestOrder.appliedReferral;
    //     // const currentReferralBalance = latestOrder.user.referralBalance;
    //     // const updatedReferralBalance = currentReferralBalance - referralBalanceUsed;

    //     const updatedOrder = {
    //         ...order,
    //         referralCode: referralCode,
    //         paymentInfo: {
    //             type: 'Cash on Delivery',
    //         }
    //     };

    //     console.log(updatedOrder, "order");

    //     try {
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         console.log('Server response:', response.data);
    //         console.log('Server response:', response.data._id);
    //         // Update the backend with the new referral balance

    //         if (referralBalanceUsed > 0 && user) {
    //             // Deduct referral balance if applied
    //             const currentReferralBalance = user.referralBalance || 0;
    //             const updatedReferralBalance = currentReferralBalance - referralBalanceUsed;

    //             // Update the backend with the new referral balance
    //             await updateReferralBalanceInBackend(user._id, updatedReferralBalance);

    //             // Update the user object with the new referral balance
    //             user.referralBalance = updatedReferralBalance;
    //         }




    //         // await updateReferralBalanceInBackend(latestOrder.user._id, updatedReferralBalance);

    //         // // Update the user object with the new referral balance
    //         // latestOrder.user.referralBalance = updatedReferralBalance;

    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         // window.location.reload();

    //         // Handle actions upon successful payment
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message);
    //     }
    // };

    const handlePaymentSuccess = async (paymentDetails) => {
        console.log('Payment successful. Details:', paymentDetails);
    
        // Retrieve referral code from session storage
        const referralCode = sessionStorage.getItem('referralCode');
        console.log('Captured referral code:', referralCode);
    
        const latestOrderData = localStorage.getItem("latestOrder");
    
        if (!latestOrderData) {
            console.error("No latest order data found.");
            return;
        }
    
        const latestOrder = JSON.parse(latestOrderData);
        const referralBalanceUsed = latestOrder.appliedReferral || 0;
        const user = latestOrder.user;
    
        // Define the updatedOrder object
        const updatedOrder = {
            ...order,
            paymentInfo: {
                id: paymentDetails.razorpay_payment_id,
                status: 'success',
                type: 'Razorpay',
            },
            referralCode: referralCode,
        };
    
        try {
            // Send updated order to server
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            console.log('Server response:', response.data);
            const orderId = response.data.order._id;
            console.log('Order ID:', orderId);
    
            if (referralBalanceUsed > 0 && user) {
                // Deduct referral balance if applied
                const currentReferralBalance = user.referralBalance || 0;
    
                let updatedReferralBalance;
                if (currentReferralBalance < referralBalanceUsed) {
                    // Use all available balance and set it to zero
                    updatedReferralBalance = 0;
                    toast.warning(`Referral balance used: ${currentReferralBalance}. Remaining balance is zero.`);
                } else {
                    // Deduct the used balance from the current balance
                    updatedReferralBalance = currentReferralBalance - referralBalanceUsed;
                }
    
                // Update the backend with the new referral balance
                await updateReferralBalanceInBackend(user._id, updatedReferralBalance);
    
                // Update the user object with the new referral balance
                user.referralBalance = updatedReferralBalance;
            }
    
            // Clear local storage and navigate to success page
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify({ ...updatedOrder, orderId }));
            navigate("/order/success");
            window.location.reload();
    
            // Provide feedback to the user
            toast.success("Order Successfully Placed");
            // alert(`Payment successful! Payment ID: ${paymentDetails.razorpay_payment_id}`);
    
            // Optional: Reload the page if needed
    
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order. Please try again.");
            // Optionally, navigate back to the checkout page or show additional error details
        }
    };
    
    const handlecashondel = async (e) => {
        e.preventDefault();
        const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
        console.log('Captured referral code:', referralCode);

        const latestOrderData = localStorage.getItem("latestOrder");

        if (!latestOrderData) {
            console.error("No latest order data found.");
            return;
        }

        const latestOrder = JSON.parse(latestOrderData);
        const referralBalanceUsed = latestOrder.appliedReferral || 0;
        const user = latestOrder.user;

        // Define the updatedOrder object
        const updatedOrder = {
            ...order,
            referralCode: referralCode,
            paymentInfo: {
                type: 'Cash on Delivery',
            }
        };

        console.log(updatedOrder, "order");

        try {
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Server response:', response.data);
            console.log('Server response:', response.data.order._id);

            const orderId = response.data.order._id; // Extract orderId
            console.log('Order ID:', orderId);

            if (referralBalanceUsed > 0 && user) {
                // Deduct referral balance if applied
                const currentReferralBalance = user.referralBalance || 0;

                let updatedReferralBalance;
                if (currentReferralBalance < referralBalanceUsed) {
                    // Use all available balance and set it to zero
                    updatedReferralBalance = 0;
                    toast.warning(`Referral balance used: ${currentReferralBalance}. Remaining balance is zero.`);
                } else {
                    // Deduct the used balance from the current balance
                    updatedReferralBalance = currentReferralBalance - referralBalanceUsed;
                }

                // Update the backend with the new referral balance
                await updateReferralBalanceInBackend(user._id, updatedReferralBalance);

                // Update the user object with the new referral balance
                user.referralBalance = updatedReferralBalance;
            }

            toast.success("Order Successfully Placed");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify({ ...updatedOrder, orderId }));
            navigate("/order/success");
             window.location.reload()


            // Handle actions upon successful payment
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    const updateReferralBalanceInBackend = async (userId, updatedReferralBalance) => {
        try {
            const response = await axios.put(
                `${server}/referral/user/update-referral-balance`,
                {
                    userId: userId,
                    referralBalance: updatedReferralBalance,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true // This ensures cookies or credentials are sent with the request
                }
            );

            console.log('Referral balance updated on server:', response.data);
        } catch (error) {
            console.error('Error updating referral balance:', error.response?.data?.message || "Failed to update referral balance.");
            toast.error('Failed to update referral balance.');
        }
    };

    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };
    return (
        <div className='w-full bg-[#fafafa;] pb-8'>
            <div >

                <div className='w-full flex pt-3 mb-7'>


                    <div className='w-[100%]'>
                        <h2 className='text-center text-[20px] font-[600]'>Payment Page</h2>
                    </div>
                </div>


                <div className='checkoutsectionmainlast flex gap-10 justify-center w-full h-auto'>
                    <div className='checkoutleft w-[50%]'>
                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '> Delivery Method</h2>

                            </div>

                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <div>
                                        <label className='text-[14px] font-[500] mb-[4px] tracking-[0.55px] block' for="shipping-method">Standard Delivery - FREE</label>
                                        <span className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block'>(Delivery By Jul 19 - Jul 22)</span>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Delivery & Billing Details</h2>

                            </div>

                            <div className=''>
                                <div className='mb-2'>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.name}</p>
                                    <p className='text-[14px] font-[400] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address1}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address2}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{fullStateName}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{fullCountryName}</p>

                                </div>
                                <div>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.email}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.phoneNumber}</p>



                                </div>


                            </div>


                        </div>

                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Select Payment Method</h2>
                            </div>

                            <div className=''>
                                <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="razorpay"
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={selectedPaymentMethod === 'razorpay'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px]"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="razorpay">
                                                <img src={razopayimg} alt="" className='!w-[100px] !h-[60px]' />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="cod"
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={selectedPaymentMethod === 'cod'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px]"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="cod">
                                                <h2>Cash On Delivery</h2>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className='flex justify-end '>
                            <div className={`button-wrapperdiv`} >
                                {
                                    selectedPaymentMethod === 'razorpay' ?
                                        <button onClick={handleRazorpayPayment}>Pay With Razorpay</button>
                                        :
                                        <button onClick={handlecashondel}>Cash On Delivery</button>
                                }

                            </div>
                        </div>



                    </div>
                    <div className='checkoutright pb-10 h-[100%] w-[35%] '>

                        <div>
                            <div >
                                <h3 className='text-[16px] font-[400] tracking-[0.55px] text-[#161618] mb-[12px]'> Order Summary</h3>

                                {
                                    orderData?.cart?.map((val, index) => {
                                        return (


                                            <div key={index} className='ordercardsec flex mb-5 shadow-sm'>
                                                <div className="image-section">
                                                    <img src={`${val?.images[0]?.url}`} width="100%" height="100" />
                                                </div>
                                                <div className="detail-section">
                                                    <h3 className='text-[#161618] text-[14px] mb-[5px]'>{val.name}</h3>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[#161618] text-[13px] ">QTY : <span>{val.qty}</span>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-[#6f6f79] text-[13px] line-through">₹{val.originalPrice}</span>
                                                            <span className=" text-[13px] pl-2" >₹{val.discountPrice}</span>
                                                        </div>


                                                    </div>
                                                    {val?.showWithChain !== null && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Chain :</span>
                                                            <span className=" text-[#161618]  text-[13px] pl-2" >{val.showWithChain ? 'With Chain' : 'Without Chain'}</span>
                                                        </div>

                                                    )}
                                                    {val?.selectedEnamelColor && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Enamel Color :</span>
                                                            <span className="text-[#161618] text-[13px] pl-2">{val.selectedEnamelColor}</span>
                                                        </div>
                                                    )}
                                                    <div className="">
                                                        <span className="text-[#161618] font-[500] text-[13px]">Metal Color :</span>
                                                        <span className=" text-[#161618]  text-[13px] pl-2" >{metalColors[val.selectedColor]}</span>
                                                    </div>
                                                </div>


                                            </div>

                                        )
                                    })
                                }



                                {/* //order details */}
                                <div className='!w-[90%]'>

                                    <div className="sub-total mt-2 ">
                                        <span className="label">Subtotal</span>
                                        <span className="value">₹ {orderData?.subTotalPrice}</span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">Coupon Discount:</span>
                                        <span className="value">
                                            {orderData?.discountPrice > 0 ? (
                                                <div className="flex items-center">
                                                    <h5 className="label !text-[16px]">- ₹{orderData?.discountPrice}</h5>
                                                </div>
                                            ) : (
                                                <h5 className="text-[18px] font-[600]">-</h5>
                                            )}
                                        </span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">
                                            Delivery By <span className="deltext">(Jul 02 - Jul 03)</span>
                                        </span>
                                        <span className="value">Free</span>
                                    </div>

                                    <div className="sub-total  ">
                                        <span className="label">GST (3%):</span>
                                        <span className="value">₹ {orderData?.gstAmount}</span>
                                    </div>
                                    <div className='sub-total mt-2 bb '>
                                        <span className="label">Referral Discount</span>
                                        <span className="value">
                                            {
                                                orderData?.appliedReferral > 0 ?
                                                    `- ₹${orderData?.appliedReferral}` :
                                                    `Available: ₹${orderData?.referralBalance}`
                                            }
                                        </span>

                                    </div>

                                    <div className="sub-total sub-totalpp">
                                        <span className="">Order Total </span>
                                        <span className="">₹ {orderData?.totalPrice}</span>
                                    </div>





                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PaymentPage
