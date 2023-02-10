import React, { FC } from 'react';
import styles from '../../styles/chip.module.scss';
interface ChipDataType {
  id: number;
  text: string;
  color: string;
  bgColor: string;
}
interface ChipDataProps {
  chipData: ChipDataType[];
}
const Chip: FC<ChipDataProps> = ({ chipData }) => {
  return (
    <div className={styles.chipWrapper}>
      {chipData?.map(data => (
        <div key={data?.id} className={styles.chip}>
          {data?.text}
        </div>
      ))}
    </div>
  );
};
export default Chip;
