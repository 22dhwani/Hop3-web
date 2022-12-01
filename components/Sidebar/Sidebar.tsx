import React, {useCallback, useState} from 'react'
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.scss'
import Logo from '../../public/images/Logo.svg'
import Earth from '../../public/images/Earth.svg'
import Shop from '../../public/images/Shop.svg'
import User from '../../public/images/User.svg'
import EarthBlack from '../../public/images/EarthBlack.svg'
import ShopBlack from '../../public/images/ShopBlack.svg'
import UserBlack from '../../public/images/UserBlack.svg'
import UpArrow from '../../public/images/UpArrow.svg'
import {useRouter} from "next/router";

export default function Sidebar() {
  const [isHover, setIsHover] = useState({
    explore: false,
    shop: false,
    creator: false
  })
  const router = useRouter()


  const handleChangeHover = (key: string, val: boolean) => {
    setIsHover((previousIsHover) => {
      return {
        ...previousIsHover,

        [key]: val
      }
    })
  }

  const onClickShareExperience = useCallback(()=>{
    router.push('/share-experience')
  },[])


  const { creator, explore, shop } = isHover
  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <Image src={Logo} alt={''} />
        <div>
          <ul className={styles.menu}>
            <li onMouseOut={() => { handleChangeHover('explore', false) }} onMouseOver={() => { handleChangeHover('explore', true) }} className={styles.item}> <Image className={styles.icon} src={explore ? EarthBlack : Earth} alt={''} />  <p className={styles.text}>Explore</p> {explore && <Image className={styles.arowicon} src={UpArrow} alt={''} />} </li>
            <li onMouseOut={() => { handleChangeHover('shop', false) }} onMouseOver={() => { handleChangeHover('shop', true) }} className={styles.item}> <Image className={styles.icon} src={shop ? ShopBlack : Shop} alt={''} /> <p className={styles.text}>hop3 Shop</p> {shop && <Image className={styles.arowicon} src={UpArrow} alt={''} />} </li>
            <li onMouseOut={() => { handleChangeHover('creator', false) }} onMouseOver={() => { handleChangeHover('creator', true) }} className={styles.item}> <Image className={styles.icon} src={creator ? UserBlack : User} alt={''} /> <p className={styles.text}>Creator Studio</p>{creator && <Image className={styles.arowicon} src={UpArrow} alt={''} />} </li>
          </ul>
        </div>
        <div className={styles.buttonwrapper}>
          <button className={styles.menubutton} onClick={onClickShareExperience}>Share Experience</button>
        </div>
        <div className={styles.textwrapper}>
          <span className={styles.invite}>Invite friends and earn 100</span>
          <p className={styles.help}>Need some help?</p>
        </div>
      </div>
    </div>
  )
}
