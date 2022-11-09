import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  orderBy,
  where,
  query,
  limit,
  Timestamp,
  writeBatch,
  GeoPoint,
  onSnapshot,
  collectionGroup,
  deleteDoc,
  startAfter,
  endBefore,
  limitToLast,
  endAt,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  set,
  orderByChild,
  orderByKey,
  orderByValue,
  startAt,
  get,
  child,
  onDisconnect,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from "../../config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realDb = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  orderBy,
  where,
  query,
  limit,
  Timestamp,
  writeBatch,
  GeoPoint,
  onSnapshot,
  collectionGroup,
  deleteDoc,
  realDb,
  ref,
  push,
  onValue,
  update,
  set,
  orderByChild,
  orderByKey,
  orderByValue,
  startAt,
  get,
  child,
  onDisconnect,
  auth,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  startAfter,
  endBefore,
  limitToLast,
  endAt,
};
