import {
  APP_FEEDBACKS,
  LISTENER_FEEDBACK,
  MATCHING_EXIT_FEEDBACK,
  SEEKER_FEEDBACK,
} from "../constants/collection";
import {
  db,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  endBefore,
} from "../libraries/firebase";

import moment from "moment";

export const getAppFeedbacks = async (
  setAppFeedbacks,
  paginateType,
  currentDocs,
  setCurrentDocs
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, APP_FEEDBACKS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, APP_FEEDBACKS),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, APP_FEEDBACKS),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);
    const appFeedbackList = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        const { user, userName, timestamp, message } = snapShot.data();
        if (userName && timestamp) {
          const updatedTimestamp =
            typeof timestamp === "string"
              ? timestamp
              : moment(timestamp.toDate()).format("h:mm A, MMMM DD, YYYY");
          appFeedbackList.push({
            type: "appfeedback",
            key: Math.random(),
            id: snapShot.id,
            userId: user,
            user: userName ?? "-",
            experience: message,
            timestamp: updatedTimestamp,
          });
        }
      });
      setCurrentDocs(res);
      setAppFeedbacks(appFeedbackList);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMatchingExitFeedback = async (
  setMatchingExitFeedback,
  paginateType,
  currentDocs,
  setCurrentDocs,
  setTableSource
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, MATCHING_EXIT_FEEDBACK),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, MATCHING_EXIT_FEEDBACK),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, MATCHING_EXIT_FEEDBACK),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);
    const mathchingExitFeedback = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        const { user, userName, reason, timestamp } = snapShot.data();
        if (timestamp) {
          mathchingExitFeedback.push({
            type: "matchingexitfeedback",
            key: Math.random(),
            id: snapShot.id,
            userId: user,
            user: userName,
            reason: reason,
            timestamp: moment(timestamp.toDate()).format(
              "h:mm A, MMMM DD, YYYY"
            ),
          });
        }
      });
      setCurrentDocs(res);
      if (setTableSource) {
        setTableSource(mathchingExitFeedback);
      }
      setMatchingExitFeedback(mathchingExitFeedback);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getListenerFeedback = async (
  setListenerFeedback,
  paginateType,
  currentDocs,
  setCurrentDocs,
  setTableSource
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, LISTENER_FEEDBACK),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, LISTENER_FEEDBACK),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, LISTENER_FEEDBACK),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);
    const listenerFeedback = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        const { chatId, timestamp, listener, seeker, seekerName, experience } =
          snapShot.data();
        if (chatId && timestamp) {
          listenerFeedback.push({
            key: Math.random(),
            userType: "Listener",
            type: "listenerfeedback",
            feedbackId: snapShot.id,
            userId: listener,
            otherUserId: seeker,
            id: chatId,
            seeker: seekerName,
            experience: experience,
            timestamp: moment(timestamp.toDate()).format(
              "h:mm A, MMMM DD, YYYY"
            ),
          });
        }
      });
      setCurrentDocs(res);
      if (setTableSource) {
        setTableSource(listenerFeedback);
      }
      setListenerFeedback(listenerFeedback);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSeekerFeedback = async (
  setSeekerFeedback,
  paginateType,
  currentDocs,
  setCurrentDocs,
  setTableSource
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, SEEKER_FEEDBACK),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, SEEKER_FEEDBACK),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, SEEKER_FEEDBACK),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);
    const seekerFeedback = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        const {
          chatId,
          timestamp,
          experience,
          seeker,
          listener,
          listenerName,
          feeling,
          rating,
        } = snapShot.data();
        if (chatId && timestamp) {
          const updatedTimestamp =
            typeof timestamp === "string"
              ? timestamp
              : moment(timestamp.toDate()).format("h:mm A, MMMM DD, YYYY");
          let seekerExp = experience;
          if (Array.isArray(seekerExp)) {
            seekerExp = seekerExp.join(", ");
          }
          seekerFeedback.push({
            key: Math.random(),
            userType: "Seeker",
            type: "seekerfeedback",
            feedbackId: snapShot.id,
            userId: seeker,
            otherUserId: listener,
            id: chatId,
            listener: listenerName,
            experience: seekerExp,
            feeling: feeling,
            rating: rating,
            timestamp: updatedTimestamp,
          });
        }
      });
      setCurrentDocs(res);
      if (setTableSource) {
        setTableSource(seekerFeedback);
      }
      setSeekerFeedback(seekerFeedback);
    }
  } catch (error) {
    console.log(error);
  }
};
