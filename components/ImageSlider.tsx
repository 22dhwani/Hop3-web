import * as React from 'react';
import Image from 'next/image';
import styles from '../styles/ImageSlider.module.scss';
import Slider from 'react-slick';
interface Props {
  data: any[];
}
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'slides',
};
export default function ImageSlider({ data }: Props) {
  return (
    <div className={styles.imageslidercontainer}>
      <Slider {...settings}>
        {data?.map((image, index) => {
          return (
            <div className={styles.wrapper} key={`img_${index}`}>
              <Image className={styles.sliderimage} src={image} alt={''} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
