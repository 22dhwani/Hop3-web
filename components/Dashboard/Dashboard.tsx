import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import Profile from "../../public/images/Profile.png";
import Post from "../../public/images/Post.png";
import Post2 from "../../public/images/Post2.png";
import User from "../../public/images/Avtar.png";
import Like from "../../public/images/Like.svg";
import LikeNot from "../../public/images/like_not.svg";
import { FIREBASE_AUTH } from "../firebase";

import { MenuItem, Select, Menu } from "@mui/material";
import ImageSlider from "../ImageSlider";
import { userAgent } from "next/server";
import { useRouter } from "next/router";
import { getUser } from "../../services/auth";
import { useMutation, useQuery } from "react-query";
import {
  approvePost,
  createPost,
  createReaction,
  getPostForAdmin,
  getPostForUser,
  IPostDataItem,
  rejectPost,
} from "../../services/post";
import clsx from "clsx";

interface StatusColorInterface {
  [key: string]: string;
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
const status: string[] = ["Pending", "Approved", "Denied"];
const statusColor: StatusColorInterface = {
  Pending: "#DED2FF",
  Approved: "#70FFC3",
  Denied: "#FFCCCB",
};

const postData = [
  {
    id: 1,
    postImages: [Post, Post2, Post],
    prostUserImg: Profile,
    prostUserTitle: "Davis Franci",
    prostUserSubTitle: "hop3 Creator",
    title: "This is a very very long Title",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More",
    commentImg: User,
    commentText: "The Dead Rabbit",
    like: 123,
    status: "Pending",
  },
  {
    id: 2,
    postImages: [Post, Post],
    prostUserImg: Profile,
    prostUserTitle: "Davis Franci",
    prostUserSubTitle: "hop3 Creator",
    title: "This is a very very long Title",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More",
    commentImg: User,
    commentText: "The Dead Rabbit",
    like: 123,
    status: "Approved",
  },
  {
    id: 3,
    postImages: [Post, Post],
    prostUserImg: Profile,
    prostUserTitle: "Davis Franci",
    prostUserSubTitle: "hop3 Creator",
    title: "This is a very very long Title",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non. Lorem ipsum dolor sit amet consectetur. Vitae accumsan nunc viverra tortor malesuada id non accumsan...More",
    commentImg: User,
    commentText: "The Dead Rabbit",
    like: 123,
    status: "Denied",
  },
];
export default function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page_number: 1,
    limit: 20,
  });
  const [postFilter, setPostFilter] = useState("All");
  const {
    data: userData,
    isLoading: isUserLoading,
    error: getUserError,
    refetch: getUserApi,
  } = useQuery("getUser", getUser, { enabled: false });
  const {
    data: userPostData,
    isLoading: isPostLoading,
    error: getUserPostError,
    refetch: getUserPost,
  } = useQuery(
    ["getUserPost", pagination.limit, pagination.page_number],
    getPostForUser,
    { enabled: false }
  );
  const { data: adminPostData, refetch: getAdminPost } = useQuery(
    ["getAdminPost", pagination.limit, pagination.page_number, postFilter],
    getPostForAdmin,
    { enabled: false }
  );

  const allPost = useMemo(() => {
    const allItems =
      userData?.role === "user" ? userPostData?.items : adminPostData?.items;
    if (Array.isArray(allItems)) {
      const allItems = userPostData?.items || adminPostData?.items;
      let finalArray: any = [];
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
        tempItem.isLikeByMe = isLikeByMe;
        tempItem.totalLike = allReactions.length;
        tempItem.status =
          tempItem.status === "Rejected" ? "Denied" : tempItem.status;
        finalArray.push(tempItem);
      });
      return finalArray;
    } else {
      return [];
    }
  }, [userPostData?.items, userData?.id, userData?.role, adminPostData?.items]);

  useEffect(() => {
    if (userData?.role === "user") {
      getUserPost();
    }
    if (userData?.role === "admin") {
      getAdminPost();
    }
  }, [userData?.role]);

  useEffect(() => {
    getUserApi();
  }, []);

  useEffect(() => {
    if (userData?.role === "admin") {
      getAdminPost();
    }
  }, [postFilter]);

  const onClickShareExperience = useCallback(() => {
    router.push("/share-experience");
  }, []);

  useEffect(() => {
    console.log("Dashboard useefef");
  }, []);

  const onRefresh = useCallback(() => {
    getAdminPost();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickStatus = (status: string) => {
    setPostFilter(status);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = () => {};

  const logOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isAuthenticated");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (isUserLoading) {
    return (
      <div className={styles.container}>
        <h1>Loading</h1>
      </div>
    );
  }

  const isAdmin = userData?.role === "admin";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.right}>
          <div className={styles.profile}>
            <button
              className={styles.sharebutton}
              onClick={onClickShareExperience}
            >
              Share Experience
            </button>
            <Image
              className={styles.profileimg}
              src={Profile}
              alt={"profile"}
              onClick={handleClick}
            />
            {open && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </header>
      <div>
        {isAdmin && (
          <div className={styles.filter}>
            filter by:
            <button
              className={clsx(
                styles.filterbutton,
                postFilter === "All" && styles.selectedFilterButton
              )}
              onClick={() => onClickStatus("All")}
            >
              All
            </button>
            <button
              className={clsx(
                styles.filterbutton,
                postFilter === "Approved" && styles.selectedFilterButton
              )}
              onClick={() => onClickStatus("Approved")}
            >
              Approved
            </button>
            <button
              className={clsx(
                styles.filterbutton,
                postFilter === "Rejected" && styles.selectedFilterButton
              )}
              onClick={() => onClickStatus("Rejected")}
            >
              Denied
            </button>
            <button
              className={clsx(
                styles.filterbutton,
                postFilter === "Pending" && styles.selectedFilterButton
              )}
              onClick={() => onClickStatus("Pending")}
            >
              Pending
            </button>
          </div>
        )}
        {allPost.map((data: IPostDataItem) => (
          <PostItem
            key={data.id}
            data={data}
            isAdmin={isAdmin}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}

const UserProfile = (props: any) => {
  const { userImgUrl, title, subtitle } = props;

  return (
    <div className={styles.profiledescription}>
      <Image src={userImgUrl} alt={"profile"} />
      <div>
        <span className={styles.title}>{title}</span>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

const PostItem = (props: {
  data: IPostDataItem;
  isAdmin: boolean;
  onRefresh?: () => void;
}) => {
  const { data, isAdmin, onRefresh } = props;
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const [isLocalLike, setIsLocalLike] = useState(data.isLikeByMe);
  const [totalLikes, setTotalLikes] = useState(data.totalLike);
  const createReactionMutation = useMutation(createReaction);
  const approvePostMutation = useMutation(approvePost);
  const rejectPostMutation = useMutation(rejectPost);

  useEffect(() => {
    if (approvePostMutation.isSuccess || rejectPostMutation.isSuccess) {
      onRefresh && onRefresh();
    }
  }, [approvePostMutation.isSuccess, rejectPostMutation.isSuccess]);

  const handleChange = useCallback(
    (event: any) => {
      const localStatus = event?.target?.value;
      setSelectedStatus(localStatus);
      if (localStatus === "Approved") {
        approvePostMutation.mutate(data?.id);
      } else if (localStatus === "Denied") {
        rejectPostMutation.mutate(data?.id);
      }
    },
    [data?.id]
  );

  const onPressLike = useCallback(() => {
    setIsLocalLike(true);
    setTotalLikes((prevState) => prevState + 1);
    const payload = {
      postId: data.id,
      reactionData: {
        reaction_type: "like",
      },
    };
    createReactionMutation.mutate(payload);
  }, [data]);

  return (
    <div className={styles.postwrapper} key={data?.id}>
      <div className={styles.poster}>
        {/* <Image src={data?.postImg} alt={''} /> */}
        <ImageSlider data={[Post2, Post]} />
      </div>
      <div className={styles.descriptionwrapper}>
        <div className={styles.description}>
          <UserProfile
            userImgUrl={data?.user?.image}
            title={data?.user?.username}
            subtitle={data?.user?.role || "Hop3 creator"}
          />
          <div>
            <span className={styles.boldtext}>{data?.title}</span>
            <p className={styles.text}>{data?.description}</p>
          </div>
          <div className={styles.comment}>
            <p className={styles.imgtitle}>{"Explore now"}</p>
          </div>
          <div className={styles.selectwrapper}>
            <span className={styles.like}>
              <div onClick={onPressLike}>
                <Image src={isLocalLike ? Like : LikeNot} alt={""} />
              </div>
              <p className={styles.imgtitle}> {totalLikes || 0} </p>
            </span>
            {isAdmin && (
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={selectedStatus}
                sx={{
                  bgcolor: statusColor?.[data?.status],
                  border: "none",
                  borderColor: "transparent",
                  width: "200px",
                  padding: "0px 20px",
                  borderRadius: "9px",
                  height: "42px",
                  fontWeight: "500",
                  fontSize: "18px",
                  color: data?.status === "Denied" ? "#FFF" : "#000",
                }}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {status.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={{ display: name === "Pending" ? "none" : "flex" }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
