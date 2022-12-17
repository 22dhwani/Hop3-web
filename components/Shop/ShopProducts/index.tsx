import Image from 'next/image';
import clsx from 'clsx';

import useModal from '../../../hooks/useModal';
import Button from '../../Button';
import RedeemModal from '../../../modals/RedeemModal';
import styles from '../../../styles/ShopProducts.module.scss';

const data = [
  {
    img: '/images/prod-1.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
  },
  {
    img: '/images/prod-2.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    limitedTimeOffer: true,
  },
  {
    img: '/images/prod-3.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
  },
  {
    img: '/images/prod-4.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
    disabled: true,
  },
  {
    img: '/images/prod-5.png',
    name: 'LEPUTA Microfiber Dust Cleaning Slipper size 7.5-10',
    price: '2,000',
    disabled: true,
  },
  {
    img: '/images/prod-6.png',
    name: 'Advanced Night Repair Eye Concentrate Matrix 0.5oz',
    price: '8,500',
  },
];

const ShopProducts = () => {
  const { show, toggleShow } = useModal(false);

  return (
    <>
      <RedeemModal show={show} toggleShow={toggleShow} />
      <div className={styles.shopProducts}>
        {data.map((el, idx) => {
          return (
            <div className={styles.item} key={'shop-products' + idx}>
              {el.limitedTimeOffer && (
                <div className={styles.limitedTimeOffer}>Limited-Time</div>
              )}

              <img src={el.img} alt={el.img} />

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
                  variant="dark"
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
