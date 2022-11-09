import React from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

type PaginateButtonProps = {
  handlePrevious: () => void;
  handleNext: () => void;
};

const PaginateButton: React.FC<PaginateButtonProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <div className="w-full flex flex-row justify-end mt-5 mb-10">
      <button
        className="mr-3 border-solid border border-blue-400"
        onClick={handlePrevious}
      >
        <LeftOutlined className="py-2 px-2" />
      </button>
      <button
        className="border-solid border border-blue-400"
        onClick={handleNext}
      >
        <RightOutlined className="py-2 px-2" />
      </button>
    </div>
  );
};

export default PaginateButton;
