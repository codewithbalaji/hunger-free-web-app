import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "assets/hunger-1.png";
import img2 from "assets/hunger-2.png";
import img3 from "assets/hunger-3.png";
import { TypeAnimation } from 'react-type-animation';

function Carousels() {
  return (
    <>
      <Carousel controls={false} interval={3000} data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img1}
            alt="First slide"
            height={450}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img2}
            alt="Second slide"
            height={450}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img3}
            alt="Third slide"
            height={450}
          />
        </Carousel.Item>
      </Carousel>
      <div className="text-center">
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Let say no to hunger',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Today 300+ food donated',
        1000,
        'Current volunters 50+',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '24px', display: 'inline-block' }}
      repeat={Infinity}
    />
      </div>
    </>
  );
}

export default Carousels;
