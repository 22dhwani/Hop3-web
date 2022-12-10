import React from 'react';

import styles from '../../styles/Tooltip.module.scss';

interface Props {
  children: React.ReactNode;
}

const Tooltip = ({ children }: Props) => {
  return <span className={styles.tooltiptext}>{children}</span>;
};

export default Tooltip;
