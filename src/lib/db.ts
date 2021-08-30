import firebase from '../config/firebase';
import { BlackPostDoc, Tweet } from '../types';

const db = firebase.firestore();

// type

export type Timestamp = firebase.firestore.Timestamp;
export type FieldValue = firebase.firestore.FieldValue;

// functions

export const fetchPost = (postId: string) => db.doc(`posts/${postId}`).get();

export const fetchMe = (userId: string) => db.doc(`users/${userId}`).get();

export const fetchReservations = () =>
  db.collection('twitter/v1/tweet').orderBy('tweetAt').get();

export const updateReservation = (reservationId: string, data: Tweet) =>
  db.doc(`twitter/v1/tweet/${reservationId}`).update(data);

export const deleteReservation = (reservationId: string) =>
  db.doc(`twitter/v1/tweet/${reservationId}`).delete();

export const fetchBlackPosts = () =>
  db.collection('twitter/v1/system/tweet/blackPosts').get();

export const updateBlackPost = (
  postId: string,
  query: 'add' | 'remove',
  data?: BlackPostDoc
) => {
  if (query === 'add') {
    if (!data) return;
    return db.doc(`twitter/v1/system/tweet/blackPosts/${postId}`).set(data);
  } else {
    return db.doc(`twitter/v1/system/tweet/blackPosts/${postId}`).delete();
  }
};
