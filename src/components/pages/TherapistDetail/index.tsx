import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import InfoCard from "../../common/InfoCard";
import SideBar from "../../common/SideBar";

const TherapistDetail = () => {
  const { state } = useLocation();
  const { name, age, gender, photo, price, specialization, tagline, bio } =
    state.detail.therapistInfo;
  const [isDisabled, setIsDisabled] = useState<boolean>();

  return (
    <div className="flex flex-row w-full">
      <div className=" w-[20%] bg-primary1">
        <SideBar active={"Therapists"} />
      </div>
      <div className="w-full px-10 py-12">
        <div className="flex flex-row justify-between">
          <p className="text-4xl font-medium">{name}</p>
          <button
            className="text-lg text-primaryRed font-medium"
            // onClick={() => {
            //   const status = isDisabled ? false : true;
            //   banUser(userId, status);
            // }}
          >
            {isDisabled ? "UNBAN THERAPIST" : "BAN THERAPIST"}
          </button>
        </div>
        <div className="flex flex-row w-full my-8">
          <img src={photo} className="w-[330px] h-[330px]" alt="" />
          <div className="w-full mx-6">
            <div className="flex flex-row justify-between w-[90%] m-0 p-0">
              <InfoCard header={"Age"} subText={age} />
              <InfoCard header={"Gender"} subText={gender} />
              <InfoCard header={"Price"} subText={price} />
            </div>
            <div className="flex flex-row justify-between w-[86%] m-0 p-0">
              <InfoCard header={"Tagline"} subText={tagline} />
              <InfoCard
                header={"Specialization"}
                subText={specialization[0] || "N/A"}
              />
              <InfoCard header={"Bio"} subText={bio ?? "N/A"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetail;
