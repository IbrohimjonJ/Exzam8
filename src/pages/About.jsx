import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="about-container max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg text-center mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL}
          alt="User"
          className="w-32 h-32 rounded-full shadow-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2">{user.displayName}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to our website! We are dedicated to providing the best service possible.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Our mission is to deliver high-quality products that bring joy and convenience to our customers' lives.
        </p>
        
      </div>
    </div>
  );
};

export default About;
