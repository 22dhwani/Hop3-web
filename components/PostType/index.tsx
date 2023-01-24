import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '../../styles/PostType.module.scss';
import InputLabel from '../InputLabel';
import { ADMIN_POST_TYPE } from '../../constant/constant';

interface Props {
  onSelect: (item: any) => void;
}

const PostType = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <div className={styles.radios}>
      <InputLabel id={'promotion_type'} label={'Promotion Type'} />
      <div className={styles.postTypeContainer}>
        {ADMIN_POST_TYPE.map((item, idx) => {
          return (
            <button
              key={'option' + idx}
              className={clsx(
                styles.option,
                selectedItem === item.id && styles.active,
              )}
              onClick={(e: any) => {
                e.preventDefault();
                setSelectedItem(item.id);
                props.onSelect && props.onSelect(item);
              }}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PostType;
