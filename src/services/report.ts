import { LISTENER_REPORTS, SEEKER_REPORTS } from "../constants/collection";
import {
  collection,
  db,
  getDocs,
  query,
  limitToLast,
  limit,
  startAfter,
  endBefore,
  orderBy,
} from "../libraries/firebase";
import moment from "moment";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export const getListenerReports = async (
  setListenerReports: (arg0: any[]) => void,
  paginateType: string,
  currentDocs: QuerySnapshot<DocumentData> | any,
  setCurrentDocs: (arg0: QuerySnapshot<DocumentData>) => void,
  setTableSource?: (arg0: any[]) => void
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, LISTENER_REPORTS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, LISTENER_REPORTS),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, LISTENER_REPORTS),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);
    const listenerReports: {
      userType: string;
      reportId: string;
      id: string;
      key: number;
      userId: string;
      otherUserId: string;
      seeker: string;
      report: string;
      timestamp: string;
      requestReported: any;
    }[] = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        if (snapShot.data().chatId && snapShot.data().timestamp) {
          listenerReports.push({
            userType: "Listener",
            reportId: snapShot.id,
            id: snapShot.data().chatId,
            key: Math.random(),
            userId: snapShot.data().user,
            otherUserId: snapShot.data().reportedId,
            seeker: snapShot.data().reportedName,
            report: snapShot.data().report,
            timestamp: snapShot.data().timestamp
              ? moment(snapShot.data().timestamp.toDate()).format(
                  "h:mm A, MMMM DD, YYYY"
                )
              : "-",
            requestReported: snapShot.data()["IsFromRequestScreen"] ?? false,
          });
        }
      });
      setCurrentDocs(res);
      if (setTableSource) {
        setTableSource(listenerReports);
      }
      setListenerReports(listenerReports);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSeekerReports = async (
  setSeekerReports: (arg0: any[]) => void,
  paginateType: string,
  currentDocs: QuerySnapshot<DocumentData> | any,
  setCurrentDocs: (arg0: QuerySnapshot<DocumentData>) => void,
  setTableSource?: (arg0: any[]) => void
) => {
  try {
    let docRef;
    docRef = query(
      collection(db, SEEKER_REPORTS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      docRef = query(
        collection(db, SEEKER_REPORTS),
        orderBy("timestamp", "desc"),
        startAfter(currentDocs.docs[currentDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      docRef = query(
        collection(db, SEEKER_REPORTS),
        orderBy("timestamp", "desc"),
        endBefore(currentDocs.docs[0]),
        limitToLast(10)
      );
    }

    const res = await getDocs(docRef);

    const seekerReports: {
      userType: string;
      reportId: string;
      id: string;
      key: number;
      userId: string;
      otherUserId: string;
      listener: string;
      report: string;
      timestamp: string;
    }[] = [];

    if (res.size > 0) {
      res.forEach((snapShot) => {
        if (snapShot.data().chatId && snapShot.data().timestamp) {
          seekerReports.push({
            userType: "Seeker",
            reportId: snapShot.id,
            id: snapShot.data().chatId,
            key: Math.random(),
            userId: snapShot.data().user,
            otherUserId: snapShot.data().reportedId,
            listener: snapShot.data().reportedName,
            report: snapShot.data().report,
            timestamp: snapShot.data().timestamp
              ? moment(snapShot.data().timestamp.toDate()).format(
                  "h:mm A, MMMM DD, YYYY"
                )
              : "-",
          });
        }
      });
      setCurrentDocs(res);
      if (setTableSource) {
        setTableSource(seekerReports);
      }
      setSeekerReports(seekerReports);
    }
  } catch (error) {
    console.log(error);
  }
};
