import React, { useCallback } from 'react';
import styles from '../../styles/Home.module.scss';
import Image from 'next/image';
import Logout from '../../public/images/Logout.png';
import Profile from '../../public/images/Profile.png';
//logout
import { useRouter } from 'next/router';
import { FIREBASE_AUTH } from '../firebase';
import Cookies from 'js-cookie';
const Header = (props: any) => {
  const router = useRouter();

  const logout = useCallback(() => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        localStorage.removeItem('authToken');
        Cookies.remove('loggedin');
        router.push('/login');
      })
      .catch(error => {
        console.error('Error in signout', error);
        localStorage.removeItem('authToken');
        Cookies.remove('loggedin');
        router.push('/login');
      });
  }, [router]);
  return (
    <header className={styles.header}>
      <div className={styles.right}>
        <div className={styles.profile}>
          <button className={styles.sharebutton} onClick={() => {}}>
            Share Experience
          </button>
          <div className={styles.dropdown}>
            <Image
              className={styles.profileimg}
              src={Profile}
              alt={'profile'}
              width={40}
              height={40}
            />
            <div className={styles.dropdowncontent}>
              <div className={styles.menuitem} onClick={logout}>
                Log out
                <Image className={styles.logout} src={Logout} alt={'logout'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
