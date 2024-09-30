import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FaComments, FaTimes } from 'react-icons/fa'; // Import both icons
import './chatbotmsg.css'; // Assuming you're styling in a CSS file

const Chatbotmsg = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track the open/close status

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

 
  
  const steps = [
    {
      id: '1',
      message: 'Welcome to Tiny! What is your name?',
      trigger: 'name-input',
    },
    {
      id: 'name-input',
      user: true, // Allows user to input their name
      trigger: 'number-input',
    },
    {
      id: 'number-input',
      message: 'Thanks, {previousValue}! Could you please provide your contact number?',
      trigger: 'contact-number',
    },
    {
      id: 'contact-number',
      user: true, // Allows user to input their contact number
      trigger: 'greeting',
    },
    {
      id: 'greeting',
      message: 'Nice to meet you, ! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: '1', label: 'I need help with an order.', trigger: '3' },
        { value: '2', label: 'I have a question about products.', trigger: '4' },
        { value: '3', label: 'I want to provide feedback.', trigger: '5' },
        { value: '4', label: 'Other inquiries', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'Please provide your order ID.',
      trigger: 'end-message',
    },
    {
      id: '4',
      message: 'What product do you want to know about?',
      trigger: 'end-message',
    },
    {
      id: '5',
      message: 'Thank you for your feedback! Can you briefly describe your experience?',
      trigger: 'end-message',
    },
    {
      id: '6',
      message: 'Feel free to ask anything! What’s on your mind?',
      trigger: 'end-message',
    },
    {
      id: 'end-message',
      message: 'Thank you! I will get back to you shortly.',
      end: true,
    },
  ];

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#007bff',
    headerFontColor: '#fff',
    botBubbleColor: '#007bff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <div className='chatbot-container'>
      {/* ChatBot window appears when isOpen is true */}
      {isOpen && (
        <div className="chatbot-window">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} className="chatbot" />
          </ThemeProvider>
        </div>
      )}
      
      {/* Chat icon toggle button */}
      <div className="chatbot-toggle-container">
        <button className="chatbot-toggle" onClick={toggleChatbot}>
          {isOpen ? <FaTimes size={20} color="#ffffff" /> : <FaComments size={20} color="#ffffff" />}
          <span className="tooltip text-[!14px]">Chat Here</span> {/* Tooltip */}
        </button>
      </div>
    </div>
  );
};

export default Chatbotmsg;
