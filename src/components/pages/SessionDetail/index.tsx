import React, { useState, useEffect } from "react";
import { Table, Tabs, Input } from "antd";
import { useLocation } from "react-router-dom";

import SideBar from "../../common/SideBar";
import { memberListColumns, therapistColumn } from "../../../constants/column";
import { setSessionUrl } from "../../../services/session";
import { getTherapistData, getUserData } from "../../../services/user";
import { isValidUrl } from "../../../utils/helper";

const { TextArea } = Input;

type SmallInfoCardType = {
  header: string;
  value: string;
};

const SmallInfoCard: React.FC<SmallInfoCardType> = ({ header, value }) => {
  return (
    <div className="my-5">
      <p className="text-xl font-bold">{header}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
};

const SessionDetail = () => {
  const { TabPane } = Tabs;
  const TabArray = ["Sessions", "Session request", "Session update "];
  const TabArrayDetail = ["Chat", "Prescription", "Invoice "];
  const [viewIndex, setViewIndex] = useState(0);
  const [seekerData, setSeekerData] = useState<any[]>([]);
  const [therapistData, setTherapistData] = useState<any[]>([]);
  const [linkText, setLinkText] = useState("");
  const { state } = useLocation();
  const {
    sessionId,
    seekerId,
    therapist,
    payment,
    paidTime,
    bookedAt,
    email,
    reasonForBooking,
    preferredAge,
    preferredLanguage,
  } = state.detail;

  useEffect(() => {
    getUserData(setSeekerData, seekerId, "seeker");
    getTherapistData(setTherapistData, therapist);
  }, [seekerId, therapist]);

  const innerOnChange = (key: number | any) => {
    switch (+key) {
      case 0:
        setViewIndex(0);
        break;
      case 1:
        setViewIndex(1);
        break;
      case 2:
        setViewIndex(2);
        break;
      default:
        break;
    }
  };

  const tabContent = (tabIndex: number) => {
    return (
      <div className="w-full px-10 py-12">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-medium">Session ID: {sessionId}</p>
          {tabIndex === 0 && (
            <div className="flex flex-row">
              <p className="text-xl font-medium whitespace-nowrap mr-4">
                Session Link :
              </p>
              <TextArea
                className="flex bg-light-grey1 px-2"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                autoSize
              />
              <button
                className="text-lg font-medium border-2 ml-4 px-2"
                onClick={async () => {
                  const urlValid = isValidUrl(linkText);
                  if (!urlValid) {
                    alert("Url is not valid.");
                    return;
                  }
                  await setSessionUrl(seekerId, sessionId, linkText);
                  alert("Url is updated.");
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="text-2xl font-bold self-start mb-6 mt-9"></p>
          <div className="w-full mb-11">
            <p className="text-2xl font-bold mb-2">Seeker</p>
            <Table
              className="w-full"
              dataSource={seekerData}
              columns={memberListColumns}
              pagination={false}
              showHeader={false}
            />
          </div>
          <div className="w-full mb-11">
            <p className="text-2xl font-bold mb-2">Therapist</p>
            <Table
              className="w-full"
              dataSource={therapistData}
              columns={therapistColumn}
              pagination={false}
              showHeader={false}
            />
            <div className="flex flex-row justify-between mt-8">
              <div>
                <SmallInfoCard header={"Email"} value={email} />
                <SmallInfoCard header={"Reason"} value={reasonForBooking} />
              </div>
              <div>
                <SmallInfoCard
                  header={"Preferred Age"}
                  value={preferredAge || "-"}
                />
                <SmallInfoCard
                  header={"Preferred Language"}
                  value={preferredLanguage || "-"}
                />
              </div>
              <div>
                <SmallInfoCard header={"Booked at"} value={bookedAt} />
              </div>
            </div>
          </div>
          {tabIndex === 0 && (
            <Tabs
              defaultActiveKey="0"
              onChange={innerOnChange}
              className="w-full"
            >
              {TabArrayDetail.map((item, index: number) => (
                <TabPane tab={item} key={index}>
                  {tabDetails(index)}
                </TabPane>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    );
  };

  const tabDetails = (tableSource: any) => {
    return (
      <div className="w-full py-5">
        {viewIndex === 1 && (
          <div className="flex flex-row items-center">
            <p className="text-2xl font-medium bg-light-grey1 text-center h-64 w-64 ">
              Prescription Image
            </p>
            <div className="flex flex-row h-10 w-30 mx-20 ">
              <button
                className="text-lg font-medium border-2 p-1 "
                onClick={() => {
                  console.log("Add image");
                }}
              >
                + Add image
              </button>
            </div>
          </div>
        )}
        {viewIndex === 2 && (
          <div className="flex flex-row justify-between">
            <div>
              <SmallInfoCard header={"Paid At"} value={paidTime} />
              <SmallInfoCard header={"Order ID"} value={payment?.orderId} />
            </div>
            <div>
              <SmallInfoCard
                header={"Payment ID"}
                value={payment?.razorpay_payment_id}
              />
              <SmallInfoCard header={"Price"} value={payment?.price} />
            </div>
            <div>
              <SmallInfoCard header={"Amount"} value={payment?.toPay} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Sessions"} />
      </div>
      <div className="w-full flex flex-col items-center mx-6 mt-16">
        <Tabs defaultActiveKey="0" className="w-full">
          {TabArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {tabContent(index)}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SessionDetail;
