/* eslint-disable prettier/prettier */

import Image from 'next/image';
import clsx from 'clsx';

import useModal from '../../hooks/useModal';
import Button from '../Button';
import Modal from '../../modals/Modal';
import styles from '../../styles/ShopProducts.module.scss';

const data = [
  {
    img: '/images/product1.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    text: 'Redeem',
  },
  {
    img: '/images/product2.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    limitedTimeOffer: true,
    text: 'Redeem',
  },
  {
    img: '/images/product3.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    text: 'Redeem',
  },
  {
    img: '/images/product1.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    disabled: true,
    text: 'Sold Out',
  },
  {
    img: '/images/product2.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    disabled: true,
    text: 'Sold Out',
  },
  {
    img: '/images/product3.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    text: 'Redeem',
  },
  {
    img: '/images/product1.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    disabled: true,
    text: 'Sold Out',
  },
  {
    img: '/images/product2.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    text: 'Redeem',
  },
];

const ShopProducts = () => {
  const { show, toggleShow } = useModal(true);

  return (
    <>
      <Modal show={show} toggleShow={toggleShow} />
      <div className={styles.shopProducts}>
        {data.map((el, idx) => {
          return (
            <div className={styles.item} key={'shop-products' + idx}>
              {el.limitedTimeOffer && (
                <div className={styles.limitedTimeOffer}>Limited-Time</div>
              )}

              <Image
                src={el.img}
                alt={el.img}
                className={styles.productimage}
              />

              <div className={styles.name}>{el.name}</div>

              <div className={styles.buy}>
                <strong className={clsx(styles.price, 'fs-20')}>
                  <Image
                    src="/vectors/icons/h.svg"
                    width={14}
                    height={14}
                    alt="h"
                  />
                  {el.price}
                </strong>
                <Button
                  variant="primary"
                  disabled={el.disabled}
                  onClick={() => toggleShow()}>
                  Redeem
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopProducts;
