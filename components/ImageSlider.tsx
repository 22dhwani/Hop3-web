import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import TimelineDot from '@mui/lab/TimelineDot';
import Image from 'next/image'
import styles from '../styles/ImageSlider.module.scss'

export default function ImageSlider({ data }:any) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = data?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={styles.imageslidercontainer}>
      <Box>
        <div>
              <Image className={styles.image} src={data[activeStep]} alt={""} width={500} height={400} />
        </div>
      </Box>
      <Box className={styles.dotswrapper}>
        {data?.map((image: any, index: number) => (
          <div key={`step-${index}`} className={styles.dot}>
            <TimelineDot
              color={activeStep === index ? "primary" : "grey"}
              onClick={() => {
                setActiveStep(index);
              }}
              sx={{
                height: "5px",
                width: "5px",
              }}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
}
