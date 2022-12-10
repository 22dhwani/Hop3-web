import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import FlipNumbers from 'react-flip-numbers';

import Section from '../../Section';
import styles from '../../../styles/LandingHero.module.scss';
import Button from '../../Button';

const pathVariants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  exit: {
    pathLength: 0,
  },
};

const imgVariants = {
  initial: {
    opacity: 0,
    scale: 0.4,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const LandingHero = () => {
  const [currStep, setCurrStep] = useState(3);
  const [numTime, setNumTime] = useState(2);
  const [num, setNum] = useState<string>('1259');
  const [delay, setDelay] = useState<number>(0);
  const [numWidth, setNumWidth] = useState(60);
  const [numHeight, setNumHeight] = useState(70);

  const step1Card1 = useRef<HTMLImageElement>(null);
  const step1Card2 = useRef<HTMLImageElement>(null);
  const step1Card3 = useRef<HTMLImageElement>(null);

  const step2Card1 = useRef<HTMLImageElement>(null);
  const step2Card2 = useRef<HTMLImageElement>(null);
  const step2Line1 = useRef<HTMLImageElement>(null);

  const step3Card1 = useRef<HTMLImageElement>(null);
  const step3Card2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const revealCards = () => {
      setCurrStep(prevState => {
        if (prevState === 3) {
          return 1;
        }
        return ++prevState;
      });
    };
    const interval = setInterval(revealCards, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let inter: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setNumTime(1);

      inter = setInterval(() => {
        setNum(num => (parseInt(num) + 1).toString());
      }, 2500);
    }, 3500);

    return () => {
      clearInterval(inter);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const bpF0 = function (x?: any) {
      if (x.matches) {
        setNumWidth(60);
        setNumHeight(70);
      }
    };
    const bp0 = window.matchMedia('(min-width: 1401px)');
    bpF0(bp0);
    bp0.addListener(bpF0);

    const bpF1 = function (x?: any) {
      if (x.matches) {
        setNumWidth(46);
        setNumHeight(60);
      }
    };
    const bp1 = window.matchMedia('(max-width: 1400px)');
    bpF1(bp1);
    bp1.addListener(bpF1);

    const bpF3 = function (x?: any) {
      if (x.matches) {
        setNumWidth(36);
        setNumHeight(46);
      }
    };
    const bp3 = window.matchMedia('(max-width: 1280px)');
    bpF3(bp3);
    bp3.addListener(bpF3);

    const bpF4 = function (x?: any) {
      if (x.matches) {
        setNumWidth(34);
        setNumHeight(42);
      }
    };
    const bp4 = window.matchMedia('(max-width: 991px)');
    bpF4(bp4);

    const bpF5 = function (x?: any) {
      if (x.matches) {
        setNumWidth(22);
        setNumHeight(28);
      }
    };
    const bp5 = window.matchMedia('(max-width: 575px)');
    bpF5(bp5);
    bp5.addListener(bpF5);
  }, []);

  return (
    <Section className={styles.landingHero}>
      <AnimatePresence exitBeforeEnter>
        {currStep === 1 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={'step1Card1'}
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
              key={'step1Card2'}
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
              key={'step1Card3'}
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
              key={'step1Line1'}
              width="419"
              height="394"
              viewBox="0 0 419 394"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.step1Line1}>
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
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {currStep === 2 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={'step2Card1'}
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
              key={'step2Card2'}
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
              key={'step2Line1'}
              ref={step2Line1}
              src="/vectors/step-2-line-1.svg"
              className={styles.step2Line1}
              width={350}
              height={217}
              alt="line"
              style={{ display: 'none' }}
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
              exit="exit">
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
          </>
        )}
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {currStep === 3 && (
          <>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={'step3Card1'}
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
              key={'step3Card2'}
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
              exit="exit">
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
                strokeWidth="2"
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
          </>
        )}
      </AnimatePresence>

      <h1>
        Explore
        <div>
          <FlipNumbers
            height={numHeight}
            width={numWidth}
            color="black"
            background="transparent"
            play
            perspective={500}
            duration={numTime}
            numbers={num}
          />
        </div>
        <Image src="/vectors/logo-2.svg" width={56} height={56} alt="logo" />{' '}
        recs
      </h1>

      <Button lg variant="dark" className={styles.btn}>
        start now
      </Button>

      <div className={styles.limitedAccess}>
        LIMITED BETA ACCESS SPOTS ==&gt;&gt; SIGN UP NOW
      </div>
    </Section>
  );
};

export default LandingHero;
