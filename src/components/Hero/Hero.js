import Blogs from 'components/Home/Blogs'
import Carousels from 'components/Home/Carousels'
import HomeButton from 'components/Home/HomeButton'
import Notify from 'components/Home/Notify'
import React from 'react'

const Hero = () => {
  return (
    <>
    <Notify/>
    <Carousels/>
    <HomeButton/>
    <Blogs/>
    </>
  )
}

export default Hero