/* eslint-disable prettier/prettier */
import * as React from 'react';
import Image from 'next/image';
import styles from '../styles/ImageSlider.module.scss';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';

interface Props {
  data: any[];
  className?: string;
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
export default function ImageSlider({ data, className }: Props) {
  return (
    <div className={styles.imageslidercontainer}>
      <Slider {...settings}>
        {data?.map((item, index) => {
          return (
            <div className={styles.wrapper} key={`img_${index}`}>
              {item?.contentType?.toLowerCase() === 'video/mp4' ? (
                <ReactPlayer url={item.url} controls={true} />
              ) : (
                <Image
                  className={`${styles.sliderimage} ${className}`}
                  src={item.url}
                  alt={''}
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
