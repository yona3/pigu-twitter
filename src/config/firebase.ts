import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FB_API_KEY,
  authDomain: env.VITE_FB_AUTH_ADMIN,
  databaseURL: env.VITE_FB_DB_URL,
  projectId: env.VITE_FB_PROJECT_ID,
  storageBucket: env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FB_MESSAGING_SENDER_ID,
  appId: env.VITE_FB_APP_ID,
  measurementId: env.VITE_FB_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
