import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { createContract } from "./tasks/createContract";
import { useContract } from "./tasks/useContract";
import { getContractInfos } from "./tasks/getContractInfos";
import { askRefund } from "./tasks/askRefund";
import { estimateGasPrice } from "./tasks/estimateGasPrice";

const privateKey = `0x${process.env.PRIVATE_KEY}`;
console.log(`Private key: ${privateKey}`);

task("createContract", "Creates a new Crowdfunding contract")
  .addParam("goal", "The goal amount in wei")
  .addParam("duration", "The duration of the campaign in minutes")
  .addParam("title", "The title of the campaign")
  .addParam("description", "The description of the campaign")
  .addParam("image", "The image URL of the campaign")
  .setAction(createContract);

task("useContract", "Contributes to an existing Crowdfunding contract")
  .addParam("contractAddress", "The address of the contract")
  .addParam("bidNumber", "The amount to contribute in wei")
  .addParam("accountNumber", "The account number to use for the contribution")
  .setAction(useContract);

task("getContractInfos", "Gets information about an existing Crowdfunding contract")
  .addParam("contractAddress", "The address of the contract")
  .setAction(getContractInfos);

task("askRefund", "Asks for a refund from an existing Crowdfunding contract")
  .addParam("contractAddress", "The address of the contract")
  .addParam("accountNumber", "The account number to use for the refund")
  .setAction(askRefund);

task("estimateGasPrice", "Estimates the gas cost of a transaction")
  .setAction(estimateGasPrice);

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://rpc2.sepolia.org`,
      accounts: [privateKey],
    },
  }
};

export default config;
