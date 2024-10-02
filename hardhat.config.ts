import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const privateKey = `0x${process.env.PRIVATE_KEY}`;

console.log(`Private key: ${privateKey}`);

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://rpc2.sepolia.org`,    // Sepolia RPC URL
      accounts: [privateKey] // Your MetaMask private key
    }
  }
};

export default config;
