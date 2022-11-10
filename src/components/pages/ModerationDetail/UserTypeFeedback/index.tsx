import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserData } from "../../../../services/user";

import SideBar from "../../../common/SideBar";
import TableRow from "../../../common/TableRow";

type userType = {
  key: any;
  name: string;
  photo: string;
  age: number;
  gender: string;
  profileType: string;
};

const UserTypeFeedback = () => {
  const { state } = useLocation();
  const {
    feedbackId,
    userId,
    otherUserId,
    chatId,
    experience,
    timestamp,
    userType,
    rating = "",
    feeling = "",
  } = state;
  const [userData, setUserData] = useState<userType[]>();
  const [otherUserData, setOtherUserData] = useState<userType[]>();
  const otherUserType = userType === "Listener" ? "seeker" : "listener";

  useEffect(() => {
    getUserData(setUserData, userId, userType.toLowerCase());
    getUserData(setOtherUserData, otherUserId, otherUserType);
  }, [userId, otherUserId, chatId, userType]);

  const renderTableData = (
    otherUserData: userType[] | undefined,
    userData: userType[] | undefined
  ) => {
    return (
      <div>
        <div>
          <p className="text-3xl font-bold font-medium">Seeker</p>
          <TableRow
            name={otherUserData?.[0]?.name}
            age={otherUserData?.[0]?.age}
            gender={otherUserData?.[0]?.gender}
            image={otherUserData?.[0]?.photo}
            userId={otherUserData?.[0]?.key}
            userType={"seeker"}
          />
        </div>
        <div>
          <p className="text-3xl font-bold font-medium">Listener</p>
          <TableRow
            name={userData?.[0]?.name}
            age={userData?.[0]?.age}
            gender={userData?.[0]?.gender}
            image={userData?.[0]?.photo}
            userId={userData?.[0]?.key}
            userType={"listener"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Moderation"} />
      </div>
      <div className="w-full px-10 py-12">
        <p className="text-4xl font-bold font-medium">{userType} feedback</p>
        <p className="text-2xl font-bold font-medium my-4">
          Feedback ID: {feedbackId}
        </p>
        {userType === "Listener"
          ? renderTableData(otherUserData, userData)
          : renderTableData(userData, otherUserData)}
        {feeling !== "" && rating !== "" && (
          <div className="w-[50%] flex flex-row justify-between items-center my-8">
            <div>
              <p className="text-2xl font-bold font-medium">Feeling</p>
              <p className="text-lg my-4">{feeling}</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-medium">Rating</p>
              <p className="text-lg my-4">{rating}</p>
            </div>
          </div>
        )}
        <div>
          <p className="text-2xl font-bold font-medium">Experience</p>
          <p className="my-5">
            <span className="text-lg">({timestamp}) </span>
            <span className="text-lg">{experience}</span>
          </p>
        </div>
        <p className="text-2xl font-bold self-start mb-6">
          View chat:{" "}
          <Link
            className="text-2xl underline font-bold text-black"
            to={`/chatdetail/${chatId}`}
            state={{
              detail: {
                chatId: chatId,
                userId: userType === "Listener" ? otherUserId : userId,
                otherUserId: userType === "Listener" ? userId : otherUserId,
                report: false,
              },
            }}
          >
            {chatId}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserTypeFeedback;
