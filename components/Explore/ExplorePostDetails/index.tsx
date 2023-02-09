/* eslint-disable prettier/prettier */
import MainLayout from '../../../layouts/MainLayout';
import Image from 'next/image';
import LeftArrow from '../../../public/images/LeftArrow.svg';
import styles from '../../../styles/ExplorePostDetails.module.scss';
import Button from '../../Button';
import UpArrow from '../../../public/images/UpArrow.svg';
import Post1 from '../../../public/images/post.png';
import Post2 from '../../../public/images/post2.png';
import Like from '../../../public/images/Like.svg';
import UserProfileImage from '../../../public/images/ProfileLg.png';
import ProductCover from '../../../public/images/productcover.png';
import Thunderstorms from '../../../public/images/thunderstorms.svg';
import Chip from '../../Chip/Chip';
import { bgcolor } from '@mui/system';
import ImageSlider from '../../ImageSlider';

const ExplorePostDetails = () => {
  const categoriesData = [
    {
      id: 1,
      text: 'Nightlife',
      color: 'black',
      bgColor: 'bg-slate-500',
    },
    {
      id: 2,
      text: 'Dating Plan',
      color: 'black',
      bgColor: 'bg-slate-500',
    },
  ];
  const image_data = [
    {
      url: Post1,
    },
    {
      url: Post2,
    },
  ];
  return (
    <MainLayout activeLink="/shop">
      <div className="flex flex-row items-center ">
        <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
        <div className={styles.title}>Back </div>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1  md:gap-0  sm:gap-7">
        <div className={`${styles.exploreleft} md:my-7 xs:mt-7 `}>
          <div className="max-h-min">
            {/* <ImageSlider data={image_data} /> */}
            <Image
              src={Post1}
              alt={'logo'}
              className=" xs:w-full xs:h-full md:w-11/12 md:h-full object-contain"
            />
          </div>

          {/* <ImageSlider
            data={image_data}
            className=" rounded-lg h-4/5 object-cover lg:visible "
          /> */}
        </div>
        <div className={`md:my-7 xs:mt-7 ${styles.exploreleft} `}>
          <div className={styles.profileDescription}>
            <Image
              src={UserProfileImage}
              alt={'profile'}
              height={38}
              width={38}
            />
            <div>
              <span className={styles.title}>David Francis</span>
              <p className={styles.subtitle}>Hop3 Creator</p>
            </div>
          </div>
          <Button variant="primary" className={styles.deal}>
            <Image
              src={Thunderstorms}
              alt={'profile'}
              height={20}
              width={20}
              className="mr-3"
            />
            Boosted
          </Button>
          <div className="mt-4">
            <strong className="text-2xl font-sans">
              This is a very long title
            </strong>
            <p className="text-sm mt-1 text-justify md:w-11/12 xs:w-full">
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
              viverra tortor malesuada id non. Lorem ipsum dolor sit amet
              consectetur. Vitae accumsan nunc viverra tortor malesuada id non.
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
              viverra tortor malesuada id non. Lorem ipsum dolor sit amet
              consectetur. Vitae accumsan nunc viverra tortor malesuada id non
              accumsan.
            </p>
            <br></br>
            <p className="text-sm mt-1 text-justify md:w-11/12 xs:w-full">
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
              viverra tortor malesuada id non. Lorem ipsum dolor sit amet
              consectetur. Vitae accumsan nunc viverra tortor malesuada id non.
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
              viverra tortor malesuada id non. Lorem ipsum dolor sit amet
              consectetur. Vitae accumsan nunc viverra tortor malesuada id non
              accumsan. Lorem ipsum dolor sit amet consectetur. Vitae accumsan
              nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet
              consectetur.
            </p>
            <p className="text-sm mt-5 text-justify md:w-11/12 xs:w-full">
              <strong>Location : </strong>Lorem Ipsum Dolor
            </p>

            <p className="text-sm mt-5 text-justify md:w-8/12 xs:w-full text-purple-400">
              #Lorem #Loremipsum #amet #accumsan #viverratortor #Lorem
              #Loremipsum #amet #accumsan #viverratortor
            </p>
            <div className="mt-5">
              <Chip chipData={categoriesData} />
            </div>

            <div className="flex flex-row mt-5 items-center">
              <p className="hover:underline underline font-semibold">
                Learn more
              </p>
              <Image src={UpArrow} alt={'arrow'} className="ml-2" />
            </div>
            <div className="flex flex-row bg-yellow-50 md:w-4/6 px-2 py-2 rounded-lg my-7 gap-4 xs:w-11/12">
              <Image
                src={ProductCover}
                alt={'logo'}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <strong className="text-sm">Chi Forest Sparkling Water</strong>
                <div className="flex items-center">
                  <p className="">
                    <Image
                      src="/vectors/icons/h.svg"
                      width={10}
                      height={10}
                      alt="h"
                      className="mr-1"
                    />
                    1200
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <span className="flex flex-row items-center">
                <Image src={Like} alt={''} style={{ fill: 'red' }} />
                <p className="text-xl ml-2"> 17 </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExplorePostDetails;
