import clsx from 'clsx';
import Image from 'next/image';

import styles from '../../styles/ShareExperience.module.scss';
import tooltipStyles from '../../styles/Tooltip.module.scss';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Navbar from '../Navbar';
import Radios from '../Radios';
import Tooltip from '../Tooltip';
import UploaderInput from '../UploaderInput';
import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  addPostMediaDetails,
  createPost,
  getSignedUrl,
  IPostMedia,
  IPostMediaItem,
  uploadOnS3Bucket,
} from '../../services/post';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useUserStore } from '../../store/userStore';
interface UserDataType {
  username: string;
  email: string;
  role?: string;
}
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

export const categories = [
  {
    label: 'Activities & Games',
  },
  {
    label: 'Culture, Arts & Fashion',
  },
  {
    label: 'Food & Drinks',
  },
  {
    label: 'Cinema',
  },
  {
    label: 'Concerts & Music Festivals',
  },
  {
    label: 'Nightlife & Bars',
  },
  {
    label: 'Attractions, Tours & Trips',
  },
  {
    label: 'Apparel',
  },
  {
    label: 'Accessories',
  },
  {
    label: 'Other',
  },
];

const priceRange = [
  {
    label: '$1-20',
  },
  {
    label: '$20-50',
  },
  {
    label: '$50-100',
  },
  {
    label: '$100 and more',
  },
];

const dealOptions = [
  {
    label: 'Yes',
  },
  {
    label: 'No',
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
    category: '',
    location: '',
    event: '',
    price: '',
    hashtags: '',
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

  useEffect(() => {
    fetchUserData().then();
  }, [fetchUserData]);

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
      const tempError = checkValidation();
      console.log('temp erro', tempError);
      if (!tempError.title && !tempError.description) {
        const payload: any = {
          post_type: 'Standard',
          title: postInfo.title,
          description: postInfo.description,
          media_type: 'image',
        };
        if (postInfo.category) {
          payload.category = postInfo.category;
        }
        if (postInfo.price) {
          payload.price = postInfo.price;
        }
        if (postInfo.hashtags) {
          payload.hashtag = postInfo.hashtags;
        }
        if (postInfo.event) {
          payload.event = postInfo.event;
        }
        if (postInfo.location) {
          payload.location = postInfo.location;
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
                        router.back();
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
    ],
  );

  const onChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPostInfo(prevState => ({ ...prevState, title: event.target.value }));
  }, []);

  const onChangeDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPostInfo(prevState => ({
        ...prevState,
        description: event.target.value,
      }));
    },
    [],
  );

  const onChangeEvent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPostInfo(prevState => ({ ...prevState, event: event.target.value }));
  }, []);

  const onChangeLocation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPostInfo(prevState => ({
        ...prevState,
        location: event.target.value,
      }));
    },
    [],
  );

  const onChangeHashtags = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPostInfo(prevState => ({
        ...prevState,
        hashtags: event.target.value,
      }));
    },
    [],
  );

  const onSelectCategory = useCallback((category: string) => {
    setPostInfo(prevState => ({ ...prevState, category }));
  }, []);

  const onSelectPrice = useCallback((price: string) => {
    setPostInfo(prevState => ({ ...prevState, price }));
  }, []);

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

  return (
    <div className={styles.shareExperienceContainer}>
      <Navbar withoutShareExpBtn />
      <div className={styles.shareExperienceWrap}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <Image
              src="/vectors/icons/close.svg"
              alt="close"
              width={28}
              height={28}
              onClick={() => {
                router.back();
              }}
            />
          </div>
          <div className={`${styles.box} ${styles.topLeft}`} />
          <div className={`${styles.box} ${styles.topRight}`} />
          <div className={`${styles.box} ${styles.bottomLeft}`} />
          <div className={`${styles.box} ${styles.bottomRight}`} />

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

          <form>
            <div className={clsx(styles.input, tooltipStyles.tooltip)}>
              <UploaderInput
                id="upload"
                label="Upload video or image"
                required
                onFilesSelected={onFileSelected}
              />
              <div className={styles.helper}>
                Need some help?
                <Image
                  src="/vectors/icons/new-tab.svg"
                  width={10}
                  height={10}
                  alt="new-tab"
                />
              </div>
              <Tooltip>
                <Image
                  src="/images/tooltip-video.png"
                  width={245}
                  height={140}
                  alt="tips"
                />

                <ul className="mt-20">
                  <li>Here are some tips</li>
                  <li>Here are some tips</li>
                  <li>Here are some tips</li>
                  <li>Here are some tips</li>
                  <li>Here are some tips</li>
                </ul>
              </Tooltip>
            </div>

            <div className={styles.input}>
              <Input
                id="title"
                label="Title"
                required
                onChange={onChangeTitle}
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
                onChange={onChangeDescription}
                value={postInfo.description}
                placeholder="Tell more about..."
              />
            </div>

            <div className={styles.input}>
              <Dropdown
                id="category"
                label="Category"
                options={categories}
                placeholder="Select a category for your post"
                multiple
                onSelect={onSelectCategory}
              />
            </div>

            <div className={styles.input}>
              <Input
                id="location"
                label="Location"
                placeholder="Where is it located?"
                onChange={onChangeLocation}
                value={postInfo.location}
              />
            </div>
            <div className={styles.input}>
              <Dropdown
                id="price-range"
                label="Price Range"
                options={priceRange}
                placeholder="How much does it cost?"
                listType
                onSelect={onSelectPrice}
              />
            </div>

            <div className={styles.input}>
              <Input
                id="url"
                label="URL to the event or resturant"
                placeholder="Give more information to explore"
                onChange={onChangeEvent}
                value={postInfo.event}
              />
            </div>
            {isAdminOrCreator && (
              <>
                <div className={styles.input}>
                  <Input
                    id="hash-tags"
                    label="Hashtags"
                    placeholder="Give the content great hashtags to help people find it"
                    required
                    onChange={onChangeHashtags}
                    value={postInfo.hashtags}
                  />
                </div>

                <div className={styles.input}>
                  <Radios
                    id="deals"
                    label="Is it a deal"
                    data={dealOptions}
                    required
                  />
                </div>
              </>
            )}
            <div className={styles.buttons}>
              <Button variant="purple" onClick={onPressSubmit}>
                Submit
              </Button>
              <Button variant="grey">Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
