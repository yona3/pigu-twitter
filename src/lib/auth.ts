import firebase from '../config/firebase';

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithRedirect(googleProvider);

export const signOut = () => auth.signOut();

export const userStateObserver = (
  callback: (user: firebase.User | null) => void
) =>
  auth.onAuthStateChanged((user) => {
    callback(user);
  });
