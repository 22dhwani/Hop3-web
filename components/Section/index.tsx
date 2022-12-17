import React from 'react';
import clsx from 'clsx';

import styles from '../../styles/Section.module.scss';

interface Props {
  mainClassName?: string;
  className?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const Section = ({ mainClassName, className, children, ...rest }: Props) => {
  return (
    <div className={clsx(styles.pageSection, className)} {...rest}>
      <div className={clsx(styles.pageContainer, mainClassName)}>
        {children}
      </div>
    </div>
  );
};

export default Section;
