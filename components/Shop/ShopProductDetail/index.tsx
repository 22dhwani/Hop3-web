/* eslint-disable prettier/prettier */
import LeftArrow from '../../../public/images/LeftArrow.svg';
import UpArrow from '../../../public/images/UpArrow.svg';
import Image from 'next/image';
import ProductCover from '../../../public/images/productcover.png';
import ProductLogo from '../../../public/images/productlogo.png';
import Product1 from '../../../public/images/shopcover1.png';
import Product2 from '../../../public/images/shopcover2.png';
import Product3 from '../../../public/images/shopcover3.png';
import Slider from 'react-slick';
import ImageSlider from '../../ImageSlider';
import styles from '../../../styles/ShopProductDetail.module.scss';
import Button from '../../Button';
import MainLayout from '../../../layouts/MainLayout';
import { useState } from 'react';
import useModal from '../../../hooks/useModal';
import Modal from '../../../modals/Modal';

const ShopProductDetail = () => {
  const [id, setid] = useState(0);
  const { show, toggleShow } = useModal(false);

  const data = [
    {
      url: ProductCover,
      id: 0,
    },
    {
      url: Product1,
      id: 1,
    },
    {
      url: Product2,
      id: 2,
    },
    {
      url: Product3,
      id: 3,
    },
  ];

  return (
    <>
      <Modal show={show} toggleShow={toggleShow} />
      <MainLayout activeLink="/shop">
        <div className="flex flex-row items-center ">
          <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
          <div className={styles.title}>hop3 Shop </div>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1  md:gap-0  sm:gap-7">
          <div className={`${styles.shopproductleft} md:my-7 xs:mt-7`}>
            <Image
              src={ProductCover}
              alt={'logo'}
              className="md:w-11/12  md:h-full xs:w-full object-cover"
            />
            {/* <ImageSlider
            data={data}
            className="w-4/5 rounded-lg h-4/5 object-cover lg:visible "
          /> */}
          </div>
          <div className={`md:my-7 xs:mt-7 ${styles.shopproductleft} `}>
            <div className="flex flex-row items-center">
              <Image src={ProductLogo} alt={'logo'} className="" />
              <div className="text-xl font-medium ml-2">Chi Forest</div>
            </div>
            <Button variant="purple" className={styles.deal}>
              Deal
            </Button>
            <div className="mt-4">
              <strong className="text-2xl font-sans">
                Chi Forest Sparkling Water - Lychee Fizzy
              </strong>
              <p className="font-sm mt-1 text-justify">
                Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
                viverra tortor malesuada id non. Lorem ipsum dolor sit amet
                consectetur. Vitae accumsan nunc viverra tortor malesuada id
                non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
                viverra tortor malesuada id non. Lorem ipsum dolor sit amet
                consectetur. Vitae accumsan nunc viverra tortor malesuada id non
                accumsan.
              </p>
              <div className="grid grid-cols-2 mt-6">
                <div>
                  <p className={styles.dealtext}>Deal</p>
                  <strong className={styles.price}>
                    <Image
                      src="/vectors/icons/h.svg"
                      width={20}
                      height={22}
                      alt="h"
                      className="mr-3"
                    />
                    1200
                  </strong>
                </div>
                <div>
                  <p className={styles.dealtext}>Last Time</p>
                  <strong className={styles.price}>1D 16H</strong>
                </div>
              </div>
              <Button
                className={`mt-7 w-2/4 ${styles.redeem}`}
                variant="primary"
                onClick={() => toggleShow()}>
                Redeem
              </Button>
              <div className="flex flex-row mt-5 items-center">
                <p className="hover:underline">Learn more about the brand</p>
                <Image src={UpArrow} alt={'arrow'} className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ShopProductDetail;
