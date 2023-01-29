import React from 'react';
import styles from '../../styles/Filter.module.scss';
import clsx from 'clsx';

interface FilterProps {
  menu: string[];
  setActiveTab: (tab: number) => void;
  activeTab: number;
}
export default function Filter({ menu, setActiveTab, activeTab }: FilterProps) {
  return (
    <div className={styles.filterwrapper}>
      <div className={styles.filter}>
        Filter by:
        {menu.map((item, index) => (
          <div key={`btn_${index}`} className={styles.btnwrapper}>
            <button
              className={clsx({
                [styles.filterbutton]: true,
                [styles.active]: activeTab === index,
              })}
              onClick={() => setActiveTab(index)}>
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
