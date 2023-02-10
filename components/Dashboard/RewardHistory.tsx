import MainLayout from '../../layouts/MainLayout';
import Image from 'next/image';
import styles from '../../styles/RedeemHistory.module.scss';

import Thunderstorms from '../../public/images/thunderstorms.svg';
import Shop from '../../public/images/shop-black.svg';

import Like from '../../public/images/thumbs-up.svg';
import LeftArrow from '../../public/images/LeftArrow.svg';
import Button from '../Button';
const RedeemHistory = () => {
  const productData = [
    {
      id: 1,
      name: 'Your post has been posted',
      hashtag: '##ZR1234567890',
      url: Thunderstorms,
      balance: 1200,
      text: 'Earned',
      date: '30 - 11 - 2002',
    },
    {
      id: 2,
      url: Like,
      name: 'You got a new like',
      hashtag: '##ZR1234567890',
      balance: 1200,
      text: 'Reedemed',
      date: '16 - 11 - 2002',
    },
    {
      id: 3,
      url: Shop,
      name: 'You redeemed a product',
      hashtag: '##ZR1234567890',
      balance: 2100,
      text: 'Earned',
      date: '30 - 11 - 2002',
    },
    {
      id: 4,
      url: Like,
      name: 'You got a new like',
      hashtag: '##ZR1234567890',
      balance: 1600,
      text: 'Reedemed',
      date: '30 - 11 - 2002',
    },
    {
      id: 5,
      url: Shop,
      name: 'You redeemed a product',
      hashtag: '##ZR1234567890',
      balance: 500,
      text: 'Reedemed',
      date: '30 - 11 - 2002',
    },
    {
      id: 6,
      url: Thunderstorms,
      name: 'Your post has been posted',
      hashtag: '##ZR1234567890',
      balance: 200,
      text: 'Earned',
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
              <div className="flex flex-row items-center my-8">
                <Image
                  src={item.url}
                  alt="product"
                  style={{ fill: 'black' }}
                  className="h-8 w-8 object-cover"
                />
                <div className="grid md:grid-cols-4 xs:grid-cols-2 w-full xs:ml-5 md:items-center md:place-content-start  xs:place-content-center xs:gap-2 md:gap-0">
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-col justify-between">
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
                  {item.text === 'Reedemed' ? (
                    <div className="text-md font-bold text-red-500">
                      {item.text}
                    </div>
                  ) : (
                    <div className="text-md font-bold text-slate-900">
                      {item.text}
                    </div>
                  )}

                  <div className="text-md font-thin text-slate-500">
                    {item.date}
                  </div>
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
