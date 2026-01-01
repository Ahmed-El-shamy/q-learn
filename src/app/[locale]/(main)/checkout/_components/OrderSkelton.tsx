import React from "react";
import { FaImage } from "react-icons/fa";

const OrderSkelton: React.FC = () => {
  return (
    <div className="flex justify-between items-center animate-pulse mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 rounded-lg h-16 w-20" />
        <div className="bg-gray-200 h-5 w-32 rounded" />
      </div>
      <div className="bg-gray-200 h-5 w-20 rounded" />
    </div>
  );
};

export default OrderSkelton;
