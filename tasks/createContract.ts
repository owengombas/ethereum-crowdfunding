import { HardhatRuntimeEnvironment } from "hardhat/types";
import readline from "readline";

interface CreateContractArgs {
    goal: string;
    duration: string;
    title: string;
    description: string;
    image: string;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export async function createContract(args: CreateContractArgs, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();
    const contract = await hre.ethers.getContractFactory("Crowdfunding");

    const crowdfunding = await contract.getDeployTransaction(
        hre.ethers.parseUnits(args.goal, "wei"),
        Number(args.duration),
        args.title,
        args.description,
        args.image,
        { gasLimit: 2_000_000 }
    );

    console.log("Deploying Crowdfunding contract...");
    
    const estimatedGas = await hre.ethers.provider.estimateGas(crowdfunding);
    console.log("Estimated gas price:", Intl.NumberFormat().format(estimatedGas));

    const tx = await accounts[0].sendTransaction(crowdfunding);
    await tx.wait();

    console.log("Crowdfunding contract deployed to:", await tx.wait().then((receipt) => receipt?.contractAddress));
    process.exit(0);
}
