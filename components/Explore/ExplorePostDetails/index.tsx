import router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import MainLayout from '../../../layouts/MainLayout';
import { getPostById } from '../../../services/post';
import Chip from '../../Chip/Chip';
import Image from 'next/image';
import styles from '../../../styles/ExplorePostDetails.module.scss';
import LeftArrow from '../../../public/images/left_arrow.svg';
import Post1 from '../../../public/images/post.png';
import UserProfileImage from '../../../public/images/profilelg.png';
import Button from '../../Button';
import Thunderstorms from '../../../public/images/thunderstorms.svg';
import Like from '../../../public/images/like.svg';
import UpArrow from '../../../public/images/up_arrow.svg';
import ProductCover from '../../../public/images/productcover.png';
import ImageSlider from '../../ImageSlider';
import Link from 'next/link';
import {
  getCategoryById,
  useCategoriesStore,
} from '../../../store/categoriesStore';

export interface PostDetail {
  id: string;
  post_type: string;
  title: string;
  description: string;
  categories: string;
  status: string;
  event: string;
  location: string;
  price_range: string;
  hashtag: string[];
  reactions: Reactions;
  post_media: Postmedia[];
  media_url: Mediaurl[];
  publicUrls: Publicurl[];
  user: User;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  usernmae: string;
  email: string;
  image: string;
}

export interface Publicurl {
  media_url: string;
  content_type: string;
}

export interface Mediaurl {
  signUrl: string;
  media_name: string;
}

export interface Postmedia {
  content_type: string;
  media_name: string;
}

export interface Reactions {
  like: any[];
  love: any[];
  haha: any[];
  insight: any[];
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExplorePostDetails = (props: { data?: any }) => {
  const [categories, setCategories] = useState([]);
  const {
    data: userPostData,
    isLoading: isPostLoading,
    error: getUserPostError,
    refetch: getUserPostById,
  } = useQuery(['getUserPost', router.query.exploreId], getPostById, {
    enabled: false,
  });
  const { categoryDetails } = useCategoriesStore();

  const allCtaegories = useMemo(() => {
    const allItems = userPostData?.categories;

    if (Array.isArray(allItems)) {
      const finalArray: any = [];
      allItems.forEach((item: any) => {
        let tempItem = { text: '', id: item };

        tempItem = { text: categoryDetails[item] || '', id: item };
        finalArray.push(tempItem);
      });
      setCategories(finalArray);
      console.log(finalArray);
      return finalArray;
    }
  }, [userPostData]);
  console.log(categories);
  const renderPostMedia = () => {
    const tempItem = { ...userPostData };
    tempItem.post_media = Array.isArray(tempItem.media_url)
      ? tempItem.media_url.map((item: any) => item.signUrl)
      : Array.isArray(tempItem.publicUrls)
      ? tempItem.publicUrls.map((item: any) => item.media_url)
      : [];
    return tempItem.post_media;
  };

  useEffect(() => {
    renderPostMedia();
  }, []);

  return (
    // <div>
    //   <h1>hello</h1>
    //   <h1>{userPostData?.id ?? 0}</h1>
    // </div>

    <MainLayout activeLink="/shop">
      <Link href="/explore">
        {' '}
        <div className="flex flex-row items-center ">
          <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
          <div className={styles.title}>Back </div>
        </div>
      </Link>

      <div className="grid md:grid-cols-2 sm:grid-cols-1  md:gap-0  sm:gap-7">
        <div className={`${styles.exploreleft} md:my-7 xs:mt-7 `}>
          <div className="max-h-min">
            <Image
              width={100}
              height={100}
              src={userPostData?.publicUrls[0]?.media_url ?? Post1}
              alt={'logo'}
              className=" xs:w-full xs:h-full md:w-11/12 md:h-full object-cover"
            />
          </div>
        </div>
        <div className={`md:my-7 xs:mt-7 ${styles.exploreleft} `}>
          <div className={styles.profileDescription}>
            <Image
              src={userPostData?.user.image ?? UserProfileImage}
              alt={'profile'}
              height={38}
              width={38}
            />
            <div>
              <span className={styles.title}>
                {userPostData?.user.usernmae ?? 'UserName'}
              </span>
              <p className={styles.subtitle}>Hop3 Creator</p>
            </div>
          </div>
          <Button variant="primary" className={styles.deal}>
            <Image
              src={Thunderstorms}
              alt={'profile'}
              height={20}
              width={20}
              className="mr-3"
            />
            Boosted
          </Button>
          <div className="mt-4">
            <strong className="text-2xl font-sans">
              {userPostData?.title ?? 'This is a very long title'}
            </strong>
            <p className="text-sm mt-1 text-justify md:w-11/12 xs:w-full">
              {userPostData?.description ??
                ` Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc`}
            </p>
            <br></br>

            <p className="text-sm mt-5 text-justify md:w-11/12 xs:w-full">
              <strong>Location : </strong>
              {userPostData?.location ?? `Lorem Ipsum dolor`}
            </p>

            <p className="text-sm mt-5 text-justify md:w-8/12 xs:w-full text-purple-400 ">
              {userPostData?.hashtag.map((item, index) => {
                return (
                  <span key={index} className="pr-2 ">
                    {item}
                  </span>
                );
              })}
            </p>
            <div className="mt-5">
              {/* {allCtaegories.length ??
                allCtaegories.map((item: any) => {
                  <Chip chipData={item} />;
                })} */}
              {props.data?.categories.length > 0 && (
                <Chip chipData={categories} />
              )}
            </div>

            <div className="flex flex-row mt-5 items-center">
              <p className="hover:underline underline font-semibold">
                Learn more
              </p>
              <Image src={UpArrow} alt={'arrow'} className="ml-2" />
            </div>
            <div className="flex flex-row bg-yellow-50 md:w-4/6 px-2 py-2 rounded-lg my-7 gap-4 xs:w-11/12">
              <Image
                src={ProductCover}
                alt={'logo'}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <strong className="text-sm">Chi Forest Sparkling Water</strong>
                <div className="flex items-center">
                  <p className="">
                    <Image
                      src="/vectors/icons/h.svg"
                      width={10}
                      height={10}
                      alt="h"
                      className="mr-1"
                    />
                    1200
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <span className="flex flex-row items-center">
                <Image src={Like} alt={''} style={{ fill: 'red' }} />
                <p className="text-xl ml-2"> 17 </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExplorePostDetails;
