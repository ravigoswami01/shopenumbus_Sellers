import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SellerContext } from "../Context/SellerContext";

const Revenue = () => {
  const { order: orders } = useContext(SellerContext);

  const revenueAmount =
    orders?.reduce((sum, order) => sum + Number(order.amount || 0), 0) || 0;

  const revenueData = {
    label: "Monthly Revenue",
    amount: revenueAmount,
    currency: "$",
    changePercentage: 8,
    trend: "up",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">
          {revenueData.label}
        </h3>

        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            revenueData.trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {revenueData.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
          {revenueData.changePercentage}%
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-end gap-1 mb-6">
        <span className="text-lg font-medium text-gray-500">
          {revenueData.currency}
        </span>
        <span className="text-4xl font-semibold text-gray-900 tracking-tight">
          {revenueData.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500">Compared to last month</p>
    </div>
  );
};

export default Revenue;
