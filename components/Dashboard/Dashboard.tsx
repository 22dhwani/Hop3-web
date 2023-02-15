import React, { useEffect } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Image from 'next/image';
import Posts from '../Posts/Posts';
import MoneyIcon from '../../public/images/Money.svg';
import { MoneyPurple } from '../Icons/Icons';
// import MoneyPurple from '../../public/images/money_purple.svg';

import GradientBack from '../../public/images/gradient.png';
import ShiningStart from '../../public/images/shinningstar.png';
import Product1 from '../../public/images/product1.png';
import Product2 from '../../public/images/product2.png';
import Product3 from '../../public/images/product3.png';
import Product4 from '../../public/images/product4.png';
import Product5 from '../../public/images/product5.png';
import Product6 from '../../public/images/product6.png';
import { useUserStore } from '../../store/userStore';
import Post1 from '../../public/images/post.png';
import Post2 from '../../public/images/post2.png';
import Settings from '../../public/images/settings.svg';
import Button from '../Button';
export default function Creator() {
  const { userDetails: userData, fetchUserData } = useUserStore();
  const productdata = [
    {
      url: Product1,
    },
    {
      url: Product2,
    },
    {
      url: Product3,
    },
    {
      url: Product4,
    },
    {
      url: Product5,
    },
    {
      url: Product6,
    },
  ];
  const postdata = [
    {
      url: Post1,
    },
    {
      url: Post2,
    },
    {
      url: Post2,
    },
    {
      url: Post2,
    },
    {
      url: Post1,
    },
    {
      url: Post2,
    },
    {
      url: Post2,
    },
    {
      url: Post2,
    },
  ];
  useEffect(() => {
    fetchUserData().then();
  }, [fetchUserData]);

  return (
    <div className={styles.creatorstudio}>
      <div className={styles.profilesetting}>
        <div className={styles.profileDescription}>
          <div className={styles.profile}>
            <div className="flex flex-row">
              {userData?.image && (
                <Image
                  src={userData?.image}
                  alt={'profile'}
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              )}
              <div className={styles.text}>
                <span className={`${styles.title} text-2xl`}>
                  {userData?.username || ''}
                </span>
                <p className={`${styles.subtitle} text-sm`}>hop3 Creator</p>
              </div>
            </div>
            <div className="ml-5">
              <Button
                variant="dark-outlined"
                href="settings/account-settings"
                className="!min-w-min">
                <Image
                  src={Settings}
                  alt={'settings'}
                  height={20}
                  width={20}
                  className="min-w-min mr-3"
                />
                Settings
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`${styles.earningwrapper} grid md:grid-cols-4 gap-5 xs:grid-cols-2 mt-7 `}>
          <div className={styles.earning}>
            <p className={styles.smalltext}>{'Rewarded Token'}</p>
            <span className={styles.boldtext}>
              <Image src={MoneyIcon} alt={'money sign'} />
              {userData?.balance || 0}
            </span>
            <Button
              variant="dark"
              className="!text-sm !max-w-max mt-3 !min-w-min">
              Rewards History
            </Button>
          </div>
          <div className={styles.earning}>
            <p className={styles.bigtext}>{'Unlimited Rewards'}</p>
            <span className={`${styles.smalltext} font-boldm mt-2`}>
              {/* <Image src={MoneyIcon} alt={'We value your unique experiences'} />
              {userData?.balance || 0} */}
              We value your unique experiences
            </span>
            <Button
              variant="primary"
              className="!text-sm !max-w-max mt-3 !min-w-min">
              Rewards History
            </Button>
          </div>
          <div className={styles.earning}>
            <span className={styles.boldtext}>
              <Image src={MoneyIcon} alt={'money sign'} />
              {userData?.balance || 100}
            </span>
            <p className={styles.smalltext}>{'Share the joy'}</p>
            <Button
              variant="primary"
              className="!text-sm !max-w-max mt-3 !min-w-min">
              Rewards History
            </Button>
          </div>
          <div className={styles.earning}>
            <p className={styles.bigtext}>{'Unlimited Rewards'}</p>
            <span className={`${styles.smalltext} font-boldm mt-2`}>
              {/* <Image src={MoneyIcon} alt={'We value your unique experiences'} />
              {userData?.balance || 0} */}
              We value your unique experiences
            </span>
            <Button
              variant="primary"
              className="!text-sm !max-w-max mt-3 !min-w-min">
              Browse Feeds
            </Button>
          </div>
          {/* <div className={styles.rewards}>
            <button className={styles.rewardsbuton}>
              Spend Rewards <Image src={UpArrow} alt={'arrow'} />
            </button>
            <button className={styles.rewardsbuton}>
              Rewards History <Image src={UpArrow} alt={'arrow'} />
            </button>
          </div> */}
        </div>
        {/* <div className={styles.boxwrapper}>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Likes</p>
            <span className={styles.boxvalue}>{userData?.total_like || 0}</span>
          </div>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Posts</p>
            <span className={styles.boxvalue}>{userData?.total_post || 0}</span>
          </div>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Boosted Posts</p>
            <span className={styles.boxvalue}>
              {userData?.total_approved_post || 0}
            </span>
          </div>
        </div> */}
        <div className={styles.experiencewrapper}>
          <div className={styles.cardwrapper}>
            <div className="flex flex-row w-full justify-between">
              <strong className="text-xl ">Redeemed</strong>
              <strong className="text-sm font-extrabold underline items-end">
                View All
              </strong>
            </div>
            <div className={styles.card} style={{ marginBottom: '21px' }}>
              <span className={styles.cardtitle}>
                <Image src={ShiningStart} alt={''} />

                <p className="">You dont have any products redeemed yet.</p>
              </span>
              <Button variant="primary" href="/shop" className="!text-sm">
                Browse Hop3 Shop
              </Button>
            </div>
          </div>
          <div className={styles.cardwrapper}>
            <div className="flex flex-row w-full justify-between">
              <strong className="text-xl ">Your videos</strong>
              <strong className="text-sm font-extrabold underline items-end">
                View All
              </strong>
            </div>
            <div className={styles.backgroundcard}>
              <Image src={GradientBack} alt={''} width={350} height={250} />
            </div>
            <div className={styles.shopcard}>
              <span className={styles.cardtitle}>
                <Image src={ShiningStart} alt={''} />

                <p>
                  We value your unique experiences!
                  <br />
                  Upload to earn rewards!
                </p>
              </span>
              <Button variant="dark" href="/shop">
                Share A review video
              </Button>
            </div>
          </div>
          <p className={styles.bottomtext}>
            Invite a friend and earn
            <div className="flex flex-row gap-2">
              <MoneyPurple />
              100
            </div>
            {/* <Image src={MoneyPurple} alt={'money sign'} /> 100 */}
          </p>
          <div className={styles.cardwrapper}>
            <div className="flex flex-row w-full justify-between">
              <strong className="text-xl ">Redeemed</strong>
              <strong className="text-sm font-extrabold underline items-end">
                View All
              </strong>
            </div>
            <div
              className={`${styles.productcard} grid md:grid-cols-6 xs:grid-cols-2 md:gap-4 xs:gap-0`}
              style={{ marginBottom: '21px' }}>
              {productdata.map(item => {
                // eslint-disable-next-line react/jsx-key
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Image
                    src={item.url}
                    alt="Product"
                    className="xs:w-11/12 md:w-full h-full"
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.cardwrapper}>
            <div className="flex flex-row w-full justify-between">
              <strong className="text-xl ">Your videos</strong>
              <strong className="text-sm font-extrabold underline items-end">
                View All
              </strong>
            </div>

            <div
              className={`${styles.productcard} grid md:grid-cols-4 xs:grid-cols-1 md:gap-4 xs:gap-4`}
              style={{ marginBottom: '21px' }}>
              {postdata.map(item => {
                // eslint-disable-next-line react/jsx-key
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Image
                    src={item.url}
                    alt="Product"
                    className="xs:w-full md:w-full h-full"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className={styles.postswrapper}>
<Posts />
</div> */
}
