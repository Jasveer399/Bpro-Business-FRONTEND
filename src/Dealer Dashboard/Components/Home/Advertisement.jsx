import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Advertisement() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulating backend API call to fetch images
    // Replace this with your actual API call
    const fetchImages = async () => {
      // Mocked data - replace with your API response
      const mockData = [
        { id: 1, url: '/homeImg1.png', title: 'Women Fashion', subtitle: 'Amazing Chance' },
        { id: 2, url: '/homeImg2.png', title: 'Summer Collection', subtitle: 'Hot Deals' },
        { id: 3, url: '/homeImg3.png', title: 'New Arrivals', subtitle: 'Check It Out' },
      ];
      setImages(mockData);
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {images.length > 0 && (
        <div className="relative h-64">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8">
            <h2 className="text-white text-3xl font-bold mb-2">{images[currentIndex].title}</h2>
            <p className="text-white text-xl mb-4">{images[currentIndex].subtitle}</p>
            <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition duration-300">
              Order Now
            </button>
          </div>
        </div>
      )}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <ChevronLeft className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <ChevronRight className="text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Advertisement