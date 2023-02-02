/* eslint-disable prettier/prettier */
import Image from 'next/image';
import clsx from 'clsx';

import useModal from '../../../hooks/useModal';
import Button from '../../Button';
import Modal from '../../../modals/Modal';
import styles from '../../../styles/ShopProducts.module.scss';

const data = [
  {
    img: '/images/product1.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    text: 'Redeem',
    time: '1D 16h',
  },
  {
    img: '/images/product2.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    limitedTimeOffer: true,
    text: 'Redeem',
    time: '1D 16h',
  },
  {
    img: '/images/product3.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    text: 'Redeem',
    time: '1D 16h',
  },
  {
    img: '/images/product1.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    disabled: true,
    text: 'Sold Out',
    time: '1D 16h',
  },
  {
    img: '/images/product2.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    disabled: true,
    text: 'Sold Out',
    time: '1D ',
  },
  {
    img: '/images/product3.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    text: 'Redeem',
    time: '1D 16h',
  },
  {
    img: '/images/product1.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    disabled: true,
    text: 'Sold Out',
    time: '1D 16h',
  },
  {
    img: '/images/product2.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    text: 'Redeem',
    time: '1D 16h',
  },
];

const ShopProducts = () => {
  const { show, toggleShow } = useModal(false);

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

              <img src={el.img} alt={el.img} className={styles.productimage} />
              <div className="px-2">
                <div className={styles.name}>{el.name}</div>

                <div className={styles.buy}>
                  <div className="flex flex-row w-full">
                    <div className="items-start">
                      <h4 className={styles.dealtext}>Deal</h4>
                      <strong className={clsx(styles.price, 'fs-20')}>
                        <Image
                          src="/vectors/icons/h.svg"
                          width={14}
                          height={14}
                          alt="h"
                        />
                        {el.price}
                      </strong>
                    </div>
                    <div className="ml-auto">
                      <h4 className={styles.dealtext}>Last Time</h4>
                      <strong className={clsx(styles.price, 'fs-20')}>
                        {el.time}
                      </strong>
                    </div>
                  </div>
                  <Button
                    className={styles.redeem}
                    variant="primary"
                    disabled={el.disabled}
                    onClick={() => toggleShow()}>
                    {el.text}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopProducts;
