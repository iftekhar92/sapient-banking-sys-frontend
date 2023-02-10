import React from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { CarouselStyle } from "./Carousel.style";
import { tileTypes } from "../../../propTypes/propTypes";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

type Props = {
  autoPlay?: boolean;
  arrData: tileTypes[];
  ListItemComponent: any;
};

const Carousel: React.FC<Props> = ({
  autoPlay,
  arrData,
  ListItemComponent,
}) => (
  <CarouselStyle>
    <MultiCarousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay={autoPlay}
      autoPlaySpeed={5000}
      className=""
      containerClass="container-with-dots"
      dotListClass="dot-class"
      draggable
      focusOnSelect={false}
      infinite
      itemClass="crousel-ul-li"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      sliderClass="crousel-ul"
      slidesToSlide={1}
      swipeable={true}
      showDots={true}
      customLeftArrow={null}
      centerMode={false}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {arrData.map((x: tileTypes) => (
        <ListItemComponent {...x} key={x._id} />
      ))}
    </MultiCarousel>
  </CarouselStyle>
);

Carousel.defaultProps = {
  autoPlay: false,
  arrData: [],
  ListItemComponent:<></>
};

export default Carousel;
