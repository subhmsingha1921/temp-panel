import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const AppFeedback = () => {
  const { state } = useLocation();
  const { type, id, userId, userName, message, timestamp } = state;
  const [userData, setUserData] = useState<userType[]>();

  useEffect(() => {
    getUserData(setUserData, userId, "seeker");
  }, [userId]);

  const getHeaderName = () => {
    if (type === "appfeedback") return "App feedback";
    return "Matching Exit feedback";
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Moderation"} />
      </div>
      <div className="w-full px-10 py-12">
        <p className="text-4xl font-bold font-medium">{getHeaderName()}</p>
        <p className="text-2xl font-bold font-medium my-4">Feedback ID: {id}</p>
        <div>
          <p className="text-3xl font-bold font-medium">{userName}</p>
          <TableRow
            name={userData?.[0]?.name}
            age={userData?.[0]?.age}
            gender={userData?.[0]?.gender}
            image={userData?.[0]?.photo}
            userId={userId}
            userType={type === "appfeedback" ? "" : "seeker"}
          />
        </div>
        <div>
          <p className="text-2xl font-bold font-medium my-5">
            {type === "appfeedback" ? "App feedback Experience" : "Reason"}
          </p>
          <p className="text-lg mt-5">{timestamp}</p>
          <p>
            <span className="text-2xl font-bold font-medium">
              {type === "appfeedback" ? "Experience" : "Reason"}:{" "}
            </span>
            <span className="text-lg">{message}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppFeedback;
