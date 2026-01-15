import React from "react";

const TopSummary = ({ totalValue, totalInvested, totalProfit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-300 p-6 rounded-lg shadow">
        <h4 className="text-gray-500 font-medium mb-2">Total Portfolio Value</h4>
        <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
      </div>
      <div className="bg-blue-300 p-6 rounded-lg shadow hover:bg-blue-300">
        <h4 className="text-gray-500 font-medium mb-2">Total Invested</h4>
        <p className="text-2xl font-bold">${totalInvested.toLocaleString()}</p>
      </div>
      <div className="bg-blue-300 p-6 rounded-lg shadow hover:bg-blue-300">
        <h4 className="text-gray-500 font-medium mb-2">Total Profit / Loss</h4>
        <p className="text-2xl font-bold">${totalProfit.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TopSummary;
