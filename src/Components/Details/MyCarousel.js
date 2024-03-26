import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  return (
    <Carousel showThumbs={false} autoPlay={true} interval={1000}>
      <div>
        <img src={require("../../Assets/meal.jpg")} alt="not found" className="detailImage" />
      </div>
      <div>
        <img src={require("../../Assets/Chicken.jpg")} alt="not found" className="detailImage" />
      </div>
      <div>
        <img src={require("../../Assets/briyaniplater.jpg")} alt="not found" className="detailImage" />
      </div>
      <div>
        <img src={require("../../Assets/burger.jpg")} alt="not found" className="detailImage"/>
      </div>
      <div>
        <img src={require("../../Assets/pizza.jpg")} alt="not found" className="detailImage"/>
      </div>
      <div>
        <img src={require("../../Assets/icecream.jpg")} alt="not found" className="detailImage"/>
      </div>
      <div>
        <img src={require("../../Assets/drinks.avif")} alt="not found" className="detailImage"/>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
