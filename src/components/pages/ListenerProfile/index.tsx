import React, { useState, useEffect } from "react";
import { Table, Tabs } from "antd";
import { useLocation } from "react-router-dom";

import SideBar from "../../common/SideBar";
import InfoCard from "../../common/InfoCard";
import {
  listenersChatColumn,
  listenersReportColumn,
  listenersReviewColumn,
} from "../../../constants/column";
import {
  getListenerProfileInfo,
  getUserActiveChats,
  getUserDedicatedChats,
  getUserArchiveChats,
  getListenerReviews,
  getListenerReports,
  checkAccountDisabled,
  banUser,
} from "../../../services/user";
import PaginateButton from "../../common/PaginateButton";

type currentUserType = {
  id: any;
  name: string;
  photo: string;
  age: number;
  contact: string;
  phone: string;
  bio: string;
  email: string;
  gender: string;
  location: string | any;
};

const ListenerProfile = () => {
  const { state } = useLocation();
  const { TabPane } = Tabs;
  const userId = state.userId;
  const [isDisabled, setIsDisabled] = useState();
  const [currentUser, setCurrentUser] = useState<currentUserType>();
  const [activeChat, setActiveChat] = useState<any[]>([]);
  const [dedicatedChat, setDedicatedChat] = useState<any[]>([]);
  const [archiveChat, setArchiveChat] = useState<any[]>([]);
  const [listenerReviews, setListenerReviews] = useState<any[]>([]);
  const [listenerReports, setListenerReports] = useState<any[]>([]);
  const [dedicatedSnapshotDocs, setDedicatedSnapshotDocs] = useState<any[]>([]);
  const [archiveSnapshotDocs, setArchiveSnapshotDocs] = useState<any[]>([]);

  const TabArray = [
    "Active Chat",
    "Dedicated Chat",
    "Archive",
    "Reports",
    "Reviews",
  ];

  useEffect(() => {
    getListenerProfileInfo(setCurrentUser, userId);
    getUserActiveChats(setActiveChat, userId, "listener");
    getUserDedicatedChats(
      dedicatedChat,
      setDedicatedChat,
      userId,
      "listener",
      dedicatedSnapshotDocs,
      setDedicatedSnapshotDocs
    );
    getUserArchiveChats(
      archiveChat,
      setArchiveChat,
      userId,
      "listener",
      archiveSnapshotDocs,
      setArchiveSnapshotDocs
    );
    getListenerReviews(setListenerReviews, userId);
    getListenerReports(setListenerReports, userId);
    checkAccountDisabled(userId, setIsDisabled);
  }, [userId]);

  const handlePrevious = (index: number) => {
    let currentTabList = index === 1 ? dedicatedChat : archiveChat;
    let snapshotDocs =
      index === 1 ? dedicatedSnapshotDocs : archiveSnapshotDocs;
    if (currentTabList.length <= 10) {
      return;
    }

    const updatedTabList = currentTabList.slice(0, -10);
    const updatedSnapshotDocs = snapshotDocs.slice(0, -10);
    if (index === 1) {
      setDedicatedSnapshotDocs(updatedSnapshotDocs);
      setDedicatedChat(updatedTabList);
      return;
    }
    setArchiveSnapshotDocs(updatedSnapshotDocs);
    setArchiveChat(updatedTabList);
  };

  const handleNext = (index: number) => {
    if (index === 1) {
      getUserDedicatedChats(
        dedicatedChat,
        setDedicatedChat,
        userId,
        "listener",
        dedicatedSnapshotDocs,
        setDedicatedSnapshotDocs,
        "next"
      );
      return;
    }
    getUserArchiveChats(
      archiveChat,
      setArchiveChat,
      userId,
      "listener",
      archiveSnapshotDocs,
      setArchiveSnapshotDocs,
      "next"
    );
  };

  const handleRefresh = (index: number) => {
    if (index === 1) {
      const firstPage = dedicatedChat.slice(0, 10);
      const firstSnapshot = dedicatedSnapshotDocs.slice(0, 10);
      setDedicatedChat(firstPage);
      setDedicatedSnapshotDocs(firstSnapshot);
      return;
    }
    const firstPage = archiveChat.slice(0, 10);
    const firstSnapshot = archiveSnapshotDocs.slice(0, 10);
    setArchiveChat(firstPage);
    setArchiveSnapshotDocs(firstSnapshot);
  };

  const onChange = (key: number) => {
    switch (key) {
      case 0:
        return {
          currentTableSource: activeChat,
          currentColumn: listenersChatColumn,
        };
      case 1:
        return {
          currentTableSource: dedicatedChat.slice(-10),
          currentColumn: listenersChatColumn,
        };
      case 2:
        return {
          currentTableSource: archiveChat.slice(-10),
          currentColumn: listenersChatColumn,
        };
      case 3:
        return {
          currentTableSource: listenerReports,
          currentColumn: listenersReportColumn,
          showHeader: true,
        };
      case 4:
        return {
          currentTableSource: listenerReviews,
          currentColumn: listenersReviewColumn,
          showHeader: true,
        };
      default:
        break;
    }
  };

  const getPaginationValue = (index: number) => {
    if (index === 1 || index === 2) {
      return false;
    }
    return true;
  };

  const showPagination = (index: number) => {
    if (index === 1 || index === 2) {
      return false;
    }
    return undefined;
  };

  const tabContent = (index: number) => {
    const {
      currentTableSource,
      currentColumn,
      showHeader = false,
    }: {
      currentTableSource: any[];
      currentColumn: any[];
      showHeader?: boolean;
    } = onChange(index);

    return (
      <Table
        className="w-full"
        dataSource={currentTableSource}
        columns={currentColumn}
        showHeader={showHeader}
        pagination={showPagination(index)}
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
      <div className=" w-[20%] bg-primary1">
        <SideBar active={"Listeners"} />
      </div>
      <div className="w-full px-10 py-12">
        <div className="flex flex-row justify-between">
          <p className="text-4xl font-medium">{currentUser?.name}</p>
          <button
            className="text-lg text-primaryRed font-medium"
            onClick={() => {
              const status = isDisabled ? false : true;
              banUser(userId, status);
            }}
          >
            {isDisabled ? "UNBAN USER" : "BAN USER"}
          </button>
        </div>
        <div className="flex flex-row w-full my-8">
          <img
            src={currentUser?.photo}
            className="w-[330px] h-[330px]"
            alt=""
          />
          <div className="w-full mx-6">
            <div className="flex flex-row justify-between w-[80%] m-0 p-0">
              <InfoCard header={"Age"} subText={currentUser?.age} />
              <InfoCard header={"Gender"} subText={currentUser?.gender} />
              <InfoCard header={"Phone #"} subText={currentUser?.phone} />
            </div>
            <div className="flex flex-row justify-between w-[40%] m-0 p-0">
              <InfoCard header={"Email"} subText={currentUser?.email} />
            </div>
            <InfoCard header={"Bio"} subText={currentUser?.bio} />

            <InfoCard
              header={"Emergency contact"}
              subText={currentUser?.contact}
            />
            <InfoCard header={"Location"} subText={currentUser?.location} />
          </div>
        </div>
        <Tabs defaultActiveKey="0">
          {TabArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {!getPaginationValue(index) && (
                <div className="w-full flex flex-row justify-end">
                  <button
                    onClick={() => handleRefresh(index)}
                    className="bg-primary1 text-white px-6 py-2 rounded-md mb-4"
                  >
                    <p>Refresh</p>
                  </button>
                </div>
              )}
              {tabContent(index)}
              {!getPaginationValue(index) && (
                <PaginateButton
                  handlePrevious={() => handlePrevious(index)}
                  handleNext={() => handleNext(index)}
                />
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ListenerProfile;
