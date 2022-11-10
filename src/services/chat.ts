import {
  CHAT_REQUESTS,
  MISSED_CHAT_REQUESTS,
  CHATS,
  USERS,
  ARCHIVE,
  DEDICATED_CHAT,
} from "../constants/collection";
import {
  db,
  onSnapshot,
  realDb,
  ref,
  onValue,
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  orderBy,
  endBefore,
  limitToLast,
  collectionGroup,
  writeBatch,
  doc,
  Timestamp,
  setDoc,
} from "../libraries/firebase";

import moment from "moment";
import { formatTime, getAvatar } from "../utils/helper";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export const getChatRequests = async (
  setChatRequests: (arg0: any[]) => void
) => {
  try {
    const docRef = collection(db, CHAT_REQUESTS);

    onSnapshot(docRef, (querySnapshot) => {
      let chatRequests: {
        key: string | null;
        seeker: string | null;
        topic: string;
        onMind: string;
        requestedTime: string;
      }[] = [];

      querySnapshot.forEach((res) => {
        chatRequests.push({
          key: res.data().user,
          seeker: res.data().userName,
          topic: res.data().topic,
          onMind: res.data().onMind || "-",
          requestedTime: res.data().timestamp
            ? moment(res.data().timestamp.toDate()).format(
                "h:mm A, MMMM DD, YYYY"
              )
            : "-",
        });
      });
      setChatRequests(chatRequests);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getChatMessages = (
  setChatMessages: (arg0: any[]) => void,
  chatId: string
) => {
  try {
    const messageRef = ref(realDb, `Chats/${chatId}`);
    onValue(messageRef, (snapshot) => {
      let messagesList: {
        _id: string | null;
        messageId: string | null;
        text: any;
        createdAt: string;
        user: { _id: any };
      }[] = [];

      snapshot.forEach((documentSnapshot) => {
        if (documentSnapshot.val()["message"]) {
          const messageId = documentSnapshot.key;
          const unixTime =
            documentSnapshot.val()["timeStamp"] ??
            documentSnapshot.val()["timestamp"];
          const convertedDateTime = formatTime(new Date(unixTime * 1000));

          messagesList.push({
            _id: messageId,
            messageId: messageId,
            text: documentSnapshot.val()["message"],
            createdAt: convertedDateTime,
            user: {
              _id: documentSnapshot.val()["sentUser"],
            },
          });
        }
      });
      setChatMessages(messagesList.reverse());
    });
  } catch (error) {
    console.log(error);
  }
};

export const getActiveChats = async (
  activeChat: any[],
  setActiveChat: (arg0: any) => void,
  snapshotDocs: any[],
  setSnapshotDocs: (arg0: any) => void,
  paginateType?: string
) => {
  try {
    let activeChatList: {
      key: string;
      chatId: string;
      id: string;
      listener: any;
      listenerId: any;
      seeker: any;
      seekerId: any;
      started: any;
      chatType: string;
      topic: any;
    }[] = [];

    let activeChatsRef = query(
      collection(db, CHATS),
      where("isAddedToDedicatedChats", "==", false),
      where("isClosedByListener", "==", false),
      where("isClosedBySeeker", "==", false),
      where("seekerJoined", "==", true),
      limit(10)
    );

    if (paginateType === "next") {
      activeChatsRef = query(
        collection(db, CHATS),
        where("isAddedToDedicatedChats", "==", false),
        where("isClosedByListener", "==", false),
        where("isClosedBySeeker", "==", false),
        where("seekerJoined", "==", true),
        startAfter(snapshotDocs[snapshotDocs.length - 1]),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(activeChatsRef);
    let updatedSnapshotDocs = snapshotDocs.concat(querySnapshot.docs);
    setSnapshotDocs(updatedSnapshotDocs);

    querySnapshot.forEach((activeDoc) => {
      if (activeDoc.data().listener !== "waiting") {
        const activeData = activeDoc.data();
        const creationTime = activeData["timestamp"];
        let convertedDateTime;
        if (creationTime) {
          convertedDateTime = moment(creationTime.toDate()).format(
            "h:mm A, MMMM DD, YYYY"
          );
        }
        activeChatList.push({
          key: activeDoc.id,
          chatId: activeDoc.id,
          id: activeDoc.id,
          listener: activeData["listenerName"],
          listenerId: activeData["listener"],
          seeker: activeData["userName"],
          seekerId: activeData["user"],
          started: convertedDateTime ?? activeData["date"],
          chatType: "active",
          topic: activeData["topic"],
        });
      }
    });

    let updatedActiveChatList = activeChat.concat(activeChatList);
    setActiveChat(updatedActiveChatList);
  } catch (error) {
    console.log(error);
  }
};

export const getDedicatedChats = async (
  dedicatedChat: any[],
  setDedicatedChat: (arg0: any) => void,
  snapshotDocs: any[],
  setSnapshotDocs: (arg0: any) => void,
  paginateType?: string
) => {
  try {
    let dedicatedList: {
      key: string;
      chatId: any;
      id: string;
      listener: any;
      listenerId: any;
      seeker: string;
      seekerId: string;
      type: any;
      started: any;
      topic: any;
      chatType: string;
    }[] = [];

    let dedicatedChatRef = query(
      collectionGroup(db, DEDICATED_CHAT),
      limit(10)
    );

    if (paginateType === "next") {
      dedicatedChatRef = query(
        collectionGroup(db, DEDICATED_CHAT),
        startAfter(snapshotDocs[snapshotDocs.length - 1]),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(dedicatedChatRef);
    let updatedSnapshotDocs = snapshotDocs.concat(querySnapshot.docs);
    setSnapshotDocs(updatedSnapshotDocs);

    querySnapshot.docs.forEach((dedicatedDoc: any) => {
      const alreadyExist = dedicatedList.some(
        (dedicatedItem) => dedicatedItem && dedicatedItem.id === dedicatedDoc.id
      );

      if (!alreadyExist) {
        const dedicatedData = dedicatedDoc.data();
        const userId = dedicatedDoc.ref.parent.parent.id;
        const userRole = dedicatedData["type"] ?? "seeker";

        let listenerName = dedicatedData["listenerName"];
        let listenerId = dedicatedData["listener"];
        let seekerId = userId;
        if (userRole !== "seeker") {
          listenerName = userId;
          listenerId = userId;
          seekerId = dedicatedData["listener"];
        }

        dedicatedList.push({
          key: dedicatedDoc.id,
          chatId: dedicatedData["chatId"],
          id: dedicatedDoc.id,
          listener: listenerName,
          listenerId: listenerId,
          seeker: seekerId,
          seekerId: seekerId,
          type: userRole,
          started: dedicatedData["date"],
          topic: dedicatedData["topic"],
          chatType: "dedicated",
        });
      }
    });

    let updatedDedicatedChats = dedicatedChat.concat(dedicatedList);
    setDedicatedChat(updatedDedicatedChats);
  } catch (error) {
    console.log(error);
  }
};

export const getMissedChatRequests = async (
  setMissedChatRequests: (arg0: any[]) => void,
  snapshotDocs: QuerySnapshot<DocumentData> | any,
  setSnapshotDocs: (arg0: QuerySnapshot<DocumentData>) => void,
  paginateType: string,
  setTableSource?: (arg0: any[]) => void
) => {
  try {
    let missedChatRequestsRef = query(
      collection(db, MISSED_CHAT_REQUESTS),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      missedChatRequestsRef = query(
        collection(db, MISSED_CHAT_REQUESTS),
        orderBy("timestamp", "desc"),
        startAfter(snapshotDocs.docs[snapshotDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      missedChatRequestsRef = query(
        collection(db, MISSED_CHAT_REQUESTS),
        orderBy("timestamp", "desc"),
        endBefore(snapshotDocs.docs[0]),
        limitToLast(10)
      );
    }

    const querySnapshot = await getDocs(missedChatRequestsRef);
    let missedChatRequestsList: {
      key: string;
      seeker: any;
      photo: string;
      seekerId: any;
      topic: any;
      onMind: any;
      requestedTime: string;
    }[] = [];

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((missedChatRequestsDoc) => {
        const { user, userName, topic, onMind, timestamp } =
          missedChatRequestsDoc.data();

        missedChatRequestsList.push({
          key: missedChatRequestsDoc.id,
          seeker: userName,
          photo: getAvatar(userName),
          seekerId: user,
          topic: topic,
          onMind: onMind,
          requestedTime: moment(timestamp.toDate()).format(
            "h:mm A, MMMM DD, YYYY"
          ),
        });
      });

      setSnapshotDocs(querySnapshot);
      if (setTableSource) {
        setTableSource(missedChatRequestsList);
      }
      setMissedChatRequests(missedChatRequestsList);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGlobalArchiveChats = async (
  setGlobalArchiveChat: (arg0: any[]) => void,
  snapshotDocs: QuerySnapshot<DocumentData> | any,
  setSnapshotDocs: (arg0: QuerySnapshot<DocumentData>) => void,
  paginateType?: string
) => {
  try {
    let archiveChatRef = query(
      collectionGroup(db, ARCHIVE),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    if (paginateType === "next") {
      archiveChatRef = query(
        collectionGroup(db, ARCHIVE),
        orderBy("timestamp", "desc"),
        startAfter(snapshotDocs.docs[snapshotDocs.docs.length - 1]),
        limit(10)
      );
    }

    if (paginateType === "previous") {
      archiveChatRef = query(
        collectionGroup(db, ARCHIVE),
        orderBy("timestamp", "desc"),
        endBefore(snapshotDocs.docs[0]),
        limitToLast(10)
      );
    }

    const querySnapshot = await getDocs(archiveChatRef);
    let archiveList: {
      key: string;
      id: string;
      chatId: any;
      listener: any;
      listenerId: any;
      seekerId: string;
      topic: any;
      type: any;
      ended: any;
      chatType: string;
    }[] = [];

    if (querySnapshot.size > 0) {
      querySnapshot.docs.forEach((archiveDoc: any) => {
        const alreadyExist = archiveList.some(
          (archiveItem) => archiveItem && archiveItem.id === archiveDoc.id
        );

        if (!alreadyExist) {
          const archiveData = archiveDoc.data();
          const creationTime = archiveData["timestamp"];
          let convertedDateTime;
          if (creationTime) {
            convertedDateTime = moment(creationTime.toDate()).format(
              "h:mm A, MMMM DD, YYYY"
            );
          }
          const userId = archiveDoc.ref.parent.parent.id;
          const userRole = archiveData["type"] ?? "seeker";

          let listenerName = archiveData["listenerName"];
          let listenerId = archiveData["listenerId"];
          let seekerId = userId;
          if (userRole !== "seeker") {
            listenerName = userId;
            listenerId = userId;
            seekerId = archiveData["listenerId"];
          }

          archiveList.push({
            key: archiveDoc.id,
            id: archiveDoc.id,
            chatId: archiveData["chatId"],
            listener: listenerName,
            listenerId: listenerId,
            seekerId: seekerId,
            topic: archiveData["topic"],
            type: userRole,
            ended: convertedDateTime ?? archiveData["date"],
            chatType: "archive",
          });
        }
      });

      setSnapshotDocs(querySnapshot);
      setGlobalArchiveChat(archiveList);
    }
  } catch (error) {
    console.log(error);
  }
};

export const endActiveChat = async ({
  chatId,
  seekerId,
  seekerName,
  listenerId,
  listenerName,
  topic,
}: {
  chatId: string;
  seekerId: string;
  seekerName: string;
  listenerId: string;
  listenerName: string;
  topic: string;
}) => {
  try {
    const batch = writeBatch(db);
    const chatRef = doc(db, CHATS, chatId);
    const seekerArchiveRef = doc(db, USERS, seekerId, ARCHIVE, chatId);
    const listenerArchiveRef = doc(db, USERS, listenerId, ARCHIVE, chatId);
    const timestamp = Timestamp.now();
    const date = moment().format("DD/MM/YYYY");

    batch.set(
      chatRef,
      {
        isClosedByListener: true,
        isClosedBySeeker: true,
      },
      { merge: true }
    );

    batch.set(seekerArchiveRef, {
      chatId,
      date,
      listenerId,
      listenerName,
      timestamp,
      topic,
      type: "seeker",
    });

    batch.set(listenerArchiveRef, {
      chatId,
      date,
      listenerId: seekerId,
      listenerName: seekerName,
      timestamp,
      topic,
      type: "listener",
    });

    await batch.commit();

    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const endDedicatedChat = async ({
  chatId,
  seekerId,
  seekerName,
  listenerId,
  listenerName,
  topic,
}: {
  chatId: string;
  seekerId: string;
  seekerName: string;
  listenerId: string;
  listenerName: string;
  topic: string;
}) => {
  try {
    const batch = writeBatch(db);
    const chatRef = doc(db, CHATS, chatId);
    const seekerArchiveRef = doc(db, USERS, seekerId, ARCHIVE, chatId);
    const listenerArchiveRef = doc(db, USERS, listenerId, ARCHIVE, chatId);
    const seekerDedicatedRef = doc(db, USERS, seekerId, DEDICATED_CHAT, chatId);
    const listenerDedicatedRef = doc(
      db,
      USERS,
      listenerId,
      DEDICATED_CHAT,
      chatId
    );
    const timestamp = Timestamp.now();
    const date = moment().format("DD/MM/YYYY");

    batch.set(
      chatRef,
      {
        isClosedByListener: true,
        isClosedBySeeker: true,
      },
      {
        merge: true,
      }
    );

    batch.set(seekerArchiveRef, {
      chatId,
      date,
      listenerId,
      listenerName,
      timestamp,
      topic,
      type: "seeker",
    });

    batch.set(listenerArchiveRef, {
      chatId,
      date,
      listenerId: seekerId,
      listenerName: seekerName,
      timestamp,
      topic,
      type: "listener",
    });

    batch.delete(seekerDedicatedRef);
    batch.delete(listenerDedicatedRef);

    await batch.commit();

    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const notifyUser = async (
  chatId: string,
  notificationTitle: any,
  notificationText: any
) => {
  try {
    const missedChatRequestsRef = doc(db, MISSED_CHAT_REQUESTS, chatId);

    await setDoc(
      missedChatRequestsRef,
      {
        notification: {
          title: notificationTitle,
          description: notificationText,
        },
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
