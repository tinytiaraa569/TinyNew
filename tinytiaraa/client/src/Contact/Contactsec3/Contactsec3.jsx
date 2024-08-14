import React, { useState } from 'react';
import './Contactsec3.css';
import shape from './shape.png';
import { MdOutlineLocationOn, MdOutlineMailOutline, MdOutlinePhoneInTalk } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { server } from '@/server';
import axios from 'axios';
import { toast } from 'react-toastify';

function Contactsec3() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    // State to track which inputs are focused
    const [focusedInputs, setFocusedInputs] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
    });

    // Function to handle focus and blur
    const handleFocus = (inputName) => {
        setFocusedInputs((prevState) => ({
            ...prevState,
            [inputName]: true,
        }));
    };

    const handleBlur = (inputName, event) => {
        if (event.target.value === '') {
            setFocusedInputs((prevState) => ({
                ...prevState,
                [inputName]: false,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        axios
          .post(`${server}/contactus/contactus`, { name, email, message, phonenumber })
          .then((res) => {
            toast.success(res.data.message);
            setName("");
            setEmail("");
            setMessage("");
            setPhonenumber("");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
    }

    return (
        <div>
            <div className="contactsec3container">
                <span className="big-circle" />
                <img src={shape} className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">Let's get in touch</h3>
                        <p>Tiny Tiaraa</p>
                        <p>A Brand By Ru-Brama Retail Pvt Ltd.</p>
                        <p className="text">
                            Tiny Tiaraa, where we craft enchanting jewellery for kids and infants.
                        </p>
                        <div className="info">
                            <div className="information">
                                <MdOutlineLocationOn size={75} className='mr-2' />
                                <p>Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai-400093.</p>
                            </div>
                            <div className="information">
                                <MdOutlineMailOutline size={30} className='mr-2' />
                                <p>care@tinytiaraa.com</p>
                            </div>
                            <div className="information">
                                <MdOutlinePhoneInTalk size={30} className='mr-2' />
                                <p>+91 86570 62511</p>
                            </div>
                        </div>
                        <div className="social-media">
                            <p>Connect with us :</p>
                            <div className="social-icons">
                                <Link to="https://www.facebook.com/profile.php?id=61552003617016">
                                    <i className="fab fa-facebook-f" />
                                </Link>
                                <Link to="https://web.whatsapp.com/send?phone=+91%208657062511">
                                    <i className="fab fa-whatsapp" />
                                </Link>
                                <Link to="https://www.instagram.com/tiny_tiaraa/">
                                    <i className="fab fa-instagram" />
                                </Link>
                                <Link to="mailto:care@tinytiaraa.com">
                                <i className="fa-regular fa-envelope"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <span className="circle one" />
                        <span className="circle two" />
                        <form  autoComplete="off" onSubmit={handleSubmit} >
                            <h3 className="title">Contact us</h3>
                            <div className={`input-container ${focusedInputs.name ? 'focus' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    onFocus={() => handleFocus('name')}
                                    onBlur={(event) => handleBlur('name', event)}
                                />
                                <label htmlFor="">Name</label>
                                <span>Name</span>
                            </div>
                            <div className={`input-container ${focusedInputs.email ? 'focus' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={(event) => handleBlur('email', event)}
                                />
                                <label htmlFor="">Email</label>
                                <span>Email</span>
                            </div>
                            <div className={`input-container ${focusedInputs.phone ? 'focus' : ''}`}>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    value={phonenumber}
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value);
                                    }}
                                    onFocus={() => handleFocus('phone')}
                                    onBlur={(event) => handleBlur('phone', event)}
                                />
                                <label htmlFor="">Phone</label>
                                <span>Phone</span>
                            </div>
                            <div className={`input-container textarea ${focusedInputs.message ? 'focus' : ''}`}>
                                <textarea
                                    name="message"
                                    className="input"
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={(event) => handleBlur('message', event)}
                                />
                                <label htmlFor="">Message</label>
                                <span>Message</span>
                            </div>
                            <input type="submit" defaultValue="Send" className="btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contactsec3;
