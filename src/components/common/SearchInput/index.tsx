import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type SearchInputProps = {
  placeholder: string;
  value: string;
  className: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  className,
}) => {
  return (
    <Input
      className={`self-start ${className}`}
      size="large"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      style={{ width: "25%" }}
    />
  );
};

export default SearchInput;
