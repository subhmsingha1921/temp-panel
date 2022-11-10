import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { useLocation } from "react-router-dom";

import SideBar from "../../common/SideBar";
import TableRow from "../../common/TableRow";
import { getUserData } from "../../../services/user";
import { notifyUser } from "../../../services/chat";

const { TextArea } = Input;

type userType = {
  key: any;
  name: string;
  photo: string;
  age: number;
  gender: string;
  profileType: string;
};

function MissedChatRequest() {
  const { state } = useLocation();
  const { key, seeker, seekerId, photo, topic, onMind, requestedTime } =
    state.record;
  const [notifyTitle, setNotifyTitle] = useState("");
  const [notifyText, setNotifyText] = useState("");

  const [userData, setUserData] = useState<userType[]>();

  useEffect(() => {
    getUserData(setUserData, seekerId, "seeker");
  }, [seekerId]);

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Chat requests"} />
      </div>
      <div className="w-full px-10 py-12">
        <p className="text-4xl font-bold font-medium">Missed Chat Requests</p>
        <div className="w-full flex flex-col items-center">
          <p className="text-2xl font-bold self-start mb-6 mt-9">
            {`Request ID:${key}`}
          </p>
          <div className="w-full mb-11">
            <p className="text-2xl font-bold mb-2">Seeker</p>
            <TableRow
              age={userData?.[0]?.age}
              gender={userData?.[0]?.gender}
              image={photo}
              name={userData?.[0]?.name}
              userId={seekerId}
              userType={"seeker"}
            />
          </div>
          <div className="w-full mb-8">
            <p className="text-2xl font-bold">Chat Requests Tab</p>
            {/* {chatMessages?.map((message) => (
        <div key={message?.messageId} className="flex flex-row">
          <p className="text-2xl">({message?.createdAt})</p>
          <p className="text-2xl font-bold mx-2">{message?.user?.name}:</p>
          <p className="text-2xl">{message?.text}</p>
        </div>
      ))} */}
          </div>
          <div className="w-full">
            <p className="text-xl">{`(${requestedTime})`}</p>
            <div className="flex flex-row my-2 items-start">
              <p className="text-2xl font-bold mb-8 mr-2">Topic: </p>
              <p className="text-2xl">{topic}</p>
            </div>
            <div className="flex flex-row my-2">
              <p className="text-2xl font-bold mb-8 mr-2">onMind: </p>
              <p className="text-2xl">{onMind}</p>
            </div>
          </div>
          <div className="w-full mb-8">
            <p className="text-2xl font-bold mb-8">Notify user</p>
            <div className="pr-60 mb-6">
              <TextArea
                value={notifyTitle}
                onChange={(e) => setNotifyTitle(e.target.value)}
                placeholder="Title for notification"
                maxLength={200}
                autoSize={{ minRows: 2, maxRows: 2 }}
              />
            </div>
            <div className="pr-60 mb-20">
              <TextArea
                value={notifyText}
                onChange={(e) => setNotifyText(e.target.value)}
                placeholder="Write something to notify user"
                autoSize={{ minRows: 4, maxRows: 5 }}
                maxLength={200}
              />
            </div>
            <div className="w-full flex flex-col">
              <button
                className="text-lg text-white font-medium bg-primary1 py-3 px-20 rounded-lg self-center"
                onClick={() => {
                  if (notifyText === "" || notifyTitle === "") return;
                  setNotifyTitle("");
                  setNotifyText("");
                  notifyUser(key, notifyTitle, notifyText);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissedChatRequest;
