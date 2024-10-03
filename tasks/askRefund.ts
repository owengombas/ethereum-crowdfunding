import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Crowdfunding } from "../typechain-types";

interface AskRefundArgs {
    contractAddress: string;
    accountNumber: string;
}

export async function askRefund(args: AskRefundArgs, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractFactory("Crowdfunding");

    // Connect to existing contract
    const crowdfunding = (await contract.attach(args.contractAddress)) as Crowdfunding;

    // Ask for a refund
    console.log(await crowdfunding.connect(accounts[Number(args.accountNumber)]).claimRefund());
}
