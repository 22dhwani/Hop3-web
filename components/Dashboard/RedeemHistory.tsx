/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import MainLayout from '../../layouts/MainLayout';
import Image from 'next/image';
import styles from '../../styles/RedeemHistory.module.scss';
import Product1 from '../../public/images/product1.png';
import Product2 from '../../public/images/product2.png';
import Product3 from '../../public/images/product3.png';
import Product4 from '../../public/images/product4.png';
import Product5 from '../../public/images/product5.png';
import Product6 from '../../public/images/product6.png';
import LeftArrow from '../../public/images/LeftArrow.svg';
import Button from '../Button';
const RedeemHistory = () => {
  const productData = [
    {
      id: 1,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      url: Product1,
      balance: 1200,
      text: 'Refunded',
      date: '30 - 11 - 2002',
    },
    {
      id: 2,
      url: Product2,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      balance: 1200,
      text: 'Reedemed',
      date: '16 - 11 - 2002',
    },
    {
      id: 3,
      url: Product3,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      balance: 2100,
      text: 'Refunded',
      date: '30 - 11 - 2002',
    },
    {
      id: 4,
      url: Product4,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      balance: 1600,
      text: 'Refunded',
      date: '30 - 11 - 2002',
    },
    {
      id: 5,
      url: Product5,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      balance: 500,
      text: 'Refunded',
      date: '30 - 11 - 2002',
    },
    {
      id: 6,
      url: Product6,
      name: 'Classic Bathrobe',
      hashtag: '##ZR1234567890',
      balance: 200,
      text: 'Refunded',
      date: ' 20 - 11 - 2002',
    },
  ];
  return (
    <MainLayout activeLink="/shop">
      <div className="flex flex-row items-center ">
        <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
        <div className={styles.title}>Back </div>
      </div>
      <div className={styles.history}>
        <div className="flex flex-row w-fit md:pt-12 xs:pt-7">
          <h1 className="font-sans text-2xl">Redeem History</h1>
          <Button variant="primary" className="ml-6">
            Posts to earn
          </Button>
        </div>

        {productData.map(item => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div className="flex flex-row justify-between my-8 items-center">
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={item.url}
                    alt="product"
                    className="h-16 w-16 object-cover"
                  />
                  <div className="flex flex-col justify-between h-full">
                    <strong>{item.name}</strong>
                    <p className="text-sm text-slate-600">{item.hashtag}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  <Image
                    src="/vectors/icons/h.svg"
                    width={16}
                    height={16}
                    alt="h"
                    className="mr-1"
                  />
                  {item.balance}
                </div>
                <div className="text-md font-bold text-indigo-400">
                  {item.text}
                </div>
                <div className="text-md font-thin text-slate-500">
                  {item.date}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default RedeemHistory;
