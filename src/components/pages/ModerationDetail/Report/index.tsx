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

const Report = () => {
  const { state } = useLocation();
  const {
    reportId,
    userType,
    chatId,
    userId,
    otherUserId,
    report,
    requestReported,
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
        <p className="text-4xl font-bold font-medium">{userType} Reports</p>
        <p className="text-2xl font-bold font-medium my-4">
          Report ID: {reportId}
        </p>
        {userType === "Listener"
          ? renderTableData(otherUserData, userData)
          : renderTableData(userData, otherUserData)}

        <div>
          <p className="text-2xl font-bold font-medium">Feeling</p>
          <p className="text-lg my-4">{report}</p>
        </div>
        {!requestReported && (
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
        )}
      </div>
    </div>
  );
};

export default Report;
