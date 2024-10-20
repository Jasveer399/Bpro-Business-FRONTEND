import React from 'react'
import Navbar from '../../Components/Home/Navbar'
import Header from '../../Components/Home/Header'

function Home() {
  const articleData = [
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
    { time: '10 hours ago', title: 'Commented on Video posted by black demon.' },
  ];
  return (
    <>
      <div>
        <Navbar />
        <Header />
      </div>
    </>
  )
}

export default Home