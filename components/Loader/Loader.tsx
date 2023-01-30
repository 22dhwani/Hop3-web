import React from 'react';
import { Oval } from 'react-loader-spinner';

interface ILoader {
  height?: number;
  width?: number;
}

const Loader = (props: ILoader) => {
  const { width, height } = props;
  return (
    <Oval
      height={height || 30}
      width={width || 30}
      color="#4fa94d"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};
export default Loader;
