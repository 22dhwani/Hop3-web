import * as React from 'react';
import Image from 'next/image';
import styles from '../styles/ImageSlider.module.scss';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';

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
        {data?.map((item, index) => {
          return (
            <div className={styles.wrapper} key={`img_${index}`}>
              {item?.contentType?.toLowerCase() === 'video/mp4' ? (
                <ReactPlayer
                  url={item.url}
                  width="100%"
                  height={530}
                  controls={true}
                />
              ) : (
                <Image
                  className={styles.sliderimage}
                  src={item.url}
                  alt={''}
                  height={550}
                  width={530}
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
