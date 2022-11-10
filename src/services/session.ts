import { SESSIONS, USERS } from "../constants/collection";
import {
  db,
  doc,
  collection,
  query,
  getDocs,
  writeBatch,
  limit,
  orderBy,
  startAfter,
  endBefore,
  limitToLast,
} from "../libraries/firebase";

import moment from "moment";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export const fetchSessions = async (
  setSessionList: (arg0: any[]) => void,
  snapshotDocs: QuerySnapshot<DocumentData> | any,
  setSnapshotDocs: (arg0: QuerySnapshot<DocumentData>) => void,
  paginateType?: string
) => {
  try {
    let sessionRef = query(
      collection(db, SESSIONS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      sessionRef = query(
        collection(db, SESSIONS),
        orderBy("timestamp", "desc"),
        startAfter(snapshotDocs.docs[snapshotDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      sessionRef = query(
        collection(db, SESSIONS),
        orderBy("timestamp", "desc"),
        endBefore(snapshotDocs.docs[0]),
        limitToLast(10)
      );
    }

    const querySnapshot = await getDocs(sessionRef);
    let sessions: {
      key: string;
      id: string;
      seekerId: string;
      therapist: string;
      started: string;
      payment: any;
      paidTime: string;
      email: string;
      reasonForBooking: string;
      preferredAge: number;
      preferredLanguage: string;
    }[] = [];

    if (querySnapshot.size > 0) {
      querySnapshot.docs.forEach((d) => {
        const sessionData = d.data();

        const creationTime = sessionData["timestamp"];
        const convertedDateTime = moment(creationTime.toDate()).format(
          "h:mm A, MMMM DD, YYYY"
        );
        const paymentInfo = sessionData["payment"];
        const paidAt = paymentInfo?.paidAt ?? sessionData["createdAt"];
        const paidTime = moment(paidAt.toDate()).format(
          "h:mm A, MMMM DD, YYYY"
        );

        sessions.push({
          key: d.id,
          id: sessionData?.["sessionId"],
          seekerId: sessionData?.["requesterID"],
          therapist: sessionData?.["therapist"],
          started: convertedDateTime,
          payment: paymentInfo,
          paidTime,
          email: sessionData?.["email"],
          reasonForBooking: sessionData?.["reasonForBooking"],
          preferredAge: sessionData?.["preferredAge"],
          preferredLanguage: sessionData?.["preferredLanguage"],
        });
      });

      setSnapshotDocs(querySnapshot);
      setSessionList(sessions);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setSessionUrl = async (
  userId: string,
  sessionId: string,
  value: string
) => {
  try {
    const batch = writeBatch(db);
    const sessionRef = doc(db, SESSIONS, sessionId);
    const userSessionRef = doc(db, USERS, userId, SESSIONS, sessionId);

    batch.set(
      sessionRef,
      {
        sessionUrl: value,
      },
      { merge: true }
    );

    batch.set(
      userSessionRef,
      {
        sessionUrl: value,
      },
      { merge: true }
    );

    await batch.commit();

    return "success";
  } catch (error) {
    console.log(error);
    return "failed";
  }
};
