import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Crowdfunding } from "../typechain-types";

interface UseContractArgs {
    contractAddress: string;
    bidNumber: string;
    accountNumber: string;
}

export async function useContract(args: UseContractArgs, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();
    const account = accounts[Number(args.accountNumber)];
    const bid = hre.ethers.parseUnits(args.bidNumber, "wei");

    const contract = await hre.ethers.getContractFactory("Crowdfunding");

    // Connect to existing contract
    const crowdfunding = (await contract.attach(args.contractAddress)) as Crowdfunding;

    // Make a contribution
    await crowdfunding.connect(account).contribute({ value: bid });

    console.log(`Contributed ${bid} to ${args.contractAddress} from account ${account.address}`);
}
