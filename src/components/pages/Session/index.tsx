import React, { useState, useEffect } from "react";
import { Table } from "antd";

import SideBar from "../../common/SideBar";
import { sessionColumns } from "../../../constants/column";
import { fetchSessions } from "../../../services/session";
import PaginateButton from "../../common/PaginateButton";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

const Session = () => {
  const [sessionList, setSessionList] = useState<any[]>([]);
  const [sessionSnapshotDocs, setSessionSnapshotDocs] =
    useState<QuerySnapshot<DocumentData>>();

  useEffect(() => {
    fetchSessions(setSessionList, sessionSnapshotDocs, setSessionSnapshotDocs);
  }, []);

  const handlePaginate = (type: any) => {
    fetchSessions(
      setSessionList,
      sessionSnapshotDocs,
      setSessionSnapshotDocs,
      type
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Sessions"} />
      </div>
      <div className="w-full flex flex-col items-center mt-6 mx-6">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={handlePaginate}
            className="bg-primary1 text-white px-6 py-2 rounded-md mb-4"
          >
            <p>Refresh</p>
          </button>
        </div>
        <Table
          className="w-full"
          dataSource={sessionList}
          columns={sessionColumns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log(record);
              },
            };
          }}
        />
        <PaginateButton
          handlePrevious={() => handlePaginate("previous")}
          handleNext={() => handlePaginate("next")}
        />
      </div>
    </div>
  );
};

export default Session;
