import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getPostById } from '../../../services/post';
import Chip from '../../../components/Chip/Chip';
import ImageSlider from '../../../components/ImageSlider';
import styles from '../../../styles/Posts.module.scss';
import { useCategoriesStore } from '../../../store/categoriesStore';
import PostRootView from '../../../components/PostRootView';
import ExplorePostDetails from '../../../components/Explore/ExplorePostDetails';

function ExploreDetails(props: any) {
  const router = useRouter();
  const { categoryDetails } = useCategoriesStore();
  const {
    data: userPostData,
    isLoading: isPostLoading,
    error: getUserPostError,
    refetch: getUserPostById,
  } = useQuery(['getUserPost', router.query.exploreId], getPostById, {
    enabled: false,
  });

  //API Call
  useEffect(() => {
    getUserPostById().then();
  }, [router.query.exploreId]);

  return (
    <>
      <ExplorePostDetails data={userPostData} />
    </>
  );
}

export default ExploreDetails;

{
  /* <PostRootView>
        <div className={styles.poster}>
          <ImageSlider data={renderPostMedia()} />
        </div>
        <div className={styles.descriptionwrapper}>
          <div className={styles.description}>
            <div>
              <span className={styles.boldtext}>{userPostData?.title}</span>
              <p className={styles.text}>{userPostData?.description}</p>
            </div>
            {userPostData?.categories.length > 0 && (
              <Chip chipData={userPostData.categories} />
            )}
          </div>
        </div>
      </PostRootView> */
}
