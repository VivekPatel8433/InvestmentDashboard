import React from "react";

const AssetsTable = ({ assets }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
           <tr>
            {["Name", "Type", "Invested", "Current Value", "Profit / Loss"].map(
              (title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              )
            )}
          </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {assets.map((asset, index) => {
          const profit = asset.currentValue - asset.invested;
          return (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{asset.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">${asset.invested.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">${asset.currentValue.toLocaleString()}</td>
              <td
                  className={`px-6 py-4 whitespace-nowrap font-bold ${
                    profit >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ${profit.toLocaleString()}
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default AssetsTable;
