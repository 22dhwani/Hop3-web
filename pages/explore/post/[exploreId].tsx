import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/router"
import { useQuery } from "react-query";
import { getPostById } from "../../../services/post";
import Chip from '../../../components/Chip/Chip';
import ImageSlider from '../../../components/ImageSlider';
import styles from '../../../styles/Posts.module.scss';
import { useCategoriesStore } from '../../../store/categoriesStore';
import PostRootView from '../../../components/PostRootView';


function exploreDetails(props: any) {
    const router = useRouter()
    const { categoryDetails } = useCategoriesStore();
    const {
        data: userPostData,
        isLoading: isPostLoading,
        error: getUserPostError,
        refetch: getUserPostById,
    } = useQuery(
        ['getUserPost', router.query.exploreId],
        getPostById,
        { enabled: false },
    );

    //API Call
    useEffect(() => {
        getUserPostById().then()
    }, [router.query.exploreId])

    //Destructure Post Media
    const renderPostMedia = () => {
        const tempItem = { ...userPostData }
        tempItem.postImages = Array.isArray(tempItem.media_url) ? tempItem.media_url.map((item: any) => item.signUrl) : Array.isArray(tempItem.publicUrls) ? tempItem.publicUrls.map((item: any) => item.media_url) : [];
        return tempItem.postImages;
    }

    return (
        <>
            <PostRootView>
                <div className={styles.poster}>
                    <ImageSlider data={renderPostMedia()} />
                </div>
                <div className={styles.descriptionwrapper}>
                    <div className={styles.description}>
                        <div>
                            <span className={styles.boldtext}>{userPostData?.title}</span>
                            <p className={styles.text}>{userPostData?.description}</p>
                        </div>
                        {userPostData?.categories.length > 0 && <Chip chipData={userPostData.categories} />}
                    </div>
                </div>
            </PostRootView>
        </>
    )
}

export default exploreDetails