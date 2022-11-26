import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import Profile from '../../public/images/Profile.png'
import Post from '../../public/images/Post.png'
import Post2 from '../../public/images/Post2.png'
import User from '../../public/images/Avtar.png'
import Like from '../../public/images/Like.svg'

import {MenuItem, Select} from '@mui/material';
import ImageSlider from '../ImageSlider'
interface StatusColorInterface { 
  [key: string]: string
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const status: string[] = ['Pending', 'Approved', 'Denied'];
const statusColor: StatusColorInterface = {'Pending': '#DED2FF' , 'Approved' : '#70FFC3', 'Denied': '#000000'};

const postData=[{
    id: 1,
    postImages: [Post,Post2, Post],
    prostUserImg: Profile,
    prostUserTitle: 'Davis Franci',
    prostUserSubTitle: 'hop3 Creator',
    title: 'This is a very very long Title',
    description: 'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
    commentImg: User,
    commentText: 'The Dead Rabbit',
    like: 123,
    status: 'Pending'
},
{
  id: 2,
  postImages: [Post,Post],
  prostUserImg: Profile,
  prostUserTitle: 'Davis Franci',
  prostUserSubTitle: 'hop3 Creator',
  title: 'This is a very very long Title',
  description: 'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
  commentImg: User,
  commentText: 'The Dead Rabbit',
  like: 123,
  status: 'Approved'
},
{
  id: 3,
  postImages: [Post,Post],
  prostUserImg: Profile,
  prostUserTitle: 'Davis Franci',
  prostUserSubTitle: 'hop3 Creator',
  title: 'This is a very very long Title',
  description: 'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
  commentImg: User,
  commentText: 'The Dead Rabbit',
  like: 123,
  status: 'Denied'
}
]
export default function Dashboard() {

  const handleChange = () => {

  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.right}>
          <div className={styles.profile}>

            <button className={styles.sharebutton}>Share Experience</button>
            <Image className={styles.profileimg} src={Profile} alt={'profile'} />
          </div>
        </div>
      </header>
      <div>
        <div className={styles.filter}>
          filter by:
          <button className={styles.filterbutton}>All</button>
          <button className={styles.filterbutton}>Approved</button>
          <button className={styles.filterbutton}>Denied</button>
          <button className={styles.filterbutton}>Pending</button>
        </div>
        {
          postData.map((data)=>(
            <div className={styles.postwrapper} key={data?.id}>
            <div className={styles.poster}>
              {/* <Image src={data?.postImg} alt={''} /> */}
              <ImageSlider data={data?.postImages} />
            </div>
            <div className={styles.descriptionwrapper}>
              <div className={styles.description}>
                <div className={styles.profiledescription}>
                  <Image src={data?.prostUserImg} alt={'profile'} />
                  <div>
                    <span className={styles.title}>{data?.prostUserTitle}</span>
                    <p className={styles.subtitle}>{data?.prostUserSubTitle}</p>
                  </div>
                </div>
                <div>
                  <span className={styles.boldtext}>{data?.title}</span>
                  <p className={styles.text}>{data?.description}</p>
                </div>
                <div className={styles.comment}>
                  <Image src={data?.commentImg} alt={'profile'} />
  
                 <p className={styles.imgtitle}>{data?.commentText}</p>
                </div>
                <div className={styles.selectwrapper}>
                 <span className={styles.like}><Image src={Like} alt={''} /><p className={styles.imgtitle}> {data?.like} </p></span>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={data?.status}
                    sx={{
                      bgcolor: statusColor?.[data?.status],
                      border: 'none',
                      borderColor: 'transparent',
                      width: '200px',
                      padding: '0px 20px',
                      borderRadius: '9px',
                      height: '42px',
                      fontWeight: '500',
                      fontSize: '18px',
                      color: data?.status === 'Denied' ? '#FFF' : '#000',
                    }}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    {status.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
  
                </div>
              </div>
            </div>
           </div>
          ))
        }
       
      </div>
    </div>
  )
}
