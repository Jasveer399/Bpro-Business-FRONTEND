import React from 'react';
import ShopsCategoryCard from './ShopsCategoryCard';

const categories = [
  { id: 1, imageUrl: "/buildingIcon.png", title: "Hotels" },
  { id: 2, imageUrl: "/Restaurants.png", title: "Restaurants" },
  { id: 3, imageUrl: "/beautySpa.png", title: "Beauty Spa" },
  { id: 4, imageUrl: "/homeDecor.png", title: "Home Decor" },
  { id: 5, imageUrl: "/weddingPlanning.png", title: "Wedding Planning" },
  { id: 6, imageUrl: "/buildingIcon.png", title: "Education" },
  { id: 7, imageUrl: "/buildingIcon.png", title: "Rent & Hire" },
  { id: 8, imageUrl: "/buildingIcon.png", title: "Rent & Hire" },
  { id: 9, imageUrl: "/buildingIcon.png", title: "Hotels" },
  { id: 10, imageUrl: "/buildingIcon.png", title: "Restaurants" },
  { id: 11, imageUrl: "/buildingIcon.png", title: "Beauty Spa" },
  { id: 12, imageUrl: "/buildingIcon.png", title: "Home Decor" },
  { id: 13, imageUrl: "/buildingIcon.png", title: "Wedding Planning" },
  { id: 14, imageUrl: "/buildingIcon.png", title: "Education" },
  { id: 15, imageUrl: "/buildingIcon.png", title: "Rent & Hire" },
  { id: 16, imageUrl: "/buildingIcon.png", title: "Rent & Hire" },
];

function ShopsCategory() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <ShopsCategoryCard
            key={category.id}
            imageUrl={category.imageUrl}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopsCategory;