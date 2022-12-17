import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD9ggYMbQaqO9-nryt-COUIgKWT8Wf8p7g',
  authDomain: 'hop3-660b9.firebaseapp.com',
  projectId: 'hop3-660b9',
  storageBucket: 'hop3-660b9.appspot.com',
  messagingSenderId: '567493302718',
  appId: '1:567493302718:web:39ccd3bd2955f8429a81ef',
  measurementId: 'G-9DYDDHW0FM',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
