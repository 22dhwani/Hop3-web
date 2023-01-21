import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import classes from '../../styles/CircularProgress.module.scss';
import { useEffect, useState } from 'react';
interface Props {
  value: number;
}

const CircularProgress = (props: Props) => {
  const { value } = props;
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgressValue(value || 0);
    }, 500);
  }, []);

  return (
    <div className={classes.circleStyle}>
      <CircularProgressbar
        value={progressValue}
        strokeWidth={10}
        styles={buildStyles({
          rotation: 0.25,
          // Colors
          pathColor: '#000000',
          trailColor: '#dddddd',
        })}
      />
    </div>
  );
};

export default CircularProgress;
