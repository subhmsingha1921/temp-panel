import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";

import SideBar from "../../common/SideBar";
import PaginateButton from "../../common/PaginateButton";
import {
  appFeebackColumn,
  matchingFeedbackColumn,
  listenerFeedbackColumn,
  seekerFeedbackColumn,
  moderationListenerReportColumn,
  moderationSeekerReportColumn,
} from "../../../constants/column";
import {
  getAppFeedbacks,
  getListenerFeedback,
  getMatchingExitFeedback,
  getSeekerFeedback,
} from "../../../services/feedback";
import { getListenerReports, getSeekerReports } from "../../../services/report";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

const Moderation = () => {
  const { TabPane } = Tabs;
  const TabOuterArray = ["Feedbacks", "Reports"];
  const TabInnerArray = [
    "App Feedback",
    "Matching Exit Feedback",
    "Listener Feedback",
    "Seeker Feedback",
  ];
  const TabReportArray = ["Listener Reports", "Seeker Reports"];
  const [tableSource, setTableSource] = useState<any[]>();
  const [column, setColumn] = useState(appFeebackColumn);
  const [appFeedbacks, setAppFeedbacks] = useState<any[]>([]);
  const [matchingExitFeedback, setMatchingExitFeedback] = useState<any[]>([]);
  const [listenerFeedback, setListenerFeedback] = useState<any[]>([]);
  const [seekerFeedback, setSeekerFeedback] = useState<any[]>([]);
  const [listenerReports, setListenerReports] = useState<any[]>([]);
  const [seekerReports, setSeekerReports] = useState<any[]>([]);
  const [feedbackActiveKey, setFeedbackActiveKey] = useState<any>();
  const [reportActiveKey, setReportActiveKey] = useState<any>("0");
  const [currentTableData, setCurrentTableData] =
    useState<string>("appfeedback");
  const [currentAppFeedbackData, setCurrentAppFeedbackData] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentMatchingExitFeedbackData, setCurrentMatchingExitFeedbackData] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentListenerFeedbackData, setCurrentListenerFeedbackData] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentSeekerFeedbackData, setCurrentSeekerFeedbackData] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentListenerReports, setCurrentListenerReports] =
    useState<QuerySnapshot<DocumentData>>();
  const [currentSeekerReports, setCurrentSeekerReports] =
    useState<QuerySnapshot<DocumentData>>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    await getAppFeedbacks(
      setAppFeedbacks,
      "",
      currentAppFeedbackData,
      setCurrentAppFeedbackData
    );
    await getMatchingExitFeedback(
      setMatchingExitFeedback,
      "",
      currentMatchingExitFeedbackData,
      setCurrentMatchingExitFeedbackData
    );
    await getListenerFeedback(
      setListenerFeedback,
      "",
      currentListenerFeedbackData,
      setCurrentListenerFeedbackData
    );
    await getSeekerFeedback(
      setSeekerFeedback,
      "",
      currentSeekerFeedbackData,
      setCurrentSeekerFeedbackData
    );
    await getListenerReports(
      setListenerReports,
      "",
      currentListenerReports,
      setCurrentListenerReports
    );
    await getSeekerReports(
      setSeekerReports,
      "",
      currentSeekerReports,
      setCurrentSeekerReports
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeFeedback = (key: any) => {
    switch (+key) {
      case 0:
        setColumn(appFeebackColumn);
        setTableSource(appFeedbacks);
        setCurrentTableData("appfeedback");
        setFeedbackActiveKey("0");

        break;
      case 1:
        setColumn(matchingFeedbackColumn);
        setTableSource(matchingExitFeedback);
        setCurrentTableData("matchingexitfeedback");
        setFeedbackActiveKey("1");

        break;
      case 2:
        setColumn(listenerFeedbackColumn);
        setTableSource(listenerFeedback);
        setCurrentTableData("listenerfeedback");
        setFeedbackActiveKey("2");

        break;
      case 3:
        setColumn(seekerFeedbackColumn);
        setTableSource(seekerFeedback);
        setCurrentTableData("seekerfeedback");
        setFeedbackActiveKey("3");

        break;

      default:
        break;
    }
  };

  const onChangeReports = (key: any) => {
    switch (+key) {
      case 0:
        setColumn(moderationListenerReportColumn);
        setTableSource(listenerReports);
        setCurrentTableData("listenerreports");
        setReportActiveKey("0");
        break;
      case 1:
        setColumn(moderationSeekerReportColumn);
        setTableSource(seekerReports);
        setCurrentTableData("seekerreports");
        setReportActiveKey("1");
        break;
      default:
        break;
    }
  };

  const onChange = (key: any) => {
    switch (+key) {
      case 0:
        setCurrentTableData("appfeedback");
        onChangeFeedback(feedbackActiveKey);
        break;
      case 1:
        setCurrentTableData("listenerreports");
        onChangeReports(reportActiveKey);
        break;

      default:
        break;
    }
  };

  const onPaginate = async (type: string) => {
    switch (currentTableData) {
      case "appfeedback":
        getAppFeedbacks(
          setAppFeedbacks,
          type,
          currentAppFeedbackData,
          setCurrentAppFeedbackData
        );
        break;
      case "matchingexitfeedback":
        getMatchingExitFeedback(
          setMatchingExitFeedback,
          type,
          currentMatchingExitFeedbackData,
          setCurrentMatchingExitFeedbackData,
          setTableSource
        );
        break;
      case "listenerfeedback":
        getListenerFeedback(
          setListenerFeedback,
          type,
          currentListenerFeedbackData,
          setCurrentListenerFeedbackData,
          setTableSource
        );
        break;
      case "seekerfeedback":
        getSeekerFeedback(
          setSeekerFeedback,
          type,
          currentSeekerFeedbackData,
          setCurrentSeekerFeedbackData,
          setTableSource
        );
        break;
      case "listenerreports":
        getListenerReports(
          setListenerReports,
          type,
          currentListenerReports,
          setCurrentListenerReports,
          setTableSource
        );
        break;
      case "seekerreports":
        getSeekerReports(
          setSeekerReports,
          type,
          currentSeekerReports,
          setCurrentSeekerReports,
          setTableSource
        );
        break;
      default:
        break;
    }
  };

  const tabContent = (dataSource: any[]) => {
    return (
      <Table
        className="w-full"
        dataSource={dataSource}
        columns={column}
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

  const renderInnerTab = (outerTabItem: string) => {
    if (outerTabItem === "Feedbacks") {
      return (
        <Tabs
          defaultActiveKey="0"
          onChange={onChangeFeedback}
          className="w-full"
        >
          {TabInnerArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {tabContent(tableSource ?? appFeedbacks)}
            </TabPane>
          ))}
        </Tabs>
      );
    }

    return (
      <Tabs defaultActiveKey="0" onChange={onChangeReports} className="w-full">
        {TabReportArray.map((item, index) => (
          <TabPane tab={item} key={index}>
            {tabContent(tableSource ?? listenerReports)}
          </TabPane>
        ))}
      </Tabs>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Moderation"} />
      </div>
      <div className="w-full flex flex-col items-center mx-6 mt-16">
        <button
          className="bg-primary1 text-white px-6 py-2 rounded-md"
          onClick={async () => {
            setLoading(true);
            await getData();
            setLoading(false);
            onPaginate("");
          }}
        >
          {loading ? "Refreshing" : "Refresh"}
        </button>
        <Tabs defaultActiveKey="0" className="w-full" onChange={onChange}>
          {TabOuterArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {renderInnerTab(item)}
            </TabPane>
          ))}
        </Tabs>
        <PaginateButton
          handlePrevious={() => onPaginate("previous")}
          handleNext={() => onPaginate("next")}
        />
      </div>
    </div>
  );
};

export default Moderation;
