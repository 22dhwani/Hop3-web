import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";

import distanceBetweenElements from "../../../utils/distanceBetweenElements";
import Button from "../../Button";
import Section from "../../Section";
import styles from "../../../styles/LandingCommunity.module.scss";

const LandingCommunity = () => {
  const firstElRef = useRef<HTMLHeadingElement>(null);
  const secondElRef = useRef<HTMLHeadingElement>(null);
  const circle1Ref = useRef<HTMLHeadingElement>(null);
  const circle2Ref = useRef<HTMLHeadingElement>(null);
  const circle3Ref = useRef<HTMLHeadingElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const blurryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ev = () => {
      if (!firstElRef.current || !secondElRef.current) return;
      const height = distanceBetweenElements(
        firstElRef.current as HTMLElement,
        secondElRef.current as HTMLElement
      );

      if (progressLineRef.current)
        progressLineRef.current.style.height = height + 0 + "px";
    };

    window.addEventListener("scroll", ev);

    return () => {
      window.removeEventListener("scroll", ev);
    };
  }, [firstElRef, secondElRef]);

  useEffect(() => {
    const markCircle = (el: HTMLDivElement | null, vh: number) => {
      if (!el) return;
      const top = el.getBoundingClientRect().top - vh / 2;
      if (top < 0) el.style.backgroundColor = "#000";
      else el.style.backgroundColor = "#e7e7e7";
    };

    const ev = () => {
      if (!progressBarRef.current || !blurryRef.current) return;
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      const top = progressBarRef.current.getBoundingClientRect().top;

      const center = top - vh / 2;

      progressBarRef.current.style.height = -center + "px";
      blurryRef.current.style.top = -center + vh / 2 + "px";

      markCircle(circle1Ref.current, vh);
      markCircle(circle2Ref.current, vh);
      markCircle(circle3Ref.current, vh);
    };

    document.addEventListener("scroll", ev);

    return () => {
      document.removeEventListener("scroll", ev);
    };
  }, []);

  return (
    <Section className={styles.landingCommunity}>
      <h2>
        Earn Community Rewards
        <div className={styles.coinWrap}>
          <Image
            className={styles.coin}
            src="/vectors/coin.svg"
            alt="coin"
            width={84}
            height={114}
          />
        </div>
        in Countless Ways
      </h2>

      <div className={styles.steps} ref={articleRef}>
        <div className={styles.blurry} ref={blurryRef}></div>
        <div className={styles.progressLine} ref={progressLineRef}>
          <div className={styles.progressBar} ref={progressBarRef}></div>
        </div>
        <div className={styles.step}>
          <div className={styles.left}>
            <h3 ref={firstElRef}>
              Sharing
              <div className={styles.circle} ref={circle1Ref} />
            </h3>

            <p>
              Share exciting moments, limited-time deals & local good finds with
              the community.
            </p>
            <p>Invite friends to explore the hop3 experience together.</p>

            <Button lg variant="dark-outlined">
              start posting
            </Button>
          </div>

          <div className={styles.right}>
            <Image
              src="/vectors/reward-1.svg"
              alt="reward"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.left}>
            <h3>
              Exploring
              <div className={styles.circle} ref={circle2Ref} />
            </h3>

            <p>
              Explore curated events, spots & eats, handpicked for you only.
            </p>
            <p>
              Discover new experiences, brands & pop-up offerings exclusive for
              members.
            </p>

            <Button lg variant="dark-outlined">
              ooo show me!
            </Button>
          </div>

          <div className={styles.right}>
            <Image
              src="/vectors/reward-2-.svg"
              alt="reward"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.left}>
            <h3 ref={secondElRef}>
              Participating
              <div
                className={clsx(styles.circle, styles.lastCircle)}
                ref={circle3Ref}
              />
            </h3>

            <p>
              Participate in a creative, open economy governed by the hop3
              token.
            </p>
            <p>
              Enter unlimited giveaways, raffles, competitive auctions & brand
              activities as you pleased.
            </p>

            <Button lg variant="dark-outlined">
              I&apos;m in
            </Button>
          </div>

          <div className={styles.right}>
            <Image
              src="/vectors/reward-3.svg"
              alt="reward"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(styles.headline, "marquee3k")}
        data-speed="0.25"
        data-reverse="false"
        data-pausable="false"
      >
        <Marquee>
          the next-gen experience &#x7E; hop3 &#x7E; the next-gen
          experience&#x7E;hop3 &#x7E; the next-gen experience &#x7E; hop3 &#x7E;
          the next-gen experience&#x7E;hop3
        </Marquee>
      </div>
    </Section>
  );
};

export default LandingCommunity;
