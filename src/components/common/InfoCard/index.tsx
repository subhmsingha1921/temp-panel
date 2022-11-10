import React from "react";

type InfoCardProps = {
  header: string | undefined;
  subText: string | number | undefined;
};

const InfoCard: React.FC<InfoCardProps> = ({ header, subText }) => {
  return (
    <div className="my-3">
      <p className="text-2xl font-bold">{header}</p>
      <p className="text-lg">{subText}</p>
    </div>
  );
};

export default InfoCard;
