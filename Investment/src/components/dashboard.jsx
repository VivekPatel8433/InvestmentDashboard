import React, { useState } from "react";

import TopSummary from "./topsummary.jsx";
import AssetsTable from "./assetstable.jsx";
import PortfolioChart from "./portfoliochart.jsx";
import AllocationPieChart from "./allocationpiechart.jsx";
import { AddInvestmentForm } from "./addinvestmentform.jsx";
import { Headers } from "./headers/headers.jsx";

import {
  portfolioSummary,
  portfolioHistory,
  allocation,
  assets as mockAssets
} from "../data/mockdata.js";

const Dashboard = () => {
  const [assets, setAssets] = useState(mockAssets);

  const handleAddInvestment = (newAsset) => {
    setAssets((prevAssets) => [...prevAssets, newAsset]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-orange-200 p-6 font-sans">
        <Headers/>
        <h2 className="font-bold text-3xl mb-6">
          Investment Tracker Dashboard
        </h2>

        <TopSummary {...portfolioSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <PortfolioChart data={portfolioHistory} />
          <AllocationPieChart data={allocation} />
        </div>

        <AssetsTable assets={assets} />
        <AddInvestmentForm onAdd={handleAddInvestment} />
      </main>
    </div>
  );
};

export default Dashboard;
