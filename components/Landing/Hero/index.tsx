import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Section from "../../Section";
import styles from "../../../styles/LandingHero.module.scss";
import Button from "../../Button";
import Link from "next/link";

const pathVariants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    pathLength: 0,
  },
};

const imgVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};

const LandingHero = () => {
  const [currStep, setCurrStep] = useState(1);

  const step1Card1 = useRef<HTMLImageElement>(null);
  const step1Card2 = useRef<HTMLImageElement>(null);
  const step1Card3 = useRef<HTMLImageElement>(null);
  const step1Line1 = useRef<HTMLImageElement>(null);

  const step2Card1 = useRef<HTMLImageElement>(null);
  const step2Card2 = useRef<HTMLImageElement>(null);
  const step2Line1 = useRef<HTMLImageElement>(null);
  const step2Line2 = useRef<HTMLImageElement>(null);

  const step3Card1 = useRef<HTMLImageElement>(null);
  const step3Card2 = useRef<HTMLImageElement>(null);
  const step3Line1 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const revealCards = () => {
      setCurrStep((prevState) => {
        if (prevState === 3) return 1;
        else return ++prevState;
      });
    };

    const interval = setInterval(revealCards, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Section className={styles.landingHero}>
      <AnimatePresence>
        {currStep === 1 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step1Card1"}
              ref={step1Card1}
              transition={{
                delay: 1,
              }}
              src="/vectors/step-1-card-1.svg"
              className={styles.step1Card1}
              width={116}
              height={166}
              alt="card"
            />
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step1Card2"}
              ref={step1Card2}
              src="/vectors/step-1-card-2.svg"
              className={styles.step1Card2}
              width={108}
              height={160}
              alt="card"
            />
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step1Card3"}
              ref={step1Card3}
              src="/vectors/step-1-card-3.svg"
              className={styles.step1Card3}
              width={126}
              height={150}
              alt="card"
            />

            <motion.svg
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step1Line1"}
              width="419"
              height="394"
              viewBox="0 0 419 394"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.step1Line1}
            >
              <g clipPath="url(#clip0_117_19)">
                <rect
                  x="410.273"
                  y="0.015625"
                  width="8.70096"
                  height="8.70096"
                  rx="4.35048"
                  fill="black"
                />
                <rect
                  x="0.124725"
                  y="384.665"
                  width="8.70096"
                  height="8.70096"
                  rx="4.35048"
                  fill="black"
                />
                <motion.path
                  variants={pathVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="path1"
                  d="M7.3419,385.482C71.3932,395.673 151.893,381.545 192.393,328.673C260.876,239.271 192.671,127.887 273.393,52.6732C305.729,22.5442 366.393,3.17325 413.393,3.17323"
                  stroke="#4E4E4E"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </g>
              <defs>
                <clipPath id="clip0_117_19">
                  <rect width="419" height="394" fill="white" />
                </clipPath>
              </defs>
            </motion.svg>
          </>
        )}

        {/* <img
        ref={step1Card1}
        src="/vectors/step-1-card-1.svg"
        className={styles.step1Card1}
        width={116}
        height={166}
        alt="card"
      />
      <img
        ref={step1Card2}
        src="/vectors/step-1-card-2.svg"
        className={styles.step1Card2}
        width={108}
        height={160}
        alt="card"
      />
      <img
        ref={step1Card3}
        src="/vectors/step-1-card-3.svg"
        className={styles.step1Card3}
        width={126}
        height={150}
        alt="card"
      />
      <img
        ref={step1Line1}
        src="/vectors/step-1-line-1.svg"
        className={styles.step1Line1}
        width={420}
        height={394}
        alt="line"
      /> */}

        {currStep === 2 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step2Card1"}
              ref={step2Card1}
              src="/vectors/step-2-card-1.svg"
              className={styles.step2Card1}
              width={95}
              height={167}
              alt="card"
            />
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step2Card2"}
              ref={step2Card2}
              transition={{
                delay: 1,
              }}
              src="/vectors/step-2-card-2.svg"
              className={styles.step2Card2}
              width={108}
              height={160}
              alt="card"
            />
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step2Line1"}
              ref={step2Line1}
              src="/vectors/step-2-line-1.svg"
              className={styles.step2Line1}
              width={350}
              height={217}
              alt="line"
              style={{ display: "none" }}
            />

            <motion.svg
              width="677"
              height="583"
              viewBox="0 0 677 583"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.step2Line2}
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <rect
                x="476.148"
                width="8.70096"
                height="8.70096"
                rx="4.35048"
                fill="black"
              />
              <motion.path
                d="M481.269,5.15771C729.769,112.158 695.769,404.658 617.769,473.158C493.663,582.148 314.769,529.158 215.769,529.158C150.242,529.158 51.1019,553.158 7.76855,577.658"
                stroke="#4E4E4E"
                strokeWidth="2"
                strokeDasharray="4 4"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
              <rect
                y="573.65"
                width="8.70096"
                height="8.70096"
                rx="4.35048"
                fill="black"
              />
            </motion.svg>

            {/* <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step2Line2"}
              ref={step2Line2}
              src="/vectors/step-2-line-2.svg"
              className={styles.step2Line2}
              width={667}
              height={572}
              alt="line"
            /> */}
          </>
        )}

        {currStep === 3 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step3Card1"}
              ref={step3Card1}
              src="/vectors/step-3-card-1.svg"
              className={styles.step3Card1}
              width={108}
              height={161}
              alt="card"
            />
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step3Card2"}
              ref={step3Card2}
              transition={{
                delay: 1,
              }}
              src="/vectors/step-3-card-2.svg"
              className={styles.step3Card2}
              width={126}
              height={150}
              alt="card"
            />
            <motion.svg
              className={styles.step3Line1}
              width="841"
              height="534"
              viewBox="0 0 841 534"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <rect
                x="41.5295"
                width="8.70096"
                height="8.70096"
                rx="4.35048"
                fill="black"
              />
              <motion.path
                d="M838.304,530.334C563.348,413.334 468.048,551.613 299.304,520.897C-36.1521,459.834 -36.152,150.334 47.3045,4.33447"
                stroke="#4E4E4E"
                stroke-width="2"
                strokeDasharray="4 4"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
              <rect
                x="832.079"
                y="524.326"
                width="8.70096"
                height="8.70096"
                rx="4.35048"
                fill="black"
              />
            </motion.svg>

            {/* <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={"step3Line1"}
              ref={step3Line1}
              src="/vectors/step-3-line-1.svg"
              className={styles.step3Line1}
              width={840}
              height={533}
              alt="line"
            /> */}
          </>
        )}
      </AnimatePresence>

      <h1>
        Explore 1,259{" "}
        <Image src="/vectors/logo-2.svg" width={56} height={56} alt="logo" />{" "}
        recs
      </h1>
      <Link href="/login">
        <Button lg variant="dark" className={styles.btn}>
          start now
        </Button>
      </Link>
      <Link href="/login">
        <div className={styles.limitedAccess}>
          LIMITED BETA ACCESS SPOTS ==&gt;&gt; SIGN UP NOW
        </div>
      </Link>
    </Section>
  );
};

export default LandingHero;
