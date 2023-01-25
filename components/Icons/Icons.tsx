import clsx from 'clsx';
import styles from '../../styles/Icons.module.scss';
interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

export const SidebarExploreIcon = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width={width || 30}
      height={height || 30}
      viewBox="0 0 30 30"
      fill={fill || 'black'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0213 5.28467C9.65715 5.28467 5.30858 9.63318 5.30858 14.9974C5.30858 17.378 6.16349 19.5589 7.58501 21.2478C10.1818 20.7416 13.4636 19.5064 16.7855 17.6435C19.9167 15.8875 22.5248 13.8878 24.2788 12.0473C23.0311 8.12342 19.3584 5.28467 15.0213 5.28467ZM24.3926 6.19529C23.515 6.19593 22.5197 6.32126 21.4522 6.54611C21.8589 6.85692 22.2426 7.20519 22.6 7.57061C23.2518 7.47004 23.8589 7.4097 24.3926 7.40928C25.8213 7.4078 26.68 7.77682 26.9917 8.30082C27.2186 8.68298 27.2347 9.22034 26.9442 9.97979C26.6538 10.7393 26.0595 11.6623 25.1895 12.6452C23.4496 14.6104 20.6511 16.8084 17.2502 18.7156C13.8493 20.6228 10.4849 21.8751 7.85996 22.3578C6.5475 22.5992 5.41715 22.646 4.58761 22.5096C3.75807 22.3731 3.27834 22.076 3.05091 21.6939C2.79473 21.2628 2.80764 20.6234 3.22177 19.7209C3.52114 19.0681 4.01998 18.3163 4.7015 17.5204C4.58082 17.0309 4.49486 16.5251 4.44531 16.0124C3.38461 17.1203 2.57897 18.2001 2.11193 19.2182C1.60613 20.3209 1.47805 21.4288 2.00755 22.3199C2.47757 23.1105 3.35958 23.5339 4.3979 23.7046C5.43616 23.8755 6.67367 23.8111 8.07801 23.553C8.61642 23.4539 9.18511 23.3195 9.76646 23.1641C11.2813 24.1418 13.0846 24.71 15.0212 24.71C20.3853 24.71 24.7339 20.3615 24.7339 14.9973C24.7339 14.9437 24.7349 14.8893 24.7339 14.836C25.2283 14.3712 25.6866 13.9071 26.0904 13.4513C27.0242 12.3961 27.7124 11.3733 28.0822 10.4065C28.4519 9.43961 28.5048 8.46568 28.0348 7.67473C27.3876 6.58606 26.023 6.19354 24.3924 6.19522L24.3926 6.19529Z"
        fill="black"
      />
    </svg>
  );
};

export const ModalIcon1 = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width="57"
      height="46"
      viewBox="0 0 57 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M54.9305 31.8008C54.2635 22.4737 52.0759 3.92866 48.6616 4.36538C44.3938 4.91129 41.5437 23.9506 42.5692 28.4621C43.5947 32.9737 34.2934 4.88662 27.6486 1.75217C21.0038 -1.38228 30.7692 28.1699 33.397 31.3677C36.0249 34.5655 9.96597 19.8476 3.34322 23.1547C-3.27953 26.4617 30.7974 49.9244 43.4441 42.6939"
        stroke="#C8FF2B"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const ModalIcon2 = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M71.4447 25.3749C71.8753 25.8471 71.9309 26.5415 71.5975 27.0971C71.292 27.611 71.0281 28.0554 70.7225 28.4721C67.5559 32.861 65.8197 35.1526 62.6947 39.5693C61.9031 40.6804 59.9864 44.0832 59.2503 45.2499C59.2364 45.2638 59.2364 45.2776 59.2225 45.2915C58.5559 46.2915 56.917 46.2221 56.3892 45.1249C56.3892 45.1249 56.3892 45.111 56.3753 45.111C55.5975 43.4026 54.9725 41.6388 54.2503 39.9026C52.2642 35.111 49.5003 30.9582 44.9031 28.236C43.2364 27.2499 43.2086 26.5276 44.5003 25.0971C44.9864 24.5693 45.4725 24.0276 46.0003 23.5554C51.0975 19.0138 54.6114 13.4026 57.2364 7.15264C57.4031 6.76375 57.7364 6.4582 58.0975 6.15264C58.5697 5.76375 59.2503 5.81931 59.667 6.26375C60.0142 6.62486 60.3336 7.01375 60.5281 7.44431C60.9586 8.44431 61.0697 9.56931 61.3336 10.6388C62.7503 16.4582 65.9031 21.0971 70.6948 24.6665C70.9586 24.861 71.1947 25.111 71.4447 25.3749ZM58.6809 11.4304C57.0281 14.1804 55.6392 17.0138 53.7503 19.486C51.8197 21.9999 49.4031 24.1388 47.1947 26.4582C52.8059 29.8193 56.0559 35.1388 58.0142 41.6665C60.8892 35.7221 64.8614 30.9999 69.2225 26.5832C62.3336 21.3332 60.6947 18.9582 58.6809 11.4304Z"
        fill="#C8FF2B"
      />
      <path
        d="M19.0697 73.3055C17.8058 69.7222 16.7086 66.0694 15.3197 62.5416C13.9586 59.125 11.9308 56.0833 9.01412 53.7361C7.94467 52.875 7.97245 52.0972 8.84745 51.125C13.7641 45.7778 17.5419 39.7222 20.2502 32.9861C20.5419 32.2639 21.3197 31.1111 21.8613 31.1111C23.3336 30.7639 23.8613 33.6389 23.9169 33.9027C25.153 40.6805 29.3475 45.6111 34.0558 50.2222C35.5836 51.7222 35.7086 52.1805 34.2086 53.625C28.5558 59.0416 24.8058 65.7083 21.5836 72.7222C20.5697 75.1666 19.2224 73.7361 19.0697 73.3055ZM10.7086 52.0833C13.7086 53.9861 15.6947 56.5278 17.1391 59.4028C18.5419 62.2222 19.5697 65.2083 20.7363 68.0694C23.4308 62.0416 27.0697 56.4722 32.5975 52.2361C27.2502 48.0278 23.028 43.2222 21.7363 36.3333C19.4169 42.5277 15.7363 47.6805 10.7086 52.0833Z"
        fill="#C8FF2B"
      />
      <path
        d="M57.0281 58.3616C53.9586 62.4866 52.0836 67.1949 50.3614 71.9866C50.2503 72.2921 49.8892 74.0282 48.5697 74.0143C48.1947 74.0143 47.5697 73.4171 47.3336 72.9449C46.292 70.8199 45.6392 68.4449 44.3197 66.5282C42.7642 64.2505 40.6253 62.3755 38.8197 60.2782C38.5558 59.9727 38.4586 59.2782 38.6253 58.9032C38.9447 58.2088 39.5142 57.6532 39.9586 57.0143C42.2225 53.681 44.4447 50.3199 46.7781 47.0421C47.2642 46.3616 48.2225 45.5421 48.792 45.5421C50.2086 45.5282 50.4864 46.6393 50.7364 47.431C51.8753 51.0699 53.8336 54.1116 56.6808 56.6255C57.6947 57.5699 57.1531 58.1949 57.0281 58.3616ZM41.4308 59.3199C44.7364 61.6671 46.9864 65.056 48.3475 68.8477C50.3614 65.1532 52.4169 61.3893 54.5281 57.5005C51.6947 55.5421 49.7225 51.8893 48.8197 49.1949C46.3475 52.5838 43.9031 55.931 41.4308 59.3199Z"
        fill="#C8FF2B"
      />
    </svg>
  );
};

export const CloseIcon = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width={width || 30}
      height={height || 30}
      viewBox="0 0 29 29"
      fill={fill}
      className={clsx(styles.closeIcon, styles.icon)}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18.0133 14.5L27.8473 4.66602C28.314 4.20013 28.5766 3.56791 28.5771 2.90845C28.5777 2.24899 28.3163 1.61632 27.8504 1.1496C27.3845 0.682878 26.7523 0.420351 26.0928 0.419768C25.4334 0.419186 24.8007 0.680596 24.334 1.14649L14.5 10.9805L4.66602 1.14649C4.1993 0.679772 3.56629 0.417572 2.90625 0.417572C2.24621 0.417572 1.6132 0.679772 1.14648 1.14649C0.679766 1.61321 0.417565 2.24622 0.417565 2.90626C0.417565 3.5663 0.679766 4.1993 1.14648 4.66602L10.9805 14.5L1.14648 24.334C0.679766 24.8007 0.417565 25.4337 0.417565 26.0938C0.417565 26.7538 0.679766 27.3868 1.14648 27.8535C1.6132 28.3202 2.24621 28.5824 2.90625 28.5824C3.56629 28.5824 4.1993 28.3202 4.66602 27.8535L14.5 18.0195L24.334 27.8535C24.8007 28.3202 25.4337 28.5824 26.0937 28.5824C26.7538 28.5824 27.3868 28.3202 27.8535 27.8535C28.3202 27.3868 28.5824 26.7538 28.5824 26.0938C28.5824 25.4337 28.3202 24.8007 27.8535 24.334L18.0133 14.5Z" />
    </svg>
  );
};

export const Hop3TokenIcon = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width={width || 10}
      height={height || 9}
      viewBox="0 0 10 9"
      fill={fill}
      className={clsx(styles.hop3TokenIcon, styles.icon)}
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3.3291"
        y="0.167969"
        width="1.85655"
        height="8.66392"
        fill={fill}
      />
      <rect
        x="7.66113"
        y="0.167969"
        width="1.85655"
        height="8.66392"
        fill={fill}
      />
      <rect
        x="8.51758"
        y="2.64355"
        width="1.89381"
        height="8.66392"
        transform="rotate(72.9476 8.51758 2.64355)"
        fill={fill}
      />
    </svg>
  );
};

export const Hop3Icon = (props: IconProps) => {
  const { width, height, fill } = props;
  return (
    <svg
      width="38"
      height="40"
      viewBox="0 0 38 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.32212 26.3631C5.86812 14.4782 10.6733 7.29804 16.3051 3.33172L16.036 3.5965C17.2463 2.45208 19.9395 1.16069 20.8465 0.874271C23.256 0.112647 25.6489 -0.374352 28.1422 0.370246C33.0782 1.83116 36.1011 6.57159 32.9056 11.2519C31.9697 12.5939 30.7608 13.724 29.3579 14.5685C28.366 15.188 26.4112 16.458 25.4675 17.1625L25.6073 17.0733C25.2402 17.3366 24.8061 17.5969 24.3092 17.895C23.0593 18.6446 21.4114 19.6329 19.4299 21.5074C16.0749 24.6974 13.1516 28.3109 10.7341 32.256L10.7828 32.1553C10.6808 32.3383 10.5307 32.4913 10.3475 32.5971C10.1249 32.7257 9.86603 32.7772 9.61112 32.7437C9.35621 32.7101 9.1196 32.5935 8.93814 32.4118C8.75668 32.2301 8.64055 31.9936 8.60783 31.7391L8.63011 31.9212C7.99092 30.1222 7.55228 28.2582 7.32212 26.3631ZM26.0062 8.2047C26.6877 7.68026 26.3521 6.59117 25.4937 6.54126L18.3676 6.12693C18.0242 6.10696 17.6869 6.22386 17.4295 6.45203L16.5078 7.26911C15.8878 7.81866 16.2429 8.84343 17.07 8.89152L18.9325 8.99981C19.1051 9.00984 19.1716 9.22953 19.0336 9.33361L14.6804 12.6155C13.9901 13.1359 14.3226 14.2343 15.1856 14.2845L16.8376 14.3806C17.0011 14.3901 17.0732 14.5913 16.9528 14.7025L11.8634 19.4041C11.0195 20.1837 12.0639 21.4999 13.0148 20.8553L23.4642 13.7724C24.1991 13.2742 23.8832 12.1277 22.9969 12.0762L21.6148 11.9958C21.4431 11.9858 21.376 11.768 21.5123 11.6631L26.0062 8.2047Z"
        fill="url(#paint0_linear_713_1787)"
      />
      <path
        d="M11.7678 3.59709C9.62572 6.47178 7.74756 9.29577 6.8131 12.862C5.88358 16.657 5.54901 20.5724 5.82132 24.4687C5.84605 24.6655 5.79893 24.8646 5.68858 25.0295C5.57823 25.1945 5.41204 25.3143 5.22045 25.3671C4.99632 25.4121 4.7635 25.3666 4.57302 25.2406C4.38255 25.1146 4.24995 24.9184 4.20429 24.6949C3.44426 22.9441 2.87067 21.1184 2.49295 19.2478C1.85256 15.2577 2.27679 10.6249 3.70884 7.65529L3.68371 7.75956C5.07525 4.53757 7.15723 2.56627 10.185 2.08033C10.511 2.02793 10.84 1.99605 11.17 1.98488L11.1211 1.99274C11.302 1.97547 11.4838 2.01451 11.6415 2.10449C11.7993 2.19447 11.9252 2.33099 12.002 2.4953C12.0788 2.65961 12.1028 2.84366 12.0706 3.02217C12.0384 3.20069 11.9516 3.36491 11.8221 3.49231"
        fill="url(#paint1_linear_713_1787)"
      />
      <path
        d="M14.8444 32.3222C14.731 32.2338 14.5871 32.1846 14.4372 32.1831C14.2874 32.1815 14.1409 32.2275 14.0228 32.3134C13.9242 32.3984 13.8572 32.5094 13.8312 32.6305C13.8052 32.7515 13.8216 32.8765 13.8781 32.9876L13.8428 32.9526C13.8833 33.0649 13.9082 33.1816 13.9169 33.2999C14.0047 34.5275 12.3045 35.6655 10.1236 35.8215C7.94273 35.9775 6.11586 35.2869 6.02831 34.063C6.0215 33.8434 6.04578 33.6236 6.10056 33.409C6.1612 33.2354 6.2668 33.0772 6.40831 32.9482C6.4863 32.8246 6.52596 32.6843 6.52296 32.5424C6.49289 32.4611 6.43793 32.3895 6.36453 32.3362C6.22349 32.2614 6.05961 32.2296 5.89633 32.2453C5.73304 32.261 5.57871 32.3235 5.45538 32.4238L5.54176 32.3688C3.70971 33.2125 2.76781 34.5063 2.8567 35.7488C3.00539 37.8272 6.27869 39.2844 10.1586 39.0069C14.0385 38.7293 17.0669 36.8212 16.9182 34.7429C16.8469 33.7466 16.0391 32.8405 14.6859 32.2285"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.8512 16.891C36.5274 16.597 36.1179 16.4423 35.8239 16.7661C35.3734 17.2624 34.1262 18.3447 32.7272 18.8152C32.0969 19.0272 31.0903 18.9029 31.0158 19.5637C30.9965 19.7348 31.1507 20.0386 31.5853 20.0876C34.4725 20.4133 36.2585 18.722 36.9052 18.0096C37.1992 17.6858 37.175 17.1849 36.8512 16.891Z"
        fill="url(#paint2_linear_713_1787)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.2099 12.722C35.453 16.4831 32.0385 17.7568 29.1441 17.4098C28.7099 17.3578 28.3447 17.1629 28.3967 16.7286C28.4488 16.2943 28.8727 16.222 29.3548 16.0687C31.6954 15.7493 33.5234 14.5059 35.0166 11.3092C35.2017 10.9129 36.2354 11.3778 36.6317 11.5629C37.028 11.7481 37.395 12.3257 37.2099 12.722Z"
        fill="url(#paint3_linear_713_1787)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_713_1787"
          x1="18.8254"
          y1="0.744741"
          x2="22.551"
          y2="31.1979"
          gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_713_1787"
          x1="5.96236"
          y1="2.75804"
          x2="9.48134"
          y2="24.6839"
          gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_713_1787"
          x1="40.6958"
          y1="19.7942"
          x2="29.0832"
          y2="15.571"
          gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_713_1787"
          x1="28.6095"
          y1="24.3368"
          x2="34.4615"
          y2="5.01614"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.1875" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ArrowRedirectIcon = () => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        d="M7.58332 19.8436L6.37306 18.6333L16.6199 8.38652L16.9897 8.01665H16.4667H7.36665V6.28332H19.9333V18.85H18.2V9.74998V9.2269L17.8301 9.59678L7.58332 19.8436Z"
        fill="black"
        stroke="white"
        stroke-width="0.433333"
      />
    </svg>
  );
};

export const HandDrawnIcon1 = ({ classnames }: any) => {
  return (
    <svg
      width="196"
      height="59"
      viewBox="0 0 196 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles.handDrawnIcon2, styles.icon, styles[classnames])}>
      <path
        d="M159.037 2.41471C122.586 1.84444 41.6209 7.1937 9.36745 33.1529C-30.9493 65.602 98.8917 57.9535 147.458 49.0334C176.516 43.6963 197.866 36.8054 193.076 22.6938C189.458 12.0332 157.986 5.64274 98.0435 13.4691"
        stroke="#C8FF2B"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const HandDrawnIcon2 = ({ classnames }: any) => {
  return (
    <svg
      width="86"
      height="8"
      viewBox="0 0 86 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles.handDrawnIcon2, styles.icon, styles[classnames])}>
      <path
        d="M2 6C14.7464 3.61936 48.9914 -0.191278 84 3.61124"
        stroke="#C8FF2B"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};

//Shop Icon

export const ShopIcon = ({ classnames }: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.2894 11.7367C12.2894 13.7207 9.57608 15.3288 7.59204 15.3288C6.30867 15.3288 5.12295 14.6442 4.48126 13.5327C3.83958 12.4213 3.83958 11.0521 4.48126 9.94062C5.12295 8.82916 6.30867 8.14453 7.59204 8.14453C9.57608 8.14453 12.2894 9.75259 12.2894 11.7366V11.7367Z"
        fill="black"
      />
      <path
        d="M25 11.7371C25 12.6899 24.6216 13.6035 23.9478 14.277C23.2743 14.9508 22.3607 15.3292 21.4079 15.3292C19.4239 15.3292 16.7106 13.7212 16.7106 11.7371C16.7106 9.75308 19.4239 8.14502 21.4079 8.14502C22.3607 8.14502 23.2743 8.52347 23.9478 9.19723C24.6216 9.87075 25 10.7843 25 11.7371V11.7371Z"
        fill="black"
      />
      <path
        d="M18.3684 11.7366C18.3684 13.8731 16.6365 15.605 14.5 15.605C12.3635 15.605 10.6316 13.8731 10.6316 11.7366C10.6316 9.60008 12.3635 7.86816 14.5 7.86816C16.6365 7.86816 18.3684 9.60008 18.3684 11.7366Z"
        fill="black"
      />
      <path
        d="M6.21053 7.86816H22.7895C23.3757 7.86816 23.9379 8.10106 24.3526 8.51553C24.7671 8.93025 25 9.49252 25 10.0787V11.7366H4V10.0787C4 9.49251 4.23289 8.93023 4.64737 8.51553C5.06209 8.10106 5.62436 7.86816 6.21053 7.86816Z"
        fill="black"
      />
      <path
        d="M21.1315 4H7.86836C7.28218 4 6.7199 4.23289 6.30521 4.64737C5.89073 5.06209 5.65784 5.62436 5.65784 6.21053H23.342C23.342 5.62435 23.1092 5.06206 22.6947 4.64737C22.28 4.23289 21.7177 4 21.1315 4Z"
        fill="black"
      />
      <path
        d="M22.7895 7.86816H6.21053C5.62435 7.86816 5.06206 8.10106 4.64737 8.51553C4.23289 8.93025 4 9.49252 4 10.0787V11.7366C4 12.6894 4.37845 13.603 5.05221 14.2765C5.72573 14.9502 6.63931 15.3287 7.59211 15.3287C8.94949 15.2719 10.2433 14.7376 11.2449 13.82C11.9567 14.928 13.1831 15.5981 14.5 15.5981C15.8169 15.5981 17.0434 14.928 17.7551 13.82C18.7567 14.7375 20.0505 15.2719 21.4079 15.3287C22.3607 15.3287 23.2743 14.9502 23.9478 14.2765C24.6216 13.603 25 12.6894 25 11.7366V10.0787C25 9.49251 24.7671 8.93023 24.3526 8.51553C23.9379 8.10106 23.3756 7.86816 22.7895 7.86816V7.86816Z"
        fill="black"
      />
      <path
        d="M17.987 16.0254C17.0016 16.8269 15.7702 17.2646 14.4999 17.2646C13.2296 17.2646 11.9983 16.8269 11.0129 16.0254C9.97108 16.6274 8.79476 16.958 7.59205 16.9871C6.92965 16.9866 6.27363 16.8608 5.65784 16.6168V22.7897C5.65784 23.3759 5.89073 23.9382 6.30521 24.3529C6.71993 24.7673 7.28219 25.0002 7.86836 25.0002H21.1315C21.7177 25.0002 22.28 24.7673 22.6947 24.3529C23.1092 23.9381 23.342 23.3759 23.342 22.7897V16.6168C22.7263 16.8608 22.0702 16.9866 21.4078 16.9871C20.2051 16.958 19.0288 16.6274 17.987 16.0254ZM12.2894 21.6845C12.2894 22.0794 12.0787 22.4443 11.7368 22.6417C11.3948 22.8391 10.9735 22.8391 10.6315 22.6417C10.2896 22.4443 10.0789 22.0794 10.0789 21.6845V20.0266C10.0789 19.6316 10.2896 19.2667 10.6315 19.0693C10.9735 18.872 11.3948 18.872 11.7368 19.0693C12.0787 19.2667 12.2894 19.6316 12.2894 20.0266V21.6845ZM18.921 21.6845C18.921 22.0794 18.7103 22.4443 18.3684 22.6417C18.0264 22.8391 17.605 22.8391 17.2631 22.6417C16.9212 22.4443 16.7105 22.0794 16.7105 21.6845V20.0266C16.7105 19.6316 16.9212 19.2667 17.2631 19.0693C17.605 18.872 18.0264 18.872 18.3684 19.0693C18.7103 19.2667 18.921 19.6316 18.921 20.0266V21.6845Z"
        fill="black"
      />
    </svg>
  );
};

export const DealIcon = ({ classnames }: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 20.1216C11.3514 20.1216 8.80563 20.0295 7.21621 19.9427C5.65803 19.8575 4.35639 18.7283 4.19804 17.125C4.09206 16.0518 4 14.5477 4 12.5608C4 10.5739 4.09206 9.0698 4.19804 7.99662C4.35639 6.39321 5.65804 5.26405 7.21621 5.17893C8.80563 5.0921 11.3514 5 15 5C18.6486 5 21.1944 5.0921 22.7838 5.17893C24.342 5.26405 25.6436 6.39321 25.802 7.99662C25.9079 9.0698 26 10.5739 26 12.5608C26 14.5477 25.9079 16.0518 25.802 17.125C25.6436 18.7284 24.342 19.8575 22.7838 19.9427C21.1944 20.0295 18.6486 20.1216 15 20.1216ZM15 7.92676C15.405 7.92676 15.7333 8.25436 15.7333 8.65845V9.10585C16.1213 9.17434 16.4522 9.28819 16.7116 9.4014C16.9531 9.50672 17.19 9.62925 17.4004 9.78871C17.7153 10.0287 17.7788 10.5011 17.538 10.8151C17.2929 11.1345 16.8358 11.1965 16.5144 10.9549C16.086 10.644 15.5269 10.5051 15 10.5051C14.6485 10.5051 14.3065 10.6144 14.0681 10.7763C13.8244 10.9417 13.7778 11.0916 13.7778 11.1668C13.7778 11.3427 13.8542 11.4372 14.0061 11.5196C14.3072 11.6831 14.6618 11.7509 15.0017 11.8158C15.0682 11.8285 15.1341 11.8411 15.1989 11.8542C15.6483 11.9455 16.2302 12.0636 16.695 12.316C17.312 12.651 17.6889 13.2479 17.6889 13.9542C17.6889 14.6754 17.2466 15.2223 16.757 15.5547C16.4563 15.7588 16.1042 15.9086 15.7333 15.9948V16.4634C15.7333 16.8675 15.405 17.1951 15 17.1951C14.595 17.1951 14.2667 16.8675 14.2667 16.4634V16.0152C13.6845 15.9124 13.0727 15.6933 12.5988 15.3317C12.2772 15.0861 12.216 14.6268 12.4621 14.3059C12.7071 13.9865 13.1643 13.9245 13.4857 14.1662C13.9099 14.474 14.4848 14.6162 15 14.6162C15.3499 14.6162 15.6935 14.5066 15.932 14.3447C16.1757 14.1793 16.2223 14.0294 16.2223 13.9542C16.2223 13.7783 16.1459 13.6839 15.994 13.6014C15.6929 13.4379 15.3384 13.3702 14.9985 13.3053C14.932 13.2926 14.866 13.28 14.8011 13.2668C14.3517 13.1756 13.7699 13.0574 13.3051 12.805C12.6881 12.47 12.3112 11.8731 12.3112 11.1668C12.3112 10.4456 12.7535 9.89866 13.2431 9.56633C13.5438 9.36228 13.8958 9.21243 14.2667 9.12624V8.65845C14.2667 8.25436 14.595 7.92676 15 7.92676ZM21.3556 11.5852C20.8155 11.5852 20.3778 12.022 20.3778 12.5608C20.3778 13.0996 20.8155 13.5364 21.3556 13.5364H21.8444C22.3845 13.5364 22.8222 13.0996 22.8222 12.5608C22.8222 12.022 22.3845 11.5852 21.8444 11.5852H21.3556ZM7.17778 12.5608C7.17778 12.022 7.61554 11.5852 8.15556 11.5852H8.64444C9.18447 11.5852 9.62222 12.022 9.62222 12.5608C9.62222 13.0996 9.18447 13.5364 8.64444 13.5364H8.15556C7.61554 13.5364 7.17778 13.0996 7.17778 12.5608ZM6.80702 20.884C7.02739 20.5449 7.4815 20.4483 7.82131 20.6682C8.07059 20.8295 8.37355 20.932 8.71088 20.9504C10.0598 21.024 12.1227 21.0969 15.0001 21.0969C17.8774 21.0969 19.9404 21.024 21.2893 20.9504C21.6266 20.932 21.9296 20.8295 22.1788 20.6682C22.5187 20.4483 22.9728 20.5449 23.1931 20.884C23.4135 21.223 23.3167 21.6761 22.9769 21.896C22.509 22.1987 21.9578 22.3795 21.3693 22.4116C19.9919 22.4867 17.9021 22.5603 15.0001 22.5603C12.098 22.5603 10.0082 22.4867 8.63085 22.4116C8.04243 22.3795 7.49119 22.1987 7.0233 21.896C6.68349 21.6761 6.58666 21.223 6.80702 20.884ZM8.95504 23.6436C9.12297 23.2758 9.55788 23.1136 9.92641 23.2811C10.123 23.3704 10.3452 23.4263 10.5864 23.4385C11.6204 23.4909 13.075 23.5366 15.0002 23.5366C16.9254 23.5366 18.38 23.4909 19.414 23.4385C19.6551 23.4263 19.8774 23.3704 20.0739 23.2811C20.4425 23.1136 20.8774 23.2758 21.0453 23.6436C21.2132 24.0113 21.0505 24.4452 20.682 24.6128C20.3149 24.7796 19.9113 24.8786 19.4883 24.9001C18.428 24.9537 16.9486 25 15.0002 25C13.0517 25 11.5723 24.9537 10.5121 24.9001C10.089 24.8786 9.68544 24.7796 9.31838 24.6128C8.9498 24.4452 8.78715 24.0113 8.95504 23.6436Z"
        fill="black"
      />
    </svg>
  );
};

export const EventsIcon = ({ classnames }: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.0368 19.9428C19.473 21.5297 17.7233 22.6159 16.9031 23.0836C16.0442 23.5733 14.9552 23.5733 14.0963 23.0836C13.2761 22.6159 11.5263 21.5297 9.96258 19.9428C9.67496 19.6508 9.38806 19.3363 9.1115 19C9.09926 19.0007 9.08716 19.0013 9.07518 19.0019C8.29893 19.0411 7.57931 19.4273 7.21384 20.0799C6.87471 20.6856 6.40858 21.6365 6.06501 22.8009C5.74598 23.882 6.64389 24.8554 7.82279 24.8986C9.13485 24.9468 11.4915 25 15.5 25C19.5085 25 21.8652 24.9468 23.1772 24.8986C24.3561 24.8554 25.254 23.882 24.935 22.8009C24.5914 21.6365 24.1253 20.6856 23.7862 20.0799C23.4207 19.4273 22.7011 19.0411 21.9248 19.0019C21.9126 19.0013 21.9003 19.0007 21.8879 19C21.6113 19.3363 21.3244 19.6508 21.0368 19.9428Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 12.6722C8 8.43705 11.3558 5 15.5 5C19.6442 5 23 8.43705 23 12.6722C23 15.3744 21.6601 17.6629 20.1697 19.3761C18.676 21.093 16.9893 22.2813 16.1973 22.7927C15.7693 23.0691 15.2307 23.0691 14.8027 22.7927C14.0107 22.2813 12.324 21.093 10.8303 19.3761C9.33992 17.6629 8 15.3744 8 12.6722ZM15.5 15.5035C17.0533 15.5035 18.3125 14.2209 18.3125 12.6389C18.3125 11.0568 17.0533 9.7743 15.5 9.7743C13.9467 9.7743 12.6875 11.0568 12.6875 12.6389C12.6875 14.2209 13.9467 15.5035 15.5 15.5035Z"
        fill="black"
      />
    </svg>
  );
};

export const FeaturedIcon = ({ classnames }: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7425 6.91021C18.1416 5.69659 19.8584 5.6966 20.2575 6.91021L21.4534 10.5466L25.0898 11.7425C26.3034 12.1416 26.3034 13.8584 25.0898 14.2575L21.4534 15.4534L20.2575 19.0898C19.8584 20.3034 18.1416 20.3034 17.7425 19.0898L16.5466 15.4534L12.9102 14.2575C11.6966 13.8584 11.6966 12.1416 12.9102 11.7425L16.5466 10.5466L17.7425 6.91021Z"
        fill="black"
      />
      <path
        d="M12.2492 15.8288C11.8527 14.7237 10.1473 14.7237 9.75079 15.8288L8.79878 18.4822L5.90419 19.3549C4.6986 19.7183 4.6986 21.2817 5.90419 21.6451L8.79878 22.5178L9.75079 25.1712C10.1473 26.2763 11.8527 26.2763 12.2492 25.1712L13.2012 22.5178L16.0958 21.6451C17.3014 21.2817 17.3014 19.7183 16.0958 19.3549L13.2012 18.4822L12.2492 15.8288Z"
        fill="black"
      />
      <path
        d="M10.094 4.79185C9.74676 3.73605 8.25324 3.73605 7.906 4.79185L7.13529 7.13529L4.79185 7.906C3.73605 8.25324 3.73605 9.74676 4.79185 10.094L7.13529 10.8647L7.906 13.2081C8.25324 14.264 9.74676 14.264 10.094 13.2081L10.8647 10.8647L13.2081 10.094C14.264 9.74676 14.264 8.25324 13.2081 7.906L10.8647 7.13529L10.094 4.79185Z"
        fill="black"
      />
    </svg>
  );
};

export const FoodsIcon = ({ classnames }: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.43 4.55199C19.1338 4.32132 18.7951 4.3271 18.5348 4.50574C18.2833 4.67832 18.125 4.99666 18.125 5.35713V23.3021C18.125 24.5088 19.2998 25.2343 20.3503 24.9311C20.9114 24.7692 21.3135 24.4128 21.5505 23.9417C21.7851 23.4753 21.8515 22.9103 21.7726 22.3314L21.0921 17.335C21.8615 17.1497 22.4596 16.911 22.8861 16.7033C23.4738 16.417 23.7758 15.7805 23.7483 15.1308C23.5116 9.54528 21.1574 5.89719 19.43 4.55199Z"
        fill="black"
      />
      <path
        d="M8.2781 4.375C7.52463 4.375 6.86594 4.89635 6.73836 5.6472C6.5255 6.90001 6.22738 9.09077 6.25136 11.4335C6.26469 12.7352 7.14011 13.9052 8.51416 14.2117C8.71438 14.2563 8.92499 14.2977 9.14363 14.3332L8.29539 22.3745C8.16835 23.5789 8.9219 24.7892 10.1762 24.9629C10.3382 24.9854 10.4931 25 10.625 25C10.7569 25 10.9118 24.9854 11.0738 24.9629C12.3281 24.7892 13.0816 23.5788 12.9546 22.3745L12.1064 14.3333C12.3251 14.2977 12.5357 14.2564 12.736 14.2117C14.11 13.9052 14.9853 12.7352 14.9986 11.4337C15.0226 9.09059 14.724 6.89954 14.5109 5.64676C14.3831 4.89611 13.7246 4.375 12.9713 4.375H12.8371C12.7743 4.375 12.7141 4.40059 12.6706 4.44584C12.6272 4.49109 12.6043 4.55205 12.6071 4.61457L12.8116 9.09205C12.8261 9.40816 12.5803 9.67606 12.2627 9.6904C11.9451 9.7048 11.676 9.46019 11.6615 9.14412L11.4537 4.59376C11.4481 4.47137 11.3468 4.375 11.2237 4.375H10.0259C9.90282 4.375 9.80147 4.47137 9.79589 4.59376L9.58807 9.14412C9.57365 9.46019 9.30449 9.7048 8.98688 9.6904C8.66931 9.67606 8.42356 9.40816 8.438 9.09205L8.64248 4.61457C8.64534 4.55205 8.62238 4.49109 8.57894 4.44584C8.5355 4.40059 8.47535 4.375 8.41247 4.375H8.2781Z"
        fill="black"
      />
    </svg>
  );
};
