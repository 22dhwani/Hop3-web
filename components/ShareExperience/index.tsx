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
                onFilesSelected={onFileSelected}
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
              />
            </div>

            <div className={styles.input}>
              <Input
                id="description"
                label="Description"
                required
                textarea
                placeholder="Tell more about..."
              />
            </div>

            <div className={styles.input}>
              <Dropdown
                id="category"
                label="Category"
                options={categories}
                placeholder="Select a category for your post"
                required
              />
            </div>

            <div className={styles.input}>
              <Input
                id="location"
                label="Location"
                placeholder="Where is it located?"
              />
            </div>
            <div className={styles.input}>
              <Dropdown
                id="price-range"
                label="Price Range"
                options={priceRange}
                placeholder="How much does it cost?"
                listType
              />
            </div>

            <div className={styles.input}>
              <Input
                id="url"
                label="URL to the event or resturant"
                placeholder="Give more information to explore"
              />
            </div>

            <div className={styles.input}>
              <Input
                id="hash-tags"
                label="Hashtags"
                placeholder="Give the content great hashtags to help people find it"
                required
              />
            </div>

            <div className={styles.input}>
              <Radios
                id="hash-tags"
                label="Hashtags"
                data={dealOptions}
                required
              />
            </div>

            <div className={styles.buttons}>
              <Button variant="purple">Submit</Button>
              <Button variant="grey">Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
