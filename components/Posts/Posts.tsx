import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Posts.module.scss';
import Post from '../../public/images/Post.png';
import Like from '../../public/images/Like.svg';
import Filter from '../Filter/Filter';

const postData = [
  {
    id: 1,
    postImg: Post,
    title: 'This is a very very long Title',
    description:
      'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
    like: 123,
  },
  {
    id: 2,
    postImg: Post,
    title: 'This is a very very long Title',
    description:
      'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
    like: 123,
  },
  {
    id: 3,
    postImg: Post,
    title: 'This is a very very long Title',
    description:
      'Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More',
    like: 123,
  },
];
const menu = ['All', 'Boosted', 'Denied', 'Pending'];

export default function Posts() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = () => {};
  return (
    <div className={styles.postcontainer}>
      <div>
        <Filter menu={menu} setActiveTab={setActiveTab} activeTab={activeTab} />
        {postData.map(data => (
          <div className={styles.postwrapper} key={data?.id}>
            <Image src={data?.postImg} alt={''} />
            <div>
              <span className={styles.boldtext}>{data?.title}</span>
              <p className={styles.text}>{data?.description}</p>
            </div>
            <span className={styles.like}>
              <Image src={Like} alt={''} />
              <p className={styles.imgtitle}> {data?.like} </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
