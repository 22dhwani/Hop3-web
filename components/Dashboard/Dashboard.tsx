import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import Profile from "../../public/images/Profile.png";
import Post from "../../public/images/Post.png";
import Post2 from "../../public/images/Post2.png";
import User from "../../public/images/Avtar.png";
import Like from "../../public/images/Like.svg";
import { auth } from "../firebase";

import { MenuItem, Select, Menu } from "@mui/material";
import ImageSlider from "../ImageSlider";
import { userAgent } from "next/server";
import { useRouter } from "next/router";
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
  Denied: "#000000",
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = () => {};
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("isAuthenticated");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.right}>
          <div className={styles.profile}>
            <button className={styles.sharebutton}>Share Experience</button>
            <Image
              className={styles.profileimg}
              src={Profile}
              alt={"profile"}
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
        <div className={styles.filter}>
          filter by:
          <button className={styles.filterbutton}>All</button>
          <button className={styles.filterbutton}>Approved</button>
          <button className={styles.filterbutton}>Denied</button>
          <button className={styles.filterbutton}>Pending</button>
        </div>
        {postData.map((data, ind) => (
          <PostItem data={data} key={"postData" + ind} />
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

const PostItem = (props: any) => {
  const { data } = props;
  const handleChange = () => {};
  return (
    <div className={styles.postwrapper} key={data?.id}>
      <div className={styles.poster}>
        {/* <Image src={data?.postImg} alt={''} /> */}
        <ImageSlider data={data?.postImages} />
      </div>
      <div className={styles.descriptionwrapper}>
        <div className={styles.description}>
          <UserProfile
            userImgUrl={data?.prostUserImg}
            title={data?.prostUserTitle}
            subtitle={data?.prostUserSubTitle}
          />
          <div>
            <span className={styles.boldtext}>{data?.title}</span>
            <p className={styles.text}>{data?.description}</p>
          </div>
          <div className={styles.comment}>
            <Image src={data?.commentImg} alt={"profile"} />

            <p className={styles.imgtitle}>{data?.commentText}</p>
          </div>
          <div className={styles.selectwrapper}>
            <span className={styles.like}>
              <Image src={Like} alt={""} />
              <p className={styles.imgtitle}> {data?.like} </p>
            </span>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={data?.status}
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
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};