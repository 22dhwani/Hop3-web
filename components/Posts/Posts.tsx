import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import styles from '../../styles/Posts.module.scss';

import UpArrow from '../../public/images/UpArrow.svg';
import Like from '../../public/images/Like.svg';
import NotLike from '../../public/images/like_not.svg';
import Logout from '../../public/images/Logout.png';
import { FIREBASE_AUTH } from '../firebase';
import ImageSlider from '../ImageSlider';
import Chip from '../Chip/Chip';
import { useRouter } from 'next/router';
import Filter from '../Filter/Filter';
import { useMutation, useQuery } from 'react-query';
import {
  approvePost,
  createReaction,
  getAllPost,
  getPostForAdmin,
  rejectPost,
} from '../../services/post';
import Deal from '../Deal/Deal';
import usePostLike from '../../hooks/usePostLike';
import MainLayout from '../../layouts/MainLayout';
import { useUserStore } from '../../store/userStore';
import instance from '../../config/axiosconfig';
import { useCategoriesStore } from '../../store/categoriesStore';
import Modal from '../../modals/Modal';
import labels from '../../utils/labels.json';
import { EmptyState } from '../Exceptions';
import Link from 'next/link';

interface StatusColorInterface {
  [key: string]: string;
}
interface StatusType {
  [key: string]: string;
}
interface PostDataProps {
  data: any;
  isAdmin?: boolean;
  onRefresh?: () => void;
}
const status: string[] = ['Pending', 'Approved', 'Denied'];
const statusColor: StatusColorInterface = {
  Pending: '#DED2FF',
  Approved: '#70FFC3',
  Denied: '#000000',
};

const menu = ['All', 'Boosted', 'Denied', 'Pending'];

export default function Posts() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showUploadPostModal, setShowUploadPostModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>({});
  const [pagination, setPagination] = useState({
    page_number: 1,
    limit: 20,
  });
  const { userDetails: userData } = useUserStore();
  const { categoryDetails } = useCategoriesStore();
  const {
    data: userPostData,
    isLoading: isPostLoading,
    error: getUserPostError,
    refetch: getUserPost,
  } = useQuery(
    ['getUserPost', pagination.limit, pagination.page_number],
    getAllPost,
    { enabled: false },
  );
  const postFilter =
    activeTab === 1
      ? 'Approved'
      : activeTab === 2
      ? 'Rejected'
      : activeTab === 3
      ? 'Pending'
      : null;

  const { data: adminPostData, refetch: getAdminPost } = useQuery(
    ['getAdminPost', pagination.limit, pagination.page_number, postFilter],
    getPostForAdmin,
    { enabled: false },
  );

  console.log(userPostData,'POSTS')

  const allPost = useMemo(() => {
    const allItems =
      userData?.role === 'user' ? userPostData?.items : adminPostData?.items;
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
        if (allReactions.includes(userData?.id)) {
          isLikeByMe = true;
        }
        tempItem.categories = tempItem.categories.length
          ? tempItem.categories.map((item: string) => ({
              text: categoryDetails[item] || '',
              id: item,
            }))
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
  }, [userPostData?.items, userData?.id, userData?.role, adminPostData?.items]);

  useEffect(() => {
    if (router.query?.postSuccess) {
      setShowUploadPostModal(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (userData?.role === 'admin') {
      getAdminPost().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (userData?.role === 'user') {
      getUserPost().then();
    }
    if (userData?.role === 'admin') {
      getAdminPost().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.role]);

  const onPressShareExperience = useCallback(() => {
    router.push('/share-experience');
  }, [router]);

  const onRefresh = useCallback(() => {
    getAdminPost();
  }, [getAdminPost]);

  const onPressCloseModal = useCallback(() => {
    setShowUploadPostModal(false);
    router.replace('/explore');
  }, [router]);

  const isAdmin = userData?.role === 'admin';

  return (
    <div className={styles.container}>
      <Modal show={showUploadPostModal} toggleShow={onPressCloseModal} />
      <div>
        {isAdmin && (
          <Filter
            menu={menu}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        )}
        {allPost.length ? (
          allPost.map((data: any, idx: number): any => (
            <PostItem
              key={'post-item' + idx}
              data={data}
              onRefresh={onRefresh}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <EmptyState message={labels.emptyMessage} />
        )}
      </div>
    </div>
  );
}

const UserProfile = (props: any) => {
  const { userImgUrl, title, subtitle } = props;

  return (
    <div className={styles.profiledescription}>
      <Image src={userImgUrl} alt={'profile'} height={38} width={38} />
      <div>
        <span className={styles.title}>{title}</span>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

const PostItem: FC<PostDataProps> = props => {
  const { data, isAdmin, onRefresh } = props;
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const { isLikeByMe, onPressLike, totalLikes } = usePostLike({
    postId: data.id,
    isLikeByMe: data.isLikeByMe,
    totalLike: data.totalLike,
  });
  const approvePostMutation = useMutation(approvePost);
  const rejectPostMutation = useMutation(rejectPost);

  useEffect(() => {
    if (approvePostMutation.isSuccess || rejectPostMutation.isSuccess) {
      onRefresh && onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvePostMutation.isSuccess, rejectPostMutation.isSuccess]);

  const handleChange = useCallback(
    (event: any) => {
      const localStatus = event?.target?.value;
      setSelectedStatus(localStatus);
      if (localStatus === 'Approved') {
        approvePostMutation.mutate(data?.id);
      } else if (localStatus === 'Denied') {
        rejectPostMutation.mutate(data?.id);
      }
    },
    [approvePostMutation, data?.id, rejectPostMutation],
  );

  console.log(data,'DATA')

  return (
    <div className={styles.postwrapper} key={data?.id}>
      <div className={styles.poster}>
        <ImageSlider data={data.postImages} />
      </div>
      <div className={styles.descriptionwrapper}>
        <div className={styles.description}>
          <UserProfile
            userImgUrl={data?.user.image}
            title={data?.user.username}
            subtitle={'Hop3'}
          />
          {data.post_type === 'deal' && <Deal />}
          <div>
            <span className={styles.boldtext}>{data?.title}</span>
            <p className={styles.text}>{data?.description}</p>
          </div>
          {/* <div className={styles.comment}>
            <Image src={data?.commentImg} alt={"profile"} />

            <p className={styles.imgtitle}>{data?.commentText}</p>
          </div> */}
          {/*<div>*/}
          {/*  <div className={styles.badge}></div>*/}
          {/*</div>*/}
          {data.categories.length > 0 && <Chip chipData={data.categories} />}
          <div className={styles.explore}>
            <Link href={`/explore/post/${data.id}`}>
            <p className={styles.exploretext}>Expolre now</p>

            </Link>
            <Image className={styles.arowicon} src={UpArrow} alt={''} />
          </div>
          <div className={styles.selectwrapper}>
            <span className={styles.like}>
              <Image
                src={isLikeByMe ? Like : NotLike}
                alt={''}
                style={{ fill: 'red' }}
                onClick={onPressLike}
              />
              <p className={styles.imgtitle}> {totalLikes} </p>
            </span>
            {isAdmin && (
              <select
                id="demo-multiple-name"
                value={selectedStatus}
                className={styles.customselect}
                style={{
                  backgroundColor: statusColor[selectedStatus],
                  color: selectedStatus === 'Denied' ? '#FFF' : '#000',
                }}
                onChange={handleChange}>
                {status.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
