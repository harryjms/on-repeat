import React from "react";

interface IBarProps {
  style?: React.CSSProperties;
  className?: string;
}
const Bar: React.FC<IBarProps> = ({ children, className, style }) => {
  return (
    <div
      className={"rounded-lg dark:bg-gray-800 bg-gray-200 p-2 " + className}
      style={style}
    >
      {children}
    </div>
  );
};

export default Bar;
