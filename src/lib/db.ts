import firebase from '../config/firebase';

const db = firebase.firestore();

export const fetchPost = (postId: string) =>
  db.collection('posts').doc(postId).get();

export const fetchMe = (userId: string) =>
  db.collection('users').doc(userId).get();
