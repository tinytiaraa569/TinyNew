import React, { useState, useEffect } from "react";
import "./Morepage.css";
import { useNavigate } from "react-router-dom";

function Customise() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Content and images for each step
  const steps = [
    {
      image:
        "https://www.jewellerskart.com/_next/image/?url=https%3A%2F%2Fs3.ap-south-1.amazonaws.com%2Fmanicad.in%2FcustomizeJewellery%2F62035994c68b661de68385e4%2Fimage2_1669094666.jpg&w=640&q=75",
      title: "Design Your Own",
      description:
        "To build a customized jewelry piece, upload the design along with the exact specifications asked. After filling in all the details, move on to the next step",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1QhxKwpuOeFIcDyH-J5phUi7DXwjboiG4g&s",
      title: "Review Your Design",
      description:
        "We'll create a digital format of your jewelry piece for you to review and verify the specifications. We'll also provide an estimated cost at this stage.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-b5Ishj3DOynopdTEBxADxuA1RiAKxyjlAA&s",
      title: "Confirm & Pay",
      description:
        "Once you confirm the design and specifications, we’ll await the token amount. After receiving it, we’ll begin the jewelry-making process and keep you updated.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-1oGIvYAfU-8kia7XRpQ2Vu-kC7a1fRpSWQ&s",
      title: "Receive Your Jewellery",
      description:
        "Once your jewelry is ready and any outstanding issues are resolved, we’ll complete quality checks and deliver it to your address.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 6000); // Change step every 3 seconds
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className=" bgcustomize" >
      <div className="customenew">
        <div className="customenewheading">
          <h1>Customize Your Jewellery</h1>
        </div>

        <div className="customenewflex">
          {/* Image Section */}
          <div className="leftcustomimg">
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
            />
          </div>

          {/* Stepper Section */}
          <div className="stepper">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`cursor-pointer step ${
                  index === currentStep ? "active" : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="circle">{index + 1}</div>
                {index < steps.length - 1}
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="rightcustomcontent">
            <h1>{steps[currentStep].title}</h1>
            <p>{steps[currentStep].description}</p>
            <button
              onClick={() => {
                navigate("/personalised-prosperity");
              }}
            >
              Customize Your Jewellery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customise;
