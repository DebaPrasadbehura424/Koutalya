import React, { useState, useEffect } from "react";
import images from "../storage/image";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const heroData = [
    {
      image: images.cover1,
      title: "Your Free Tourist Guide in India",
      description:
        "Welcome to your ultimate travel companion! Discover India's hidden gems, plan your journey with ease, and enjoy a seamless adventure with our free, comprehensive tourist guide.",
      subText: "Explore Now - No Cost, All Adventure!",
    },
    {
      image: images.cover2,
      title: "Discover India's Stunning Attractions",
      description:
        "From the majestic Taj Mahal to the tranquil backwaters of Kerala, uncover breathtaking landscapes, rich history, and vibrant culture with expert insights.",
      subText: "Your Gateway to Unforgettable Memories",
    },
    {
      image: images.cover3,
      title: "Explore Popular Tourist Destinations",
      description:
        "Dive into bustling cities like Delhi, serene beaches of Goa, and the royal heritage of Rajasthan. Get detailed itineraries and insider tips for every destination.",
      subText: "Top Spots Await You",
    },
    {
      image: images.cover4,
      title: "Reliable Hospital Services for Tourists",
      description:
        "Travel worry-free with access to trusted hospital services across India. We provide locations, contacts, and emergency info to keep you safe and secure.",
      subText: "Health & Safety First",
    },
    {
      image: images.cover5,
      title: "Find Comfortable Hotel Accommodations",
      description:
        "Whether you seek luxury or budget-friendly stays, find the perfect hotel to match your style. Browse options with detailed reviews and booking guidance.",
      subText: "Rest Easy on Your Journey",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [imageIndex]);

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % heroData.length);
  };

  const handlePrev = () => {
    setImageIndex(
      (prevIndex) => (prevIndex - 1 + heroData.length) % heroData.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden mt-1">
      <section className="relative w-full h-[300px] sm:h-[550px] md:h-[600px] bg-gray-900">
        <img
          src={heroData[imageIndex].image}
          alt={heroData[imageIndex].title}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-12">
          <div className="text-center md:text-left md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6 animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              {heroData[imageIndex].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-lg drop-shadow-md">
              {heroData[imageIndex].description}
            </p>
            <p className="text-sm sm:text-base text-blue-300 italic font-medium">
              {heroData[imageIndex].subText}
            </p>
            <button
              className="mt-4 flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/registerOpen")}
            >
              <span>Get Started</span>
              <FaArrowRight size={16} />
            </button>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 md:left-auto md:right-16 md:bottom-16 flex space-x-4 z-10">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 transition duration-300 backdrop-blur-md"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 transition duration-300 backdrop-blur-md"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setImageIndex(idx)}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                imageIndex === idx
                  ? "bg-blue-600 scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Hero;
