import React, { ReactNode } from "react";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`w-[95%] sm:w-[85%] mx-auto h-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
