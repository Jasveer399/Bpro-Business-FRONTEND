import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function Advertisement({
  className,
  isButtonShow,
  isLeft }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    // Simulating backend API call to fetch images
    const fetchImages = async () => {
      const mockData = [
        { id: 1, url: '/homeImg1.png', title: 'Women Fashion', subtitle: 'Amazing Chance' },
        { id: 2, url: '/homeImg2.png', title: 'Summer Collection', subtitle: 'Hot Deals' },
        { id: 3, url: '/homeImg3.png', title: 'New Arrivals', subtitle: 'Check It Out' },
      ];
      setImages(mockData);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative max-w-3xl h-80 overflow-hidden ${className}`}>
      <div className="relative h-80">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === currentIndex
              ? 'translate-x-0'
              : direction === 'right'
                ? '-translate-x-full'
                : 'translate-x-full'
              }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
        <div className={`absolute bottom-4 transform -translate-x-1/2 flex space-x-2 ${isLeft ? 'left-10' : 'right-0'}`}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-secondary' : 'bg-white'
                }`}
            />
          ))}
        </div>
      </div>
      {isButtonShow && (<><button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 border border-[#157ed2]  p-2 rounded-full"
      >
        <ChevronLeft className="text-[#157ed2]" />
      </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 border border-[#157ed2] p-2 rounded-full"
        >
          <ChevronRight className="text-[#157ed2]" />
        </button></>)}
    </div>
  );
}

export default Advertisement;