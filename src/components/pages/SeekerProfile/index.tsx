import React, { useState, useEffect } from "react";
import { Table, Tabs } from "antd";
import { useLocation } from "react-router-dom";

import SideBar from "../../common/SideBar";
import InfoCard from "../../common/InfoCard";
import {
  seekersChatColumn,
  seekersReportColumn,
  seekerSessionColumn,
  sessionCreditsColumn,
  sessionRequestsColumns,
  sessionUpdatesColumns,
} from "../../../constants/column";
import {
  getUserProfileInfo,
  getUserActiveChats,
  getUserDedicatedChats,
  getUserArchiveChats,
  getSeekerReports,
  fetchUserSessionDefaults,
  fetchUserSessions,
  getSeekerSessionCredits,
  fetchUserSessionsRequests,
  fetchUserSessionsUpdates,
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

type concernType = string;

const SeekerProfile = () => {
  const { state } = useLocation();
  const { TabPane } = Tabs;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<currentUserType>();
  const [activeChat, setActiveChat] = useState<any[]>([]);
  const [dedicatedChat, setDedicatedChat] = useState<any[]>([]);
  const [archiveChatList, setArchiveChatList] = useState<any[]>([]);
  const [seekerReports, setSeekerReports] = useState<any[]>([]);
  const [dedicatedSnapshotDocs, setDedicatedSnapshotDocs] = useState<any[]>([]);
  const [archiveSnapshotDocs, setArchiveSnapshotDocs] = useState<any[]>([]);
  const [sessionDefaults, setSessionDefaults] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionRequests, setSessionRequests] = useState<any[]>([]);
  const [sessionUpdates, setSessionUpdates] = useState<any[]>([]);
  const [sessionCredit, setSessionCredit] = useState<any[]>([]);
  const concernsList: object = sessionDefaults[0]?.concerns ?? {};
  const concernValues: concernType[] = Object.values(concernsList)[0];

  const TabArray = [
    "Active Chat",
    "Dedicated Chat",
    "Archive",
    "Reports",
    "Sessions",
    "Session Requests",
    "Session Updates",
    "SessionCredits",
  ];

  const userId = state.userId;

  useEffect(() => {
    getUserProfileInfo(setCurrentUser, userId);
    getUserActiveChats(setActiveChat, userId);
    getUserDedicatedChats(
      dedicatedChat,
      setDedicatedChat,
      userId,
      "seeker",
      dedicatedSnapshotDocs,
      setDedicatedSnapshotDocs
    );
    getUserArchiveChats(
      archiveChatList,
      setArchiveChatList,
      userId,
      "seeker",
      archiveSnapshotDocs,
      setArchiveSnapshotDocs
    );
    getSeekerReports(setSeekerReports, userId);
    fetchUserSessionDefaults(setSessionDefaults, userId);
    fetchUserSessions(setSessions, userId);
    getSeekerSessionCredits(setSessionCredit, userId);
    fetchUserSessionsRequests(setSessionRequests, userId);
    fetchUserSessionsUpdates(setSessionUpdates, userId);
    checkAccountDisabled(userId, setIsDisabled);
  }, [userId]);

  const handlePrevious = (index: number) => {
    let currentTabList = index === 1 ? dedicatedChat : archiveChatList;
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
    setArchiveChatList(updatedTabList);
  };

  const handleNext = (index: number) => {
    if (index === 1) {
      getUserDedicatedChats(
        dedicatedChat,
        setDedicatedChat,
        userId,
        "seeker",
        dedicatedSnapshotDocs,
        setDedicatedSnapshotDocs,
        "next"
      );
      return;
    }
    getUserArchiveChats(
      archiveChatList,
      setArchiveChatList,
      userId,
      "seeker",
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
    const firstPage = archiveChatList.slice(0, 10);
    const firstSnapshot = archiveSnapshotDocs.slice(0, 10);
    setArchiveChatList(firstPage);
    setArchiveSnapshotDocs(firstSnapshot);
  };

  const onChange = (key: number): any => {
    switch (key) {
      case 0:
        return {
          currentTableSource: activeChat,
          currentColumn: seekersChatColumn,
        };
      case 1:
        return {
          currentTableSource: dedicatedChat.slice(-10),
          currentColumn: seekersChatColumn,
        };
      case 2:
        return {
          currentTableSource: archiveChatList.slice(-10),
          currentColumn: seekersChatColumn,
        };
      case 3:
        return {
          currentTableSource: seekerReports,
          currentColumn: seekersReportColumn,
        };
      case 4:
        return {
          currentTableSource: sessions,
          currentColumn: seekerSessionColumn,
        };
      case 5:
        return {
          currentTableSource: sessionRequests,
          currentColumn: sessionRequestsColumns,
        };
      case 6:
        return {
          currentTableSource: sessionUpdates,
          currentColumn: sessionUpdatesColumns,
        };
      case 7:
        return {
          currentTableSource: sessionCredit,
          currentColumn: sessionCreditsColumn,
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
    const { currentTableSource, currentColumn } = onChange(index);
    return (
      <Table
        className="w-full"
        dataSource={currentTableSource}
        columns={currentColumn}
        pagination={showPagination(index)}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              // console.log(record);
            },
          };
        }}
      />
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className=" w-[20%] bg-primary1">
        <SideBar active={"Seekers"} />
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
        <div className="flex flex-row justify-between my-3">
          <div className="w-[40%] pr-10">
            <InfoCard header={"Age"} subText={currentUser?.age} />
            <InfoCard header={"Email"} subText={currentUser?.email} />
            <div className="my-3">
              <p className="text-2xl font-bold">Concerns</p>
              {concernValues?.length ? (
                <p className="text-lg">{concernValues.join(" , ")}</p>
              ) : (
                <p className="text-lg">N/A</p>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold underline my-4">
                Therapy History
              </p>
              <InfoCard
                header={"Therapy"}
                subText={sessionDefaults[0]?.therapyHistory?.therapy || "N/A"}
              />
            </div>
          </div>
          <div className="w-[30%] pr-10">
            <InfoCard header={"Gender"} subText={currentUser?.gender || "-"} />
            <InfoCard
              header={"Emergency Contact"}
              subText={currentUser?.contact || "-"}
            />
            <InfoCard
              header={"Preferred age"}
              subText={sessionDefaults[0]?.preferredAge || "N/A"}
            />
            <div>
              <p className="text-2xl font-bold underline my-4">
                Under Medication
              </p>
              <InfoCard
                header={"Medication"}
                subText={
                  sessionDefaults[0]?.underMedication?.medication || "N/A"
                }
              />
            </div>
          </div>
          <div className="w-[30%]">
            <InfoCard header={"Phone"} subText={currentUser?.phone} />
            <InfoCard header={"Bio"} subText={currentUser?.bio} />
            <InfoCard
              header={"Preferred language"}
              subText={sessionDefaults[0]?.preferredLanguage || "N/A"}
            />
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

export default SeekerProfile;
