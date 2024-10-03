// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

function DateToMinutes(date: Date): number {
  const now = new Date();
  return (date.getTime() - now.getTime()) / 1000 / 60;
}

const GOAL = hre.ethers.parseUnits("10", "wei");
const DURATION_IN_MINUTES = 10;

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {
  const goal = m.getParameter("goal", GOAL);
  const durationInMinutes = m.getParameter("durationInMinutes", DURATION_IN_MINUTES);

  const crowdfunding = m.contract("Crowdfunding", [goal, durationInMinutes]);

  return { crowdfunding };
});

export default CrowdfundingModule;
