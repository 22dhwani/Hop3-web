import React, { useState } from 'react';

import styles from '../../styles/Text.module.scss';
import { motion } from 'framer-motion';
interface Props {
  children: React.ReactNode;
}

const Text = ({ children }: Props) => {
  return <span className={styles.tooltiptext}>{children}</span>;
};

export const AnimatedText = ({ children }: Props) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.75,
      },
      opacity: 1,
      y: 0,
    },
    hidden: { opacity: 0, y: '20%' },
  };

  return (
    <motion.div initial="hidden" variants={container} whileInView={'visible'}>
      <div className="container">{children}</div>
    </motion.div>
  );
};
