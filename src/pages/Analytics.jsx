import React, { useContext, useEffect, useState } from "react";
import { SellerContext } from "../Context/SellerContext";

const Analytics = () => {
  const { products, revenu } = useContext(SellerContext);

  const [stats, setStats] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!revenu) return;

    setStats([
      {
        label: "Today Revenue",
        value: `$${Number(revenu.day || 0).toFixed(2)}`,
      },
      {
        label: "Monthly Revenue",
        value: `$${Number(revenu.month || 0).toFixed(2)}`,
      },
      {
        label: "Yearly Revenue",
        value: `$${Number(revenu.year || 0).toFixed(2)}`,
      },
      {
        label: "Total Products",
        value: products?.length || 0,
      },
    ]);

    setMonthlyData(revenu.monthlyBreakdown || []);
  }, [revenu, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">
            Revenue performance and product insights
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Revenue
          </h2>

          {monthlyData.length ? (
            <div className="space-y-4">
              {monthlyData.map((item, index) => {
                const percentage =
                  revenu?.month > 0 ? (item.total / revenu.month) * 100 : 0;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-gray-600">
                      Month {item.month}
                    </span>

                    <div className="flex-1 h-3 bg-gray-100 rounded">
                      <div
                        className="h-3 bg-gray-900 rounded"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-28 text-right text-sm font-medium text-gray-900">
                      ${Number(item.total).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No revenue data available</p>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h2>

          <div className="divide-y">
            {products?.length ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales || 0} sold
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 py-4">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
