import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Crowdfunding } from "../typechain-types";

export async function estimateGasPrice(args: {}, hre: HardhatRuntimeEnvironment) {
    const accounts = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractFactory("Crowdfunding");

    const transac = await contract.getDeployTransaction(
        hre.ethers.parseUnits("1", "wei"),
        1,
        "title",
        "description",
        "image",
    )

    const estimatedGas = await hre.ethers.provider.estimateGas(transac);

    console.log("Estimated gas price:", estimatedGas.toString());
}
