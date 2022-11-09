import React, { useState, useEffect } from "react";
import { Table } from "antd";

import SideBar from "../../common/SideBar";
import PaginateButton from "../../common/PaginateButton";
import { listenerColumns } from "../../../constants/column";
import { fetchListeners } from "../../../services/user";

const Listeners = () => {
  const [listenerList, setListenerList] = useState<any[]>([]);
  const [snapshotDocs, setSnapshotDocs] = useState<any[]>([]);
  const currentPageList = listenerList.slice(-10);

  useEffect(() => {
    fetchListeners(
      listenerList,
      setListenerList,
      snapshotDocs,
      setSnapshotDocs
    );
  }, []);

  const handleRefresh = () => {
    const firstPage = listenerList.slice(0, 10);
    const firstSnapshot = snapshotDocs.slice(0, 10);
    setListenerList(firstPage);
    setSnapshotDocs(firstSnapshot);
  };

  const handlePrevious = () => {
    if (listenerList.length <= 10) {
      return;
    }
    const updatedListenerList = listenerList.slice(0, -10);
    const updatedSnapshotDocs = snapshotDocs.slice(0, -10);
    setListenerList(updatedListenerList);
    setSnapshotDocs(updatedSnapshotDocs);
  };

  const handleNext = () => {
    fetchListeners(
      listenerList,
      setListenerList,
      snapshotDocs,
      setSnapshotDocs,
      "next"
    );
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Listeners"} />
      </div>
      <div className="w-full flex flex-col items-center mt-6 mx-6">
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={handleRefresh}
            className="bg-primary1 text-white px-6 py-2 rounded-md mb-4"
          >
            <p>Refresh</p>
          </button>
        </div>
        <Table
          className="w-full"
          dataSource={currentPageList}
          columns={listenerColumns}
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
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Listeners;
