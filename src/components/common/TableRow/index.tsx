import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type TableRowProps = {
  image: string;
  name: string;
  age: number;
  gender: string;
  userId: string;
  userType: string;
};

const TableRow: React.FC<TableRowProps> = ({
  image,
  name,
  age,
  gender,
  userId,
  userType,
}) => {
  const getPath = () => {
    if (userType === "seeker") return `/seekerprofile/${userId}`;
    return `/listenerprofile/${userId}`;
  };

  return (
    <div className="flex flex-row p-2 my-4 justify-between items-center border-2 rounded-lg">
      <img src={image} className="w-12 h-14" />
      <p className="text-lg">{name}</p>
      <p className="text-lg">{age}</p>
      <p className="text-lg">{gender}</p>
      {userType !== "" ? (
        <Link to={getPath()} state={{ userId: userId }}>
          <RightOutlined />
        </Link>
      ) : (
        <button>
          <RightOutlined />
        </button>
      )}
    </div>
  );
};

export default TableRow;
