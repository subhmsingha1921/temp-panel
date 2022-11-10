import React, { useState, useEffect } from "react";
import { Table, Tabs } from "antd";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

import SideBar from "../../common/SideBar";
import {
  chatColumns,
  globalArchiveChatColumns,
} from "../../../constants/column";
import {
  getActiveChats,
  getDedicatedChats,
  getGlobalArchiveChats,
} from "../../../services/chat";
import PaginateButton from "../../common/PaginateButton";

const Chat = () => {
  const { TabPane } = Tabs;
  const TabArray = ["Active Chats", "Active Dedicated Chats", "Archive Chats"];
  const [activeChat, setActiveChat] = useState<any[]>([]);
  const [dedicatedChat, setDedicatedChat] = useState<any[]>([]);
  const [globalArchiveChat, setGlobalArchiveChat] = useState<any[]>([]);
  const [activeSnapshotDocs, setActiveSnapshotDocs] = useState<any[]>([]);
  const [dedicatedSnapshotDocs, setDedicatedSnapshotDocs] = useState<any[]>([]);
  const [archiveSnapshotDocs, setArchiveSnapshotDocs] =
    useState<QuerySnapshot<DocumentData>>();
  const currentPageActiveList = activeChat.slice(-10);
  const currentPageDedicatedList = dedicatedChat.slice(-10);

  useEffect(() => {
    getActiveChats(
      activeChat,
      setActiveChat,
      activeSnapshotDocs,
      setActiveSnapshotDocs
    );
    getDedicatedChats(
      dedicatedChat,
      setDedicatedChat,
      dedicatedSnapshotDocs,
      setDedicatedSnapshotDocs
    );
    getGlobalArchiveChats(
      setGlobalArchiveChat,
      archiveSnapshotDocs,
      setArchiveSnapshotDocs
    );
  }, []);

  const getDataSource = (index: number) => {
    if (index === 0) {
      return currentPageActiveList;
    }
    if (index === 1) {
      return currentPageDedicatedList;
    }
    return globalArchiveChat;
  };

  const handlePrevious = (index: number) => {
    let currentTabList = activeChat;
    let snapshotDocs = activeSnapshotDocs;
    if (index === 1) {
      currentTabList = dedicatedChat;
      snapshotDocs = dedicatedSnapshotDocs;
    }
    if (index === 2) {
      getGlobalArchiveChats(
        setGlobalArchiveChat,
        archiveSnapshotDocs,
        setArchiveSnapshotDocs,
        "previous"
      );
      return;
    }

    if (currentTabList.length <= 10) {
      return;
    }

    const updatedTabList = currentTabList.slice(0, -10);
    const updatedSnapshotDocs = snapshotDocs.slice(0, -10);
    if (index === 0) {
      setActiveSnapshotDocs(updatedSnapshotDocs);
      setActiveChat(updatedTabList);
      return;
    }
    setDedicatedSnapshotDocs(updatedSnapshotDocs);
    setDedicatedChat(updatedTabList);
  };

  const handleNext = (index: number) => {
    if (index === 0) {
      getActiveChats(
        activeChat,
        setActiveChat,
        activeSnapshotDocs,
        setActiveSnapshotDocs,
        "next"
      );
      return;
    }
    if (index === 1) {
      getDedicatedChats(
        dedicatedChat,
        setDedicatedChat,
        dedicatedSnapshotDocs,
        setDedicatedSnapshotDocs,
        "next"
      );
      return;
    }
    getGlobalArchiveChats(
      setGlobalArchiveChat,
      archiveSnapshotDocs,
      setArchiveSnapshotDocs,
      "next"
    );
  };

  const tabContent = (index: number) => {
    return (
      <Table
        className="w-full"
        dataSource={getDataSource(index)}
        columns={index === 2 ? globalArchiveChatColumns : chatColumns}
        showHeader={true}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        }}
      />
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Chats"} />
      </div>
      <div className="w-full flex flex-col items-center mx-6 mt-16">
        <Tabs defaultActiveKey="0" className="w-full">
          {TabArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {tabContent(index)}
              <PaginateButton
                handlePrevious={() => handlePrevious(index)}
                handleNext={() => handleNext(index)}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Chat;
