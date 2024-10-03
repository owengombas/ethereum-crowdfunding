import { expect } from "chai";
import { Crowdfunding } from "../typechain-types"; // Typechain types
import hre from "hardhat";
import { Signer } from "ethers";

describe("Crowdfunding", function () {
  let crowdfunding: Crowdfunding;
  let creator: Signer;
  let contributor1: Signer;
  let contributor2: Signer;
  let nonContributor: Signer;

  const title = "Test Campaign";
  const description = "This is a test campaign";
  const goal = hre.ethers.parseEther("10"); // campaign goal in ether
  const duration = 5; // campaign duration in minutes
  const image = ""; // optional image URL

  beforeEach(async function () {
    // Get contract factory and signers
    [creator, contributor1, contributor2, nonContributor] = await hre.ethers.getSigners();
    crowdfunding = await hre.ethers.deployContract("Crowdfunding", [goal, duration, title, description, image], { from: creator });
  });

  it("should accept contributions and track contributors", async function () {
    // Contributor 1 contributes 5 ether
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });
    
    // Contributor 2 contributes 3 ether
    await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("3") });

    expect(await crowdfunding.totalFunds()).to.equal(hre.ethers.parseEther("8"));

    const contributors = await crowdfunding.getContributors();
    expect(contributors.length).to.equal(2); // 2 unique contributors
    expect(contributors).to.include(await contributor1.getAddress());
    expect(contributors).to.include(await contributor2.getAddress());
  });

  it("should reach the goal and allow the creator to withdraw funds", async function () {
    // Contributor 1 and 2 contribute, exceeding the goal
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("6") });
    await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("5") });

    // Check that the goal was reached
    const goalReached = await crowdfunding.goalReached();
    expect(goalReached).to.equal(true);

    // Creator withdraws funds
    await expect(() =>
      crowdfunding.connect(creator).withdrawFunds()
    ).to.changeEtherBalances([creator, crowdfunding], [hre.ethers.parseEther("11"), hre.ethers.parseEther("-11")]);
  });

  it("should refund contributors if the goal is not reached", async function () {
    // Contributor 1 contributes 4 ether, which is less than the goal
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("4") });

    // Fast forward time past the deadline
    await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
    await hre.ethers.provider.send("evm_mine", []);

    // Refunds are processed
    await crowdfunding.connect(contributor1).refundAll();

    // Check that the contributor received their refund
    expect(await crowdfunding.contributions(await contributor1.getAddress())).to.equal(0);
  });

  it("should prevent refunds if the goal is reached", async function () {
    // Contributor 1 and 2 contribute, meeting the goal
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("6") });
    await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("5") });

    // Fast forward time past the deadline
    await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
    await hre.ethers.provider.send("evm_mine", []);

    // Try to process refunds (should fail since the goal is met)
    await expect(crowdfunding.connect(contributor1).refundAll()).to.be.revertedWith("Goal was reached, no refunds available");
  });

  it("should prevent contributions after the deadline", async function () {
    // Fast forward time past the deadline
    await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
    await hre.ethers.provider.send("evm_mine", []);

    // Try to contribute after the deadline
    await expect(crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("1") })).to.be.revertedWith("Crowdfunding campaign has ended");
  });

  it("should prevent withdrawals before the deadline", async function () {
    // Contributor 1 contributes 5 ether
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

    // Try to withdraw before the deadline
    await expect(crowdfunding.connect(creator).withdrawFunds()).to.be.revertedWith("Funding goal has not been reached");
  });

  it("should prevent refunds before the deadline", async function () {
    // Contributor 1 contributes 5 ether
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

    // Try to refund before the deadline
    await expect(crowdfunding.connect(contributor1).refundAll()).to.be.revertedWith("Campaign is still ongoing");
  });

  it("should accept multiple contributions from the same contributor", async function () {
    // Contributor 1 contributes 5 ether
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

    // Contributor 1 contributes 3 more ether
    await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("3") });

    expect(await crowdfunding.getContributorAmount(await contributor1.getAddress())).to.equal(hre.ethers.parseEther("8"));
  });
});