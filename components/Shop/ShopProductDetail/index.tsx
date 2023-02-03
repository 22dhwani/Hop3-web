/* eslint-disable prettier/prettier */
import LeftArrow from '../../../public/images/LeftArrow.svg';
import UpArrow from '../../../public/images/UpArrow.svg';
import Image from 'next/image';
import ProductCover from '../../../public/images/productcover.png';
import ProductLogo from '../../../public/images/productlogo.png';
import Product1 from '../../../public/images/shopcover1.png';
import Product2 from '../../../public/images/shopcover2.png';
import Product3 from '../../../public/images/shopcover3.png';

import styles from '../../../styles/ShopProductDetail.module.scss';
import Button from '../../Button';
import MainLayout from '../../../layouts/MainLayout';
import { useState } from 'react';

const ShopProductDetail = () => {
  const [id, setid] = useState(0);
  console.log(id);
  const data = [
    {
      img: ProductCover,
      id: 0,
    },
    {
      img: Product1,
      id: 1,
    },
    {
      img: Product2,
      id: 2,
    },
    {
      img: Product3,
      id: 3,
    },
  ];
  console.log(id);
  const image = data.filter(item => item.id === id);

  console.log(image);
  return (
    <MainLayout activeLink="/shop">
      <div className="grid md:grid-cols-2 sm:grid-cols-1  md:gap-0  sm:gap-7">
        <div className={`${styles.shopproductleft} `}>
          <div className="flex flex-row items-center ">
            <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
            <div className={styles.title}>hop3 Shop </div>
          </div>
          <Image
            id={id.toString()}
            src={image[0].img}
            alt={'product'}
            className="lg:w-10/12 my-5  h-4/5 object-cover sm:w-full"
          />
          <div className="flex flex-row gap-4">
            {data.map((item, id) => {
              return (
                <Image
                  key={id}
                  src={item.img}
                  alt={'product'}
                  className="w-16 h-16 object-cover"
                  onClick={() => {
                    console.log(item.id);
                    setid(item.id);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className={`md:my-7 sm:mt-7 ${styles.shopproductleft} `}>
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
              consectetur. Vitae accumsan nunc viverra tortor malesuada id non.
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc
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
            <Button className={`mt-7 w-2/4 ${styles.redeem}`} variant="primary">
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
  );
};

export default ShopProductDetail;
