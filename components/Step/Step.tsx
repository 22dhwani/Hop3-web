import styles from '../../styles/Step.module.scss';
import { useMemo } from 'react';
import { createArray } from '../../helper/common';
import clsx from 'clsx';

interface Props {
  numberOfSteps: number;
  activeStep: number;
}
export const Step = (props: Props) => {
  const { numberOfSteps, activeStep } = props;

  const array = useMemo(() => {
    return createArray(numberOfSteps);
  }, [numberOfSteps]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.outer}>
          <div className={styles.container}>
            {array.map((item: number) => {
              return (
                <>
                  <div
                    key={item + ''}
                    className={clsx(
                      styles.circleView,
                      item <= activeStep && styles.activeCircleView,
                    )}>
                    <div className={styles.label}>{item}</div>
                  </div>
                  {item !== array.length && <div className={styles.filler} />}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
