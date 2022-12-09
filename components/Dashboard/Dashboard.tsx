import React, { FC, useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import Profile from "../../public/images/Profile.png";
import Post from "../../public/images/Post.png";
import Post2 from "../../public/images/Post2.png";
import User from "../../public/images/Avtar.png";
import UpArrow from '../../public/images/UpArrow.svg'
import Like from "../../public/images/Like.svg";
import NotLike from "../../public/images/like_not.svg";
import Logout from "../../public/images/Logout.png";
import ImageSlider from "../ImageSlider";
import Chip from "../Chip/Chip";
import { useRouter } from "next/router";

interface StatusColorInterface {
  [key: string]: string;
}
interface StatusType {
  [key: string]: string
}
interface PostDataProps {
  data: any;
  selectedStatus: StatusType;
  setSelectedStatus: (val: (value: StatusType) => StatusType) => void
}
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
    category: [{ id: 1, text: 'Deal', bgColor: '#FFC700' }],
    tags: [{ id: 1, text: 'Nightlife', bgColor: '#F0F0F0' }, { id: 2, text: 'Dating Plan', bgColor: '#F0F0F0' }],
    status: "Pending",
    isLike: false,
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
    isLike: false,
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
    isLike: true,
  },
];
const menu = ['All', 'Boosted', 'Denied', 'Pending']

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<StatusType>({})
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('auth_token')
    router.push("/login");

  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.right}>
          <div className={styles.profile}>
            <button className={styles.sharebutton}>Share Experience</button>
            <div className={styles.dropdown}>
              <Image
                className={styles.profileimg}
                src={Profile}
                alt={"profile"}
              />
              <div className={styles.dropdowncontent}>
                <div className={styles.menuitem} onClick={logout}>Log out
                  <Image
                    className={styles.logout}
                    src={Logout}
                    alt={"logout"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <div className={styles.filter}>
          filter by:
          {
            menu.map((item, index) => (
              <div key={`btn_${index}`} className={styles.btnwrapper}>
                <button className={clsx({
                  [styles.filterbutton]: true,
                  [styles.active]: activeTab === index,

                })}
                  onClick={() => setActiveTab(index)}
                >{item}</button>
              </div>
            ))
          }
        </div>
        {postData.map((data, idx) => (
          <PostItem key={"post-item" + idx} data={data} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
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
const PostItem: FC<PostDataProps> = ({ data, selectedStatus, setSelectedStatus }) => {
  console.log({ data })
  console.log('color', statusColor?.[data?.status])
  const handleChange = (index: number, value: string) => {
    setSelectedStatus((prevSelectedStatus) => {
      return {
        ...prevSelectedStatus,
        [index]: value
      }
    })

  };
  return (
    <div className={styles.postwrapper} key={data?.id}>
      <div className={styles.poster}>
        <ImageSlider data={data?.postImages} />
      </div>
      <div className={styles.descriptionwrapper}>
        <div className={styles.description}>
          <UserProfile
            userImgUrl={data?.prostUserImg}
            title={data?.prostUserTitle}
            subtitle={data?.prostUserSubTitle}
          />
          {data?.category?.length > 0 && <Chip chipData={data?.category} />}
          <div>
            <span className={styles.boldtext}>{data?.title}</span>
            <p className={styles.text}>{data?.description}</p>
          </div>
          {/* <div className={styles.comment}>
            <Image src={data?.commentImg} alt={"profile"} />

            <p className={styles.imgtitle}>{data?.commentText}</p>
          </div> */}
          <div>
            <div className={styles.badge}></div>
          </div>
          {data?.tags?.length > 0 && <Chip chipData={data?.tags} />}
          <div className={styles.explore}>
            <p className={styles.exploretext}>Expolre now</p>
            <Image className={styles.arowicon} src={UpArrow} alt={''} />
          </div>
          <div className={styles.selectwrapper}>
            <span className={styles.like}>
              <Image src={data?.isLike ? Like : NotLike} alt={""} style={{ fill: 'red' }} />
              <p className={styles.imgtitle}> {data?.like} </p>
            </span>
            <select
              id="demo-multiple-name"
              value={selectedStatus[data?.id]}
              className={styles.customselect}
              style={{ backgroundColor: statusColor?.[selectedStatus[data?.id]], color: selectedStatus[data?.id] === "Denied" ? "#FFF" : "#000" }}
              onChange={(event) => handleChange(data?.id, event.target.value)}
            >
              {status.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};