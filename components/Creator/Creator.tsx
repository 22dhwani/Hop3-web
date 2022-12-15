import React from 'react';
import styles from '../../styles/Creator.module.scss';
import Image from 'next/image';
import Profile from '../../public/images/ProfileLg.png';
import Posts from '../Posts/Posts';
import MoneyIcon from '../../public/images/Money.svg';
import MoneyPurple from '../../public/images/MoneyPurple.svg';
import UpArrow from '../../public/images/UpArrow.svg';
import GradientBack from '../../public/images/Gradient.png';
import ShiningStart from '../../public/images/ShiningStart.png';
export default function Creator() {
  return (
    <div className={styles.creatorstudio}>
      <div className={styles.profilesetting}>
        <div className={styles.profiledescription}>
          <div className={styles.profile}>
            <Image src={Profile} alt={'profile'} />
            <div className={styles.text}>
              <span className={styles.title}>Davis Franci</span>
              <p className={styles.subtitle}>hop3 Creator</p>
            </div>
          </div>
          <div>
            <button className={styles.settingbtn}>Settings</button>
          </div>
        </div>
        <div className={styles.earningwrapper}>
          <div className={styles.earning}>
            <p className={styles.smalltext}>{"You've earned"}</p>
            <span className={styles.boldtext}>
              <Image src={MoneyIcon} alt={'money sign'} />
              1,250
            </span>
          </div>
          <div className={styles.rewards}>
            <button className={styles.rewardsbuton}>
              Spend Rewards <Image src={UpArrow} alt={'arrow'} />
            </button>
            <button className={styles.rewardsbuton}>
              Rewards History <Image src={UpArrow} alt={'arrow'} />
            </button>
          </div>
        </div>
        <div className={styles.boxwrapper}>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Likes</p>
            <span className={styles.boxvalue}>1530</span>
          </div>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Posts</p>
            <span className={styles.boxvalue}>128</span>
          </div>
          <div className={styles.box}>
            <p className={styles.boxtitle}>Boosted Posts</p>
            <span className={styles.boxvalue}>91</span>
          </div>
        </div>
        <div className={styles.experiencewrapper}>
          <div className={styles.backgroundcard}>
            <Image src={GradientBack} alt={''} />
          </div>
          <div className={styles.card}>
            <span className={styles.cardtitle}>
              <Image src={ShiningStart} alt={''} />

              <p>
                We value your unique experiences!
                <br />
                Upload to earn rewards!
              </p>
            </span>
            <button className={styles.sharebtn}>
              Share my fun experiences
            </button>
          </div>
          <p className={styles.bottomtext}>
            Invite a friend and earn{' '}
            <Image src={MoneyPurple} alt={'money sign'} /> 100
          </p>
        </div>
      </div>
      <div className={styles.postswrapper}>
        <Posts />
      </div>
    </div>
  );
}
