import { HardhatRuntimeEnvironment } from "hardhat/types";

interface CreateContractArgs {
    goal: string;
    duration: string;
    title: string;
    description: string;
    image: string;
}

export async function createContract(args: CreateContractArgs, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();
    const contract = await hre.ethers.getContractFactory("Crowdfunding");
    contract.connect(accounts[0]);

    const crowdfunding = await contract.deploy(
        hre.ethers.parseUnits(args.goal, "wei"),
        Number(args.duration),
        args.title,
        args.description,
        args.image,
    );

    console.log("Crowdfunding contract deployed to:", await crowdfunding.getAddress());
}
