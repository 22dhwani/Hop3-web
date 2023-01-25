import clsx from 'clsx';
import Image from 'next/image';
import styles from '../../styles/ShareExperience.module.scss';
import tooltipStyles from '../../styles/Tooltip.module.scss';
import Button from '../Button';
import Input from '../Input';
import Navbar from '../Navbar';
import PostType from '../PostType';
import UploaderInput from '../UploaderInput';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  addPostMediaDetails,
  createPost,
  getSignedUrl,
  IPostMediaItem,
  uploadOnS3Bucket,
} from '../../services/post';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useUserStore } from '../../store/userStore';
import { Step } from '../Step/Step';
import { useCategoriesStore } from '../../store/categoriesStore';
import InputLabel from '../InputLabel';
import { findHashtags } from '../../helper/common';
import { GOOGLE_PLACES_API_KEY } from '../../constant/constant';

const rewardItems = [
  {
    amount: 2,
    desc: 'a themed post',
    extra: false,
  },
  {
    amount: 20,
    desc: 'an in-depth post',
    extra: false,
  },
  {
    amount: 100,
    desc: 'when hop3 boost your post',
    extra: true,
  },
];

const ShareExperience = () => {
  const { userDetails: userData, fetchUserData } = useUserStore();
  const createPostMutation = useMutation(createPost);
  const createPostMediaMutation = useMutation(getSignedUrl);
  const addPostMediaDetailsMutation = useMutation(addPostMediaDetails);
  const router = useRouter();
  const [postInfo, setPostInfo] = useState({
    title: '',
    description: '',
    location: '',
    event: '',
    hashtags: [],
    other_category: '',
    post_type: 'standard',
    files: [],
  });
  const [error, setError] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    event: '',
    price: '',
    hashtags: '',
  });
  const [stepIndex, setStepIndex] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const { categories: allCategories } = useCategoriesStore();

  useEffect(() => {
    fetchUserData().then();
  }, [fetchUserData]);

  const onSelectCategory = useCallback(
    (item: string) => {
      if (categories.includes(item)) {
        if (item === 'other') {
          setPostInfo(prevState => ({ ...prevState, other_category: '' }));
        }
        setCategories(prevState =>
          prevState.filter((subItem: any) => item !== subItem),
        );
      } else if (categories.length < 5) {
        setCategories(prevState => [...prevState, item]);
      }
    },
    [categories],
  );

  const checkValidation = useCallback(() => {
    const tempError = { ...error };
    tempError.title = postInfo.title === '' ? 'Title is required' : '';
    tempError.description =
      postInfo.description === '' ? 'Description is required' : '';
    setError(tempError);
    return tempError;
  }, [error, postInfo]);

  const onPressSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (stepIndex === 1) {
        setStepIndex(2);
        return;
      }
      if (stepIndex === 2) {
        setStepIndex(3);
        setPostInfo(prevState => ({
          ...prevState,
          hashtags: findHashtags(prevState.description),
        }));
        return;
      }
      const tempError = checkValidation();
      if (!tempError.title && !tempError.description) {
        const payload: any = {
          title: postInfo.title,
          description: postInfo.description,
          media_type: 'image',
        };
        if (postInfo.post_type) {
          payload.post_type = postInfo.post_type;
        }
        if (categories.length) {
          payload.categories = categories.filter(item => item !== 'other');
        }
        if (postInfo.hashtags.length) {
          payload.hashtag = postInfo.hashtags;
        }
        if (postInfo.event) {
          payload.event = postInfo.event;
        }
        if (postInfo.location) {
          payload.location = postInfo.location;
        }
        if (postInfo.other_category) {
          payload.other_category = postInfo.other_category;
        }

        createPostMutation.mutate(payload, {
          onSuccess: (data: any) => {
            console.log('Valueee', data);
            const postId = data.id;
            //@ts-ignore
            const finalFilesData: IPostMediaItem[] = postInfo.files.map(
              (item: any) => ({
                file_size_mb: item.fileSize / 1024 / 1024,
                content_type: item.type,
              }),
            );
            createPostMediaMutation.mutate(
              {
                postId: postId,
                postMediaData: {
                  post_media: finalFilesData,
                },
              },
              {
                onSuccess: async (urlData: any) => {
                  const successDetails = [];
                  for (let i = 0; i < urlData.post_media_data.length; i++) {
                    const resp = await uploadOnS3Bucket({
                      uploadUrl: urlData.post_media_data[i].signUrl,
                      // @ts-ignore
                      fileData: postInfo.files[i]?.fileObj,
                      fields: urlData.post_media_data[i].fields,
                      content_type: urlData.post_media_data[i].content_type,
                    });
                    console.log('Upload response', resp);
                    if (resp === 204) {
                      successDetails.push({
                        media_name: urlData.post_media_data[i].name,
                        content_type: urlData.post_media_data[i].content_type,
                      });
                    }
                  }
                  addPostMediaDetailsMutation.mutate(
                    {
                      postId: postId,
                      mediaData: {
                        post_media: successDetails,
                      },
                    },
                    {
                      onSuccess: async (updatedPost: any) => {
                        console.log('Updated post', updatedPost);
                        router
                          .replace({
                            pathname: '/explore',
                            query: {
                              postSuccess: true,
                            },
                          })
                          .then();
                      },
                    },
                  );
                },
              },
            );
          },
        });
      }
    },
    [
      addPostMediaDetailsMutation,
      checkValidation,
      createPostMediaMutation,
      createPostMutation,
      postInfo,
      router,
      stepIndex,
    ],
  );

  const onChangePostInfo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id;
      const value = event.target.value;
      setPostInfo(prevState => ({
        ...prevState,
        [id]: value,
      }));
    },
    [],
  );

  // useEffect(() => {
  //   if (createPostMutation.isSuccess) {
  //     router.back();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [createPostMutation.isSuccess]);

  const isAdminOrCreator =
    userData?.role === 'admin' || userData?.role === 'creator';

  const onFileSelected = useCallback((files: any) => {
    setPostInfo(prevState => ({ ...prevState, files }));
  }, []);

  const onPressBack = useCallback(
    (e: any) => {
      e.preventDefault();
      if (stepIndex === 1) {
        router.back();
      } else {
        setStepIndex(prevState => prevState - 1);
      }
    },
    [router, stepIndex],
  );

  const isButtonDisabled =
    stepIndex === 1
      ? false
      : stepIndex === 2
      ? !postInfo.title || !postInfo.description || !postInfo.files.length
      : false;

  return (
    <div className={styles.shareExperienceContainer}>
      <Navbar withoutShareExpBtn />
      <Step numberOfSteps={3} activeStep={stepIndex} />
      <div className={styles.shareExperienceWrap}>
        <div className={styles.modal}>
          {stepIndex === 1 && (
            <>
              <h1 className={styles.title}>Share your unique experiences</h1>
              <div className={styles.desc}>
                Share your experience with thousands of hoppers
                <br />
                <br />
                <div>
                  All you need to do is to tell us:
                  <ul>
                    <li>What events to go</li>
                    <li>Where to eat</li>
                    <li>What to buy (local-based)</li>
                  </ul>
                </div>
              </div>

              <div className={styles.rewards}>
                <div className={styles.head}>
                  You will get rewards when you post
                  <Image
                    src="/vectors/icons/back.svg"
                    alt="arrow"
                    width={12}
                    height={12}
                  />
                </div>

                <div className={styles.items}>
                  {rewardItems.map((el, idx) => {
                    return (
                      <div className={styles.item} key={'award' + idx}>
                        <div className={styles.amount}>
                          <Image
                            src="/vectors/icons/h.svg"
                            width={12}
                            height={12}
                            alt="h"
                          />
                          <strong>{el.amount}</strong>
                        </div>
                        <div className={styles.detail}>{el.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <form>
            {stepIndex === 2 && (
              <>
                <div className={clsx(styles.input, tooltipStyles.tooltip)}>
                  <UploaderInput
                    initialFile={postInfo.files}
                    id="upload"
                    label="Upload video or image"
                    required
                    onFilesSelected={onFileSelected}
                  />
                  {/*<div className={styles.helper}>*/}
                  {/*  Need some help?*/}
                  {/*  <Image*/}
                  {/*    src="/vectors/icons/new-tab.svg"*/}
                  {/*    width={10}*/}
                  {/*    height={10}*/}
                  {/*    alt="new-tab"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {/*<Tooltip>*/}
                  {/*  <Image*/}
                  {/*    src="/images/tooltip-video.png"*/}
                  {/*    width={245}*/}
                  {/*    height={140}*/}
                  {/*    alt="tips"*/}
                  {/*  />*/}

                  {/*  <ul className="mt-20">*/}
                  {/*    <li>Here are some tips</li>*/}
                  {/*    <li>Here are some tips</li>*/}
                  {/*    <li>Here are some tips</li>*/}
                  {/*    <li>Here are some tips</li>*/}
                  {/*    <li>Here are some tips</li>*/}
                  {/*  </ul>*/}
                  {/*</Tooltip>*/}
                </div>
                <div className={styles.input}>
                  <Input
                    id="title"
                    label="Title"
                    required
                    onChange={onChangePostInfo}
                    value={postInfo.title}
                    placeholder="Give your post an attractive title"
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    id="description"
                    label="Description"
                    required
                    textarea
                    onChange={onChangePostInfo}
                    value={postInfo.description}
                    placeholder="Tell more about..."
                  />
                </div>
              </>
            )}
            {stepIndex === 3 && (
              <>
                <div className={styles.input}>
                  <Input
                    id="location"
                    label="Location"
                    placeholder="Location"
                    onChange={onChangePostInfo}
                    value={postInfo.location}
                    className={styles.locationImage}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    id="event"
                    label="Link"
                    placeholder="URL"
                    onChange={onChangePostInfo}
                    value={postInfo.event}
                    className={styles.urlImage}
                  />
                </div>
                <InputLabel
                  id={'categories'}
                  label={'Select upto 5 categories'}
                />
                <div className={styles.preferenceContainer}>
                  {allCategories.map((el: any, idx: number) => {
                    return (
                      <button
                        key={'option' + idx}
                        className={clsx(
                          styles.option,
                          categories.includes(el.id) && styles.active,
                        )}
                        onClick={(e: any) => {
                          e.preventDefault();
                          onSelectCategory(el.id);
                        }}>
                        {el.name}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.input}>
                  {categories.includes('other') && (
                    <div className={styles.otherThingDiv}>
                      <Input
                        id="other_category"
                        label=""
                        placeholder={'Other things you want to see'}
                        value={postInfo.other_category}
                        onChange={onChangePostInfo}
                      />
                    </div>
                  )}
                </div>

                {isAdminOrCreator && (
                  <PostType
                    onSelect={item => {
                      setPostInfo(prevState => ({
                        ...prevState,
                        post_type: item?.id,
                      }));
                    }}
                  />
                )}
              </>
            )}
            <div className={styles.buttons}>
              <Button
                variant="transparent"
                className={styles.buttonStyle}
                onClick={onPressBack}>
                {stepIndex === 1 ? 'Not Now' : 'Back'}
              </Button>
              <Button
                variant="primary"
                className={styles.buttonStyle}
                disabled={isButtonDisabled}
                onClick={onPressSubmit}>
                {stepIndex === 1
                  ? 'Sound great'
                  : stepIndex === 2
                  ? 'Next'
                  : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
