import React, { useState, useEffect } from "react";
import { Table } from "antd";

import SideBar from "../../common/SideBar";
import { therapistColumn } from "../../../constants/column";
import { fetchTherapists } from "../../../services/therapist";
import { TherapistColumnType } from "../../../constants/columnType";

const Therapists = () => {
  const [therapistList, setTherapistList] = useState<any[]>([]);

  useEffect(() => {
    fetchTherapists(setTherapistList);
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="bg-primary1 w-[20%]">
        <SideBar active={"Therapists"} />
      </div>
      <div className="w-full flex flex-col items-center mt-12 mx-6">
        <Table<TherapistColumnType>
          className="w-full"
          dataSource={therapistList}
          columns={therapistColumn}
        />
      </div>
    </div>
  );
};

export default Therapists;
