import clsx from "clsx";
import Image from "next/image";

import styles from "../../styles/ShareExperience.module.scss";
import tooltipStyles from "../../styles/Tooltip.module.scss";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Navbar from "../Navbar";
import Radios from "../Radios";
import Tooltip from "../Tooltip";
import UploaderInput from "../UploaderInput";
import {ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState} from "react";
import {createPost} from "../../services/post";
import {useMutation, useQuery} from "react-query";
import {useRouter} from "next/router";
import {getUser} from "../../services/auth";

const rewardItems = [
  {
    amount: 2,
    desc: "a themed post",
    extra: false,
  },
  {
    amount: 20,
    desc: "an in-depth post",
    extra: false,
  },
  {
    amount: 100,
    desc: "when hop3 boost your post",
    extra: true,
  },
];

const categories = [
  {
    label: "Activities & Games",
  },
  {
    label: "Culture, Arts & Fashion",
  },
  {
    label: "Food & Drinks",
  },
  {
    label: "Cinema",
  },
  {
    label: "Concerts & Music Festivals",
  },
  {
    label: "Nightlife & Bars",
  },
  {
    label: "Attractions, Tours & Trips",
  },
  {
    label: "Apparel",
  },
  {
    label: "Accessories",
  },
  {
    label: "Other",
  },
];

const priceRange = [
  {
    label: "$1-20",
  },
  {
    label: "$20-50",
  },
  {
    label: "$50-100",
  },
  {
    label: "$100 and more",
  },
];

const dealOptions = [
  {
    label: "Yes",
  },
  {
    label: "No",
  },
];

const ShareExperience = () => {
  const { data:userData, isLoading:isUserLoading, error:getUserError,refetch: getUserApi } = useQuery("getUser", getUser,{enabled:false});
  const createPostMutation = useMutation(createPost)
  const router = useRouter()
  const [postInfo,setPostInfo] = useState({
    title:'',
    description:'',
    category:'',
    location:'',
    event:'',
    price:'',
    hashtags:''
  })
  const [error,setError] = useState({
    title:'',
    description:'',
    category:'',
    location:'',
    event:'',
    price:'',
    hashtags:''
  })

  useEffect(()=>{
    getUserApi()
  },[])

  const checkValidation = useCallback(()=>{
    const tempError = {...error}
    tempError.title =  postInfo.title === '' ? 'Title is required' : ''
    tempError.description =  postInfo.description === '' ? 'Description is required' : ''
    setError(tempError)
    return tempError
  },[error,postInfo])

  console.log("Mutation loading",createPostMutation.isLoading)
  console.log("Mutation error",createPostMutation.error)

  const onPressSubmit = useCallback((e:any)=>{
    e.preventDefault()
    const tempError = checkValidation();
    console.log("temp erro",tempError)
    if(!tempError.title && !tempError.description){
          const payload : any = {
            post_type:'Standard',
            title: postInfo.title,
            description: postInfo.description,
            media_type: "image",
          }
          if(postInfo.category){
            payload.category =  postInfo.category
          }
          if(postInfo.price){
            payload.price =  postInfo.price
          }
          if(postInfo.hashtags){
            payload.hashtag =  postInfo.hashtags
          }
          if(postInfo.event){
            payload.event =  postInfo.event
          }
          if(postInfo.location){
            payload.location =  postInfo.location
          }
      console.log("Payloadd",payload)
          createPostMutation.mutate(payload)
    }

  },[checkValidation,postInfo])


  const onChangeTitle = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
      setPostInfo((prevState => ({...prevState,title: event.target.value})))
  },[])

  const onChangeDescription = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPostInfo((prevState => ({...prevState,description: event.target.value})))
  },[])

  const onChangeEvent = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPostInfo((prevState => ({...prevState,event: event.target.value})))
  },[])

  const onChangeLocation = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPostInfo((prevState => ({...prevState,location: event.target.value})))
  },[])

  const onChangeHashtags = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPostInfo((prevState => ({...prevState,hashtags: event.target.value})))
  },[])

  const onSelectCategory = useCallback((category:string)=>{
    setPostInfo((prevState => ({...prevState,category})))
  },[])

  const onSelectPrice = useCallback((price:string)=>{
    setPostInfo((prevState => ({...prevState,price})))
  },[])

  useEffect(()=>{
    if(createPostMutation.isSuccess){
      router.back()
    }
  },[createPostMutation.isSuccess])

  const isAdminOrCreator = userData?.role === 'admin' || userData?.role === 'creator'


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
              You will get rewards when you post{" "}
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
                  <div className={styles.item} key={"award" + idx}>
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
              />
              <div className={styles.helper}>
                Need some help?{" "}
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
                placeholder="Give your post an attractive title"
                onChange={onChangeTitle}
                value={postInfo.title}
                error={error.title}
              />
            </div>

            <div className={styles.input}>
              <Input
                id="description"
                label="Description"
                required
                textarea
                placeholder="Tell more about..."
                onChange={onChangeDescription}
                value={postInfo.description}
                error={error.description}
              />
            </div>

            <div className={styles.input}>
              <Dropdown
                id="category"
                label="Category"
                options={categories}
                placeholder="Select a category for your post"
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
              <Button variant="purple" onClick={onPressSubmit} >Submit</Button>
              <Button variant="grey">Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
