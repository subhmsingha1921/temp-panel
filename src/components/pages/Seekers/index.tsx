import React, { useState, useEffect } from "react";
import { Table } from "antd";

import SideBar from "../../common/SideBar";
import { seekerColumns } from "../../../constants/column";

import { fetchUsers } from "../../../services/user";
import PaginateButton from "../../common/PaginateButton";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

const Seekers = () => {
  const [seekerList, setSeekerList] = useState<any[]>([]);
  const [snapshotDocs, setSnapshotDocs] =
    useState<QuerySnapshot<DocumentData>>();

  useEffect(() => {
    fetchUsers(setSeekerList, snapshotDocs, setSnapshotDocs);
  }, []);

  const handlePaginate = (type: any) => {
    fetchUsers(setSeekerList, snapshotDocs, setSnapshotDocs, type);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Seekers"} />
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
          dataSource={seekerList}
          columns={seekerColumns}
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

export default Seekers;
