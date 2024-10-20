import React from 'react'
import Navbar from '../../Components/Home/Navbar'
import Header from '../../Components/Home/Header'
import PopularSearches from "../../Components/Home/PopularSearches";
import LocationCard from "../../Components/Home/LocationCard";
import Footer from "../../Components/Home/Footer";
import Advertisement from '../../Components/Home/Advertisement'
import LatestArticles from '../../Components/Home/LatestArticles';
import ShopsCategory from '../../Components/Home/ShopsCategory'

function Home() {
  const articleData = [
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
  ];
  return (
    <>
        <Navbar />
      <div className='mx-5'>
        <Header />
        <div className='flex mx-5 mt-10'>
          <div className='w-full'>
            <div className='flex gap-5 w-full'>
              <Advertisement className="w-[54%]" isLeft={true} isButtonShow={true} />
              <Advertisement className="w-[21%] rounded-md" isLeft={false} />
              <Advertisement className="w-[20%] rounded-md" isLeft={false} />
            </div>
            <ShopsCategory />
          </div>
          <div>
            <LatestArticles articles={articleData} />
            <img src="/SaleBanear.png" className='w-72 h-40 mt-6' alt="" />
          </div>
        </div>
        <div className="my-10">
          <h1 className="font-montserrat font-extrabold text-2xl mx-5">
            Popular Searches
          </h1>
          <div className="grid grid-cols-4 m-4 gap-5">
            <PopularSearches />
            <PopularSearches />
            <PopularSearches />
            <PopularSearches />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="border border-[#E7E7E7] inline-flex py-1 px-8 cursor-pointer rounded-md font-semibold">
              Load More...
            </h1>
          </div>
        </div>
        <div>
          <img src="/banner.png" className="w-full" />
        </div>
        <div className="my-10">
          <h1 className="font-montserrat font-extrabold text-2xl mx-5 mb-3">
            We are available in...
          </h1>
          <div className="grid grid-cols-8 mx-3">
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
