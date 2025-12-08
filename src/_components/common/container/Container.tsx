import React, { ReactNode } from "react";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto h-full ${className}`}>{children}</div>
  );
};

export default Container;
