import React, { useState } from "react";
import "./ttclub.css";
import ttclubvideo from "./ttclub.mp4";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import swal from "sweetalert";


function Ttclub() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/ttclub/ttclub`, { email })
      .then((res) => {
        swal({
            title: "Thank you !",
            text: "You're Subscribe to TT Member's Club!",
            icon: "success",
          });
        // toast.success(res.data.message);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="ttclub">
      <div className="videocon">
        <video autoPlay muted loop src={ttclubvideo}></video>
      </div>
      <div className="ttclubmain">
        <div className="ttclubmainadjust">
          <h1>Join the TT Club</h1>
          <p>Enter your email address here</p>

          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <button type="submit">Join Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ttclub;
