import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Crowdfunding } from "../typechain-types";

interface UseContractArgs {
    contractAddress: string;
}

export async function getContractInfos(args: UseContractArgs, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractFactory("Crowdfunding");

    // Connect to existing contract
    const crowdfunding = (await contract.attach(args.contractAddress)) as Crowdfunding;

    // Get contract information
    const goal = await crowdfunding.goal();
    const deadline = Number(await crowdfunding.deadline());
    const title = await crowdfunding.title();
    const description = await crowdfunding.description();
    const image = await crowdfunding.image();
    const totalFunds = await crowdfunding.getContractBalance();
    const isDeadlineReached = (new Date().getTime() / 1000) > deadline;

    console.log("Goal:", goal.toString());
    console.log("Finishes in:", (deadline - Math.floor(Date.now() / 1000)), "seconds");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image || "<NO IMAGE>");
    console.log("Total funds:", totalFunds.toString());
    console.log("Is deadline reached:", isDeadlineReached);
}
