import firebase from '../config/firebase';
import { Tweet } from '../types';

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
