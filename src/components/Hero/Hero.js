import Blogs from 'components/Home/Blogs'
import Carousels from 'components/Home/Carousels'
import HomeButton from 'components/Home/HomeButton'
import React from 'react'

const Hero = () => {
  return (
    <>
    <Carousels/>
    <HomeButton/>
    <Blogs/>
    </>
  )
}

export default Hero