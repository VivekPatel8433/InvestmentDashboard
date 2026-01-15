import React from "react";
import TopSummary from "./topsummary.jsx";
import AssetsTable from "./assetstable";
import { portfolioSummary, assets } from "../data/mockdata.js";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-orange-200 p-6 font-sans">
      <h2 className="font-bold text-3xl mb-6">Investment Tracker Dashboard</h2>
      <TopSummary
        totalValue={portfolioSummary.totalValue}
        totalInvested={portfolioSummary.totalInvested}
        totalProfit={portfolioSummary.totalProfit}
      />
      <AssetsTable assets={assets} />
    </div>
  );
};

export default Dashboard;
