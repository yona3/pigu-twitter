import firebase from '../config/firebase';

const db = firebase.firestore();

export const fetchPost = (postId: string) =>
  db.collection('posts').doc(postId).get();
