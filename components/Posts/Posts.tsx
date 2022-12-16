import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Posts.module.scss';
import Post from '../../public/images/Post.png';
import Like from '../../public/images/Like.svg';
import Filter from '../Filter/Filter';
import { useQuery } from 'react-query';
import { getPostForUser } from '../../services/post';
import NotLike from '../../public/images/like_not.svg';
import BoostedChip from '../BoostedChip/BoostedChip';
import usePostLike from '../../hooks/usePostLike';

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
const menu = ['All', 'Boosted', 'Draft'];

interface IMyPost {
  userId: string;
}

export default function Posts(props: IMyPost) {
  const { userId } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [pagination, setPagination] = useState({
    page_number: 1,
    limit: 20,
  });
  const postFilter =
    activeTab === 1 ? 'Approved' : activeTab === 2 ? 'Draft' : null;
  const {
    data: userPostData,
    isLoading: isPostLoading,
    error: getUserPostError,
    refetch: getUserPost,
  } = useQuery(
    ['getUserPost', pagination.limit, pagination.page_number, postFilter],
    getPostForUser,
    { enabled: false },
  );

  const allPost = useMemo(() => {
    const allItems = userPostData?.items;
    if (Array.isArray(allItems)) {
      const finalArray: any = [];
      allItems.forEach((item: any) => {
        const tempItem = { ...item };
        const allLike = Array.isArray(tempItem?.reactions?.like)
          ? tempItem?.reactions?.like
          : [];
        const allLove = Array.isArray(tempItem?.reactions?.love)
          ? tempItem?.reactions?.love
          : [];
        const allHaha = Array.isArray(tempItem?.reactions?.haha)
          ? tempItem?.reactions?.haha
          : [];
        const allInsight = Array.isArray(tempItem?.reactions?.insight)
          ? tempItem?.reactions?.insight
          : [];
        const allReactions = [
          ...allLike,
          ...allHaha,
          ...allInsight,
          ...allLove,
        ];
        let isLikeByMe = false;
        if (allReactions.includes(userId)) {
          isLikeByMe = true;
        }
        tempItem.category = tempItem.category
          ? tempItem.category
              .split(',')
              .map((item: string) => ({ text: item, id: item }))
          : [];
        tempItem.postImages = Array.isArray(tempItem.media_url)
          ? tempItem.media_url.map((item: any) => item.signUrl)
          : Array.isArray(tempItem.publicUrls)
          ? tempItem.publicUrls.map((item: any) => item.media_url)
          : [];
        tempItem.isLikeByMe = isLikeByMe;
        tempItem.totalLike = allReactions.length;
        tempItem.status =
          tempItem.status === 'Rejected' ? 'Denied' : tempItem.status;
        finalArray.push(tempItem);
      });
      return finalArray;
    }
    return [];
  }, [userId, userPostData?.items]);

  useEffect(() => {
    getUserPost().then();
  }, [getUserPost, activeTab]);

  return (
    <div className={styles.postcontainer}>
      <div>
        <Filter menu={menu} setActiveTab={setActiveTab} activeTab={activeTab} />
        {allPost.map((data: any) => (
          <MyPostItem key={data?.id} data={data} />
        ))}
      </div>
    </div>
  );
}

const MyPostItem = ({ data }: any) => {
  const { isLikeByMe, onPressLike, totalLikes } = usePostLike({
    postId: data.id,
    isLikeByMe: data.isLikeByMe,
    totalLike: data.totalLike,
  });
  return (
    <div className={styles.postwrapper} key={data?.id}>
      {data?.postImages[0] && (
        <Image src={data?.postImg} alt={''} width={400} height={500} />
      )}
      <div>
        {data?.status === 'Approved' && <BoostedChip />}
        <span className={styles.boldtext}>{data?.title}</span>
        <p className={styles.text}>{data?.description}</p>
      </div>
      <span className={styles.like} onClick={onPressLike}>
        <Image src={isLikeByMe ? Like : NotLike} alt={''} />
        <p className={styles.imgtitle}> {totalLikes} </p>
      </span>
    </div>
  );
};
