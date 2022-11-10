import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

import SideBar from "../../common/SideBar";
import {
  chatRequestColumn,
  missedChatRequestColumn,
} from "../../../constants/column";
import { getChatRequests, getMissedChatRequests } from "../../../services/chat";
import PaginateButton from "../../common/PaginateButton";

const ChatRequest = () => {
  const { TabPane } = Tabs;
  const TabArray = ["Active requests", "Missed requests"];
  const [chatRequests, setChatRequests] = useState<any[]>([]);
  const [missedChatRequests, setMissedChatRequests] = useState<any[]>([]);
  const [missedChatRequestsSnapshotDocs, setMissedChatRequestsSnapshotDocs] =
    useState<QuerySnapshot<DocumentData>>();
  const [tableSource, setTableSource] = useState<any[]>();
  const [column, setColumn] = useState<any[]>(chatRequestColumn);
  const [tableIndex, setTableIndex] = useState(0);

  useEffect(() => {
    getChatRequests(setChatRequests);
    getMissedChatRequests(
      setMissedChatRequests,
      missedChatRequestsSnapshotDocs,
      setMissedChatRequestsSnapshotDocs,
      ""
    );
  }, []);

  const onPaginate = (type: string) => {
    if (tableIndex !== 0) {
      getMissedChatRequests(
        setMissedChatRequests,
        missedChatRequestsSnapshotDocs,
        setMissedChatRequestsSnapshotDocs,
        type,
        setTableSource
      );
    }
  };

  const onChange = (key: string) => {
    switch (+key) {
      case 0:
        setColumn(chatRequestColumn);
        setTableSource(chatRequests);
        setTableIndex(0);
        break;
      case 1:
        setColumn(missedChatRequestColumn);
        setTableSource(missedChatRequests);
        setTableIndex(1);
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
        pagination={tableIndex !== 0 ? false : undefined}
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
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Chat requests"} />
      </div>
      <div className="w-full flex flex-col items-center mx-6 mt-16">
        <Tabs defaultActiveKey="0" onChange={onChange} className="w-full">
          {TabArray.map((item, index) => (
            <TabPane tab={item} key={index}>
              {tabContent(tableSource ?? chatRequests)}
              {tableIndex !== 0 && (
                <PaginateButton
                  handlePrevious={() => onPaginate("previous")}
                  handleNext={() => onPaginate("next")}
                />
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ChatRequest;
