import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useLocation, Link } from "react-router-dom";

import SideBar from "../../common/SideBar";
import { memberListColumns } from "../../../constants/column";
import { getUserData } from "../../../services/user";
import {
  endActiveChat,
  endDedicatedChat,
  getChatMessages,
} from "../../../services/chat";
import { getSenderName } from "../../../utils/helper";

function ChatDetail() {
  const { state } = useLocation();
  const [userData, setUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const {
    chatId,
    userId,
    otherUserId,
    report,
    reason,
    review,
    request,
    chatType,
    topic,
  } = state.detail;

  useEffect(() => {
    getUserData(setUserData, userId, "seeker");
    getUserData(setOtherUserData, otherUserId, "listener");
    getChatMessages(setChatMessages, chatId);
  }, [chatId, userId, otherUserId]);

  const getHeader = () => {
    if (report) {
      return "Reports";
    }
    return "Reviews";
  };

  const getReasonHeader = () => {
    if (report) {
      return "Reason for reporting";
    }
    return "Experience";
  };

  const handleEndChat = async () => {
    if (chatType === "active") {
      const response = await endActiveChat({
        chatId,
        seekerId: userId,
        seekerName: userData[0]?.name,
        listenerId: otherUserId,
        listenerName: otherUserData[0]?.name,
        topic,
      });
      if (response === "success") {
        alert("This active chat has been ended.");
      }
      return;
    }

    if (chatType === "dedicated") {
      const response = await endDedicatedChat({
        chatId,
        seekerId: userId,
        seekerName: userData[0]?.name,
        listenerId: otherUserId,
        listenerName: otherUserData[0]?.name,
        topic,
      });
      if (response === "success") {
        alert("This dedicated chat has been ended.");
      }
    }
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Chats"} />
      </div>
      <div className="w-full px-10 py-12">
        <div className="flex flex-row justify-between">
          <p className="text-4xl font-bold font-medium mb-10">
            {report || review ? getHeader() : "View Chats"}
          </p>

          {!report && !review && chatType !== "archive" && (
            <button
              className="text-lg text-primaryRed font-medium"
              onClick={handleEndChat}
            >
              END CHAT
            </button>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          {!report && !review && (
            <p className="text-2xl font-bold self-start mb-6">
              Chat ID: {chatId}
            </p>
          )}
          <div className="w-full mb-11">
            <p className="text-2xl font-bold mb-2">Seeker</p>
            <Table
              className="w-full"
              dataSource={userData}
              columns={memberListColumns}
              pagination={false}
              showHeader={false}
            />
          </div>
          <div className="w-full mb-11">
            <p className="text-2xl font-bold mb-2">Listener</p>
            <Table
              className="w-full"
              dataSource={otherUserData}
              columns={memberListColumns}
              pagination={false}
              showHeader={false}
            />
          </div>
          {(report || review) && (
            <div className="w-full mb-8">
              <p className="text-2xl font-bold mb-8">{getReasonHeader()}</p>
              {reason}
            </div>
          )}
          {!report && !review && (
            <div className="w-full mb-8">
              <p className="text-2xl font-bold mb-8">Chat</p>
              {chatMessages?.map((message) => (
                <div key={message?.messageId} className="flex flex-row">
                  <div className="flex flex-row">
                    <p className="text-2xl">({message?.createdAt})</p>
                    <p className="text-2xl font-bold mx-2">
                      {getSenderName(
                        message?.user?._id,
                        userId,
                        userData,
                        otherUserData
                      )}
                      :
                    </p>
                  </div>
                  <p className="text-2xl w-[60%]">{message?.text}</p>
                </div>
              ))}
            </div>
          )}
          {(report || review) && !request && (
            <p className="text-2xl font-bold self-start mb-6">
              View chat:{" "}
              <Link
                className="text-2xl underline font-bold text-black"
                to={`/chatdetail/${chatId}`}
                state={{
                  detail: {
                    chatId: chatId,
                    userId: userId,
                    otherUserId: otherUserId,
                    report: false,
                  },
                }}
              >
                {chatId}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;
