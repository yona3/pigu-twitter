import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const firestore = admin.firestore();
const FildValue = admin.firestore.FieldValue;

export { functions, firestore, FildValue };
