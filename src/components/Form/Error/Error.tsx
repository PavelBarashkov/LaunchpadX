import React, { FC } from "react";

interface ErrorProps {
  children: React.ReactNode;
}

export const Error: FC<ErrorProps> = ({ children }) => {
  return <div style={{ color: "red", fontSize: "13px" }}>{children}</div>;
};
