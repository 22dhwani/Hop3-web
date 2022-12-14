import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import styles from '../../styles/Login.module.scss';
import LoginCover from '../../public/images/LoginCover.png';
import Logo from '../../public/images/Logo.svg';
import Google from '../../public/images/Google.svg';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { refreshToken } from '../../utils/utils';
import { getUser } from '../../services/auth';
import axios from 'axios';

const provider = new GoogleAuthProvider();

export default function Login() {
  const router = useRouter();
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  });

  const redirectToUserDetailsPage = () => {
    router.push(
      `/userDetails?user=${JSON.stringify(fieldValues)}`,
      '/userDetails',
    );
  };

  const login = async () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        await refreshToken();
        setFieldValues(prevFieldValues => {
          return {
            ...prevFieldValues,
            email: user.email || '',
          };
        });
        try {
          const data = await getUser();
          if (data?.id) {
            router.push('/dashboard');
            Cookies.set('loggedin', 'true');
          } else {
            redirectToUserDetailsPage();
          }
        } catch (error: any) {
          console.error('Errror in signin', error);
          if (
            error?.response?.status === 404 ||
            error?.response?.status === 500
          ) {
            redirectToUserDetailsPage();
          }
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // redirectToUserDetailsPage()

        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error in google sign', {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };
  return (
    <div className={styles.logincontainer}>
      <div className={styles.rightsection}>
        <Image src={Logo} alt={''} />
        <p className={styles.title}>
          You are
          <br />
          hopping to the
        </p>
        <span className={styles.transformdivwrraper}>
          <p className={styles.transformText}>right place</p>
        </span>
        <div className={styles.loginform}>
          <div className={styles.formwrapper}>
            <button
              type="submit"
              data-testid="login"
              onClick={login}
              className="button-block">
              <Image src={Google} alt={''} />
              &nbsp;&nbsp; Login via Google
            </button>
          </div>
          <p className={styles.agreetext}>
            By logining, I agree to the{' '}
            <a className={styles.link}>Terms of Service</a> and
            <br />
            <a className={styles.link}>Privacy Policy</a>
          </p>
        </div>
      </div>
      <div className={styles.leftsection}>
        <Image className={styles.imgcover} src={LoginCover} alt={''} />
      </div>
    </div>
  );
}
