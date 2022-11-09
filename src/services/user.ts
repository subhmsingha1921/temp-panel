import {
  USERS,
  CHATS,
  DEDICATED_CHAT,
  ARCHIVE,
  SEEKER_REPORTS,
  LISTENER_FEEDBACK,
  LISTENERS,
  LISTENER_REPORTS,
  SESSION_DEFAULTS,
  THERAPIST,
  SESSIONS,
  SESSION_CREDITS,
  SESSION_REQUESTS,
  SESSION_UPDATES,
} from "../constants/collection";
import {
  db,
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  orderBy,
  endBefore,
  limitToLast,
  setDoc,
} from "../libraries/firebase";
import { getAge, getAvatar } from "../utils/helper";
import moment from "moment";

export const fetchUsers = async (
  setSeekerList,
  snapshotDocs,
  setSnapshotDocs,
  paginateType
) => {
  try {
    let userRef = query(
      collection(db, USERS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      userRef = query(
        collection(db, USERS),
        orderBy("timestamp", "desc"),
        startAfter(snapshotDocs.docs[snapshotDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      userRef = query(
        collection(db, USERS),
        orderBy("timestamp", "desc"),
        endBefore(snapshotDocs.docs[0]),
        limitToLast(10)
      );
    }

    onSnapshot(userRef, (snapshot) => {
      let users = [];

      if (snapshot.size > 0) {
        snapshot.docs.forEach((d) => {
          const userData = d.data();
          users.push({
            key: d.id,
            name: userData?.["name"],
            age: userData?.["age"],
            gender: userData?.["gender"],
          });
        });

        setSnapshotDocs(snapshot);
        setSeekerList(users);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchListeners = async (
  listenerList,
  setListenerList,
  snapshotDocs,
  setSnapshotDocs,
  paginateType
) => {
  try {
    let userRef = query(collection(db, LISTENERS), limit(10));

    if (paginateType === "next") {
      userRef = query(
        collection(db, LISTENERS),
        startAfter(snapshotDocs[snapshotDocs.length - 1]),
        limit(10)
      );
    }

    onSnapshot(userRef, (snapshot) => {
      let updatedSnapshotDocs = snapshotDocs.concat(snapshot.docs);
      setSnapshotDocs(updatedSnapshotDocs);

      let users = [];
      snapshot.docs.forEach((d) => {
        const userData = d.data();
        users.push({
          key: d.id,
          name: userData?.["name"],
          age: userData?.["age"],
          gender: userData?.["gender"],
        });
      });

      let updatedList = listenerList.concat(users);
      setListenerList(updatedList);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (setUserData, userId, userType) => {
  try {
    const DOC_TYPE = userType === "seeker" ? USERS : LISTENERS;
    const profileType =
      userType === "seeker" ? "seekerprofile" : "listenerprofile";

    const docRef = doc(db, DOC_TYPE, userId);
    const response = await getDoc(docRef);
    const userData = response.data();

    setUserData([
      {
        key: userId,
        name: userData["name"],
        photo: getAvatar(userData["name"]),
        age: userData["age"],
        gender: userData["gender"],
        profileType: profileType,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfileInfo = async (setCurrentUser, userId) => {
  try {
    const userRef = doc(db, USERS, userId);
    const response = await getDoc(userRef);
    const userData = response.data();

    setCurrentUser({
      id: userId,
      name: userData["name"],
      photo: getAvatar(userData["name"]),
      age: userData["age"],
      contact: userData["emergencyContact"],
      phone: userData["phone"] ?? "N/A",
      bio: userData["bio"] ?? "N/A",
      email: userData["email"] ?? "N/A",
      gender: userData["gender"],
      location: userData["location"] ?? "N/A",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getListenerProfileInfo = async (setCurrentUser, userId) => {
  try {
    const listenerRef = doc(db, LISTENERS, userId);
    const response = await getDoc(listenerRef);
    const listenerData = response.data();

    setCurrentUser({
      id: userId,
      name: listenerData["name"],
      photo: getAvatar(listenerData["name"]),
      age: listenerData["age"],
      contact: listenerData["emergencyContact"] ?? "N/A",
      phone: listenerData["phone"] ?? "N/A",
      bio: listenerData["bio"] ?? "N/A",
      email: listenerData["email"] ?? "N/A",
      gender: listenerData["gender"],
      location: listenerData["city"] ?? "N/A",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserActiveChats = async (
  setActiveChat,
  userId,
  userType = "user"
) => {
  try {
    const activeChatList = [];

    const activeChats = query(
      collection(db, CHATS),
      where(userType, "==", userId),
      where("isAddedToDedicatedChats", "==", false),
      where("isClosedByListener", "==", false),
      where("isClosedBySeeker", "==", false),
      where("seekerJoined", "==", true)
    );
    const querySnapshot = await getDocs(activeChats);
    querySnapshot.forEach((activeDoc) => {
      if (activeDoc.data().listener !== "waiting") {
        const activeData = activeDoc.data();
        activeChatList.push({
          key: activeDoc.id,
          userId: activeData["user"],
          otherUserId: activeData["listener"],
          photo: getAvatar(activeData["listenerName"]),
          name: activeData["listenerName"],
          age: activeData["age"] ?? "N/A",
          topicName: activeData["topic"],
          chatId: activeDoc.id,
          chatType: "active",
        });
      }
    });
    setActiveChat(activeChatList);
  } catch (error) {
    console.log(error);
  }
};

export const getUserDedicatedChats = async (
  dedicatedChat,
  setDedicatedChat,
  userId,
  userType,
  snapshotDocs,
  setSnapshotDocs,
  paginateType
) => {
  try {
    let dedicatedChatList = [];
    let dedicatedRef = query(
      collection(db, USERS, userId, DEDICATED_CHAT),
      where("type", "==", userType),
      limit(10)
    );

    if (paginateType === "next") {
      dedicatedRef = query(
        collection(db, USERS, userId, DEDICATED_CHAT),
        where("type", "==", userType),
        startAfter(snapshotDocs[snapshotDocs.length - 1]),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(dedicatedRef);
    let updatedSnapshotDocs = snapshotDocs.concat(querySnapshot.docs);
    setSnapshotDocs(updatedSnapshotDocs);

    querySnapshot.forEach((dedicatedChatDoc) => {
      const dedicatedData = dedicatedChatDoc.data();
      dedicatedChatList.push({
        key: dedicatedChatDoc.id,
        userId: userId,
        otherUserId: dedicatedData["listener"],
        photo: getAvatar(dedicatedData["listenerName"]),
        name: dedicatedData["listenerName"],
        age: dedicatedData["age"] ?? "N/A",
        topicName: dedicatedData["topic"],
        chatId: dedicatedChatDoc.id,
        chatType: "dedicated",
      });
    });

    let updatedUserDedicatedChats = dedicatedChat.concat(dedicatedChatList);
    setDedicatedChat(updatedUserDedicatedChats);
  } catch (error) {
    console.log(error);
  }
};

export const getUserArchiveChats = async (
  archiveChatList,
  setArchiveChatList,
  userId,
  userType,
  snapshotDocs,
  setSnapshotDocs,
  paginateType
) => {
  try {
    let chatList = [];
    let archiveChatRef = query(
      collection(db, USERS, userId, ARCHIVE),
      where("type", "==", userType),
      limit(10)
    );

    if (paginateType === "next") {
      archiveChatRef = query(
        collection(db, USERS, userId, ARCHIVE),
        where("type", "==", userType),
        startAfter(snapshotDocs[snapshotDocs.length - 1]),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(archiveChatRef);
    let updatedSnapshotDocs = snapshotDocs.concat(querySnapshot.docs);
    setSnapshotDocs(updatedSnapshotDocs);

    querySnapshot.forEach((archiveDoc) => {
      const archiveData = archiveDoc.data();
      chatList.push({
        key: archiveDoc.id,
        userId: userId,
        photo: getAvatar(archiveData["listenerName"]),
        otherUserId: archiveData["listenerId"],
        name: archiveData["listenerName"],
        age: archiveData["age"] ?? "N/A",
        topicName: archiveData["topic"],
        chatId: archiveDoc.id,
        chatType: "archive",
      });
    });

    let updatedUserArchiveChats = archiveChatList.concat(chatList);
    setArchiveChatList(updatedUserArchiveChats);
  } catch (error) {
    console.log(error);
  }
};

export const getSeekerReports = async (setSeekerReports, userId) => {
  try {
    const reportRef = query(
      collection(db, SEEKER_REPORTS),
      where("user", "==", userId)
    );
    onSnapshot(reportRef, (snapshot) => {
      let reportList = [];
      snapshot.docs.forEach((d) => {
        const reportData = d.data();
        reportList.push({
          key: d.id,
          userId: reportData["user"],
          otherUserId: reportData["reportedId"] ?? reportData["listener"],
          photo: getAvatar(reportData["reportedName"]),
          name: reportData["reportedName"] ?? "N/A",
          reason: reportData["report"],
          chatId: reportData["chatId"],
        });
      });
      setSeekerReports(reportList);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getListenerReviews = async (setListenerReviews, userId) => {
  try {
    const reviewList = [];

    const reviewRef = query(
      collection(db, LISTENER_FEEDBACK),
      where("listener", "==", userId)
    );
    const querySnapshot = await getDocs(reviewRef);

    querySnapshot.forEach((reviewDoc) => {
      const reviewData = reviewDoc.data();
      reviewList.push({
        key: reviewDoc.id,
        chatId: reviewData["chatId"],
        seekerName: reviewData["seekerName"],
        seekerId: reviewData["seeker"],
        listenerName: reviewData["listenerName"],
        listenerId: reviewData["listener"],
        experience: reviewData["experience"],
      });
    });

    setListenerReviews(reviewList);
  } catch (error) {
    console.log(error);
  }
};

export const getListenerReports = async (setListenerReports, userId) => {
  try {
    const reportList = [];

    const reportRef = query(
      collection(db, LISTENER_REPORTS),
      where("user", "==", userId)
    );
    const querySnapshot = await getDocs(reportRef);

    querySnapshot.forEach((reportDoc) => {
      const reportData = reportDoc.data();
      reportList.push({
        key: reportDoc.id,
        chatId: reportData["chatId"] ?? null,
        seekerName: reportData["reportedName"] ?? "N/A",
        seekerId: reportData["reportedId"] ?? reportData["seeker"],
        listenerName: reportData["userName"] ?? "N/A",
        listenerId: userId,
        reason: reportData["report"],
        requestReported: reportData["IsFromRequestScreen"] ?? false,
      });
    });

    setListenerReports(reportList);
  } catch (error) {
    console.log(error);
  }
};

export const getTherapistData = async (setTherapistData, userId) => {
  try {
    const docRef = doc(db, THERAPIST, userId);
    const response = await getDoc(docRef);
    const therapistData = response.data();
    setTherapistData([
      {
        ...therapistData,
        key: userId,
        photo: getAvatar(therapistData["name"]),
        age: getAge(therapistData["dob"].toDate()),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserSessionDefaults = async (setSessionDefaults, userId) => {
  try {
    const userRef = doc(db, USERS, userId, SESSION_DEFAULTS, SESSION_DEFAULTS);
    const response = await getDoc(userRef);
    const userSessionDefaultData = response.data();

    setSessionDefaults([
      {
        ...userSessionDefaultData,
        key: userId,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserSessions = async (setSessions, userId) => {
  try {
    const sessionList = [];
    const userSessionRef = collection(db, USERS, userId, SESSIONS);
    const querySnapshot = await getDocs(userSessionRef);

    querySnapshot.forEach((sessionDoc) => {
      const sessionData = sessionDoc.data();

      const creationTime = sessionData["timestamp"];
      const convertedDateTime = moment(creationTime.toDate()).format(
        "h:mm A, MMMM DD, YYYY"
      );
      const paymentInfo = sessionData["payment"];
      const paidAt = paymentInfo?.paidAt ?? sessionData["createdAt"];
      const paidTime = moment(paidAt.toDate()).format("h:mm A, MMMM DD, YYYY");

      sessionList.push({
        key: sessionDoc.id,
        sessionId: sessionDoc.id,
        therapist: sessionData.therapist,
        seekerId: sessionData.requesterID,
        reason: sessionData.reasonForBooking,
        timestamp: convertedDateTime,
        payment: paymentInfo,
        paidTime,
        email: sessionData?.["email"],
        preferredAge: sessionData?.["preferredAge"],
        preferredLanguage: sessionData?.["preferredLanguage"],
      });
    });
    setSessions(sessionList);
  } catch (error) {
    console.log(error);
  }
};

export const getSeekerSessionCredits = async (setSessionCredit, userId) => {
  try {
    const seekerSessionCreditList = [];
    const creditRef = query(
      collection(db, SESSION_CREDITS),
      where("creditsLeft", ">=", 1),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(creditRef);
    if (querySnapshot.empty) {
      setSessionCredit(seekerSessionCreditList);
      return;
    }
    querySnapshot.forEach((creditItem) =>
      seekerSessionCreditList.push({
        ...creditItem.data(),
        key: creditItem.id,
      })
    );
    setSessionCredit(seekerSessionCreditList);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserSessionsRequests = async (setSessionRequests, userId) => {
  try {
    const sessionRequestsList = [];
    const userSessionRef = query(
      collection(db, SESSION_REQUESTS),
      where("requesterID", "==", userId)
    );
    const querySnapshot = await getDocs(userSessionRef);

    querySnapshot.forEach((sessionDoc) => {
      const sessionData = sessionDoc.data();

      const creationTime = sessionData["timestamp"];
      const convertedDateTime = moment(creationTime.toDate()).format(
        "h:mm A, MMMM DD, YYYY"
      );

      sessionRequestsList.push({
        key: sessionDoc.id,
        sessionId: sessionDoc.id,
        therapist: sessionData.therapist,
        seekerId: sessionData.requesterID,
        reason: sessionData.reasonForBooking,
        started: convertedDateTime,
      });
    });
    setSessionRequests(sessionRequestsList);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserSessionsUpdates = async (setSessionUpdates, userId) => {
  try {
    const sessionUpdatesList = [];
    const userSessionRef = query(
      collection(db, SESSION_UPDATES),
      where("requesterID", "==", userId)
    );
    const querySnapshot = await getDocs(userSessionRef);

    querySnapshot.forEach((sessionDoc) => {
      const sessionData = sessionDoc.data();

      const creationTime = sessionData["timestamp"];
      const convertedDateTime = moment(creationTime.toDate()).format(
        "h:mm A, MMMM DD, YYYY"
      );

      sessionUpdatesList.push({
        key: sessionDoc.id,
        sessionId: sessionDoc.id,
        therapist: sessionData.therapist,
        seekerId: sessionData.requesterID,
        reason: sessionData.reasonForBooking,
        started: convertedDateTime,
      });
    });
    setSessionUpdates(sessionUpdatesList);
  } catch (error) {
    console.log(error);
  }
};

export const checkAccountDisabled = async (userId, setIsDisabled) => {
  try {
    const docRef = doc(db, USERS, userId);

    onSnapshot(docRef, (snapshot) => {
      const isDisabled = snapshot.data()?.isDisabled ?? false;
      setIsDisabled(isDisabled);
    });
  } catch (error) {
    console.log(error);
  }
};

export const banUser = async (userId, status) => {
  try {
    const docRef = doc(db, USERS, userId);

    await setDoc(
      docRef,
      {
        isDisabled: status,
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
