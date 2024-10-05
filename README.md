# Crowdfunding dApp

## Table of Contents

1. [Introduction](#introduction)
2. [Main Functionalities](#main-functionalities)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Smart Contract](#smart-contract)
    - [Key Features](#key-features)
    - [Deployment](#deployment)
6. [Tasks](#tasks)
    - [Available Tasks](#available-tasks)
7. [Automated Testing](#Automated-Testing)


## Introduction
This project is a decentralized application (dApp) for **crowdfunding** that allows the creation and management of fundraising campaigns on the Ethereum blockchain. The application is developed using **Solidity** and uses [**Hardhat**](https://hardhat.org/) for managing smart contracts, as well as for testing and deployment.

## Main Functionalities :
- Create a crowdfunding campaign.
- Contribute to an existing campaign.
- Retrieve information about a campaign.
- Request a refund in case of a campaign failure.

## Prerequisites

Before getting started, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 14 or above)

## Installation

Clone the project repository and install the dependencies:

```bash
git clone https://github.com/owengombas/ethereum-crowdfunding.git
cd crowdfunding-dapp
npm install
```
Compile the contract using the Hardhat built-in compile task: 
```bash
npx hardhat compile
```

## Smart Contract

The main smart contract is defined in the [Crowdfunding.sol](/contracts/Crowdfunding.sol) file. It contains the logic for managing crowdfunding campaigns, including functions to:

- Contribute to the campaign.
- Withdraw funds if the goal is reached.
- Claim refunds if the campaign fails.

### Key Features

- Creator: The address of the project creator.
- Goal: The funding goal in wei.
- Deadline: The time limit for reaching the goal.
- Total Funds: The total amount of funds raised.
- Refund Mechanism: Allows contributors to get refunds if the goal is not met.

### Deployment

To deploy the contract in the localhost network:
```bash
npx hardhat node
```

## Tasks

In addition to writing and deploying the Crowdfunding contract, we provide Hardhat scripts that allow users to interact with the contract after deployment. Below, we explain the purpose of key functions in the provided scripts and give additional details on the configuration necessary to execute them properly.

Open a new terminal to run the different scripts

### Available Tasks

1.	`Create Contract`
	- Deploy a new crowdfunding contract.
	- Usage:
    ```bash
    npx hardhat createContract --goal <goal_in_wei> --duration <duration_in_minutes> --title "<title>" --description "<description>" --image "<image_url>"
    ```

    Example:
    ```bash
    npx hardhat createContract --goal 10 --duration 1 --title "Test" --description "" --image ""
    ```
2.	`useContract`
    - Contribute to an existing crowdfunding contract.
	- Usage:
    ```bash
    npx hardhat useContract --contractAddress <contract_address> --bidNumber <amount_in_wei> --accountNumber <account_index>
    ```

    Example:
    ```bash
    npx hardhat useContract --contract-address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --bid-number 5 --account-number 1
    ```
3.	`getContractInfos`
	- Retrieve details about the crowdfunding contract.
	- Usage:
    ```bash
    npx hardhat getContractInfos --contractAddress <contract_address>
    ```

    Example:
    ```bash
    npx hardhat getContractInfos --contract-address 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ```
4.	`askRefund`

    It allows a contributor to request a refund if a crowdfunding campaign did not reach its funding goal. This process involves connecting to an existing deployed Crowdfunding contract and executing the `claimRefund` function for a specific account. Below is a breakdown of how the script works:

    #### Process Explanation

    1. **Interface Definition**:
        - The `AskRefundArgs` interface defines the two arguments required by the script:
            - `contractAddress`: The address of the deployed Crowdfunding contract.
            - `accountNumber`: The index of the account (in the list of signer accounts) that is requesting the refund.

    2. **Getting Signer Accounts**:
        - The script retrieves the available signer accounts via `hre.ethers.getSigners()`. These accounts are the addresses configured in the Hardhat environment, which are capable of interacting with the contract.
        - The `accountNumber` passed as an argument refers to the index of the account that will request the refund. For example, `accounts[0]` would refer to the first signer.

    3. **Connecting to the Deployed Contract**:
        - The script uses `hre.ethers.getContractFactory("Crowdfunding")` to get the contract factory for the Crowdfunding contract. This factory allows interactions with the deployed instance of the contract.
        - The `attach()` function is called to connect the script to the existing contract at the provided `contractAddress`. This step is necessary to interact with the correct deployed instance of the Crowdfunding contract.

    4. **Requesting a Refund**:
        - The `claimRefund` function is called on the connected contract. The account that is requesting the refund connects to the contract using `crowdfunding.connect(accounts[Number(args.accountNumber)])`.
        - The result of the refund request is then logged to the console. This step shows whether the refund was successfully processed for the contributor.

    #### Example Usage

    To request a refund, you would run the script with the following command:

    ```bash
    npx hardhat askRefund --contractAddress <contract_address> --accountNumber <account_index>
    ```

    Example:
    ```bash
    npx hardhat askRefund --contract-address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --account-number 1
    ```

## Automated Testing
We provide a set of tests to ensure that the contract behaves correctly. Below are examples of unit tests written using Hardhat, TypeScript, and Chai for the Crowdfunding contract, covering essential functionalities like contributions, withdrawals, refunds, and deadlines.

### Test Setup

1. The tests are written in TypeScript and use the [Chai](https://www.chaijs.com/) assertion library.
2. The `Crowdfunding` contract is deployed before each test, and the signers (creator, contributors) are initialized.
3. The tests simulate real-world scenarios like contributing funds, reaching or missing the goal, and ensuring that all contract functions behave as expected.

### Example Tests

Below are some example tests included in the `test/Crowdfunding.ts` file:

#### 1. Accepting Contributions and Tracking Contributors
This test checks if the contract correctly accepts contributions from different users and tracks them.

```typescript
it("should accept contributions and track contributors", async function () {
  // Contributor 1 contributes 5 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

  // Contributor 2 contributes 3 ether
  await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("3") });

  // Ensure total contributions are correctly tracked
  expect(await crowdfunding.totalFunds()).to.equal(hre.ethers.parseEther("8"));

  const contributors = await crowdfunding.getContributors();
  expect(contributors.length).to.equal(2); // 2 unique contributors
  expect(contributors).to.include(await contributor1.getAddress());
  expect(contributors).to.include(await contributor2.getAddress());
});
```

#### 2. Goal Reached and Allowing Creator to Withdraw Funds

This test ensures that the campaign creator can withdraw the funds only if the goal is reached.

```typescript
it("should reach the goal and allow the creator to withdraw funds", async function () {
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("6") });
  await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("5") });

  const goalReached = await crowdfunding.goalReached();
  expect(goalReached).to.equal(true);

  await expect(() =>
    crowdfunding.connect(creator).withdrawFunds()
  ).to.changeEtherBalances([creator, crowdfunding], [hre.ethers.parseEther("11"), hre.ethers.parseEther("-11")]);
});
```

#### 3. Refunds If Goal Is Not Reached

This test checks that contributors can request refunds if the campaign does not meet its goal by the deadline.

```typescript
it("should refund contributors if the goal is not reached", async function () {
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("4") });

  // Fast forward time to simulate the end of the campaign
  await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
  await hre.ethers.provider.send("evm_mine", []);

  await crowdfunding.connect(contributor1).refundAll();

  expect(await crowdfunding.contributions(await contributor1.getAddress())).to.equal(0);
});
```

### Running the Tests
1.	Ensure your development environment is set up (see [Installation](#installation)).
2.	Compile the contracts:
```bash
npx hardhat compile
```
3. Run the tests:
```bash
npx hardhat test
```

These tests will simulate different scenarios in the crowdfunding process, ensuring that all functions of the contract perform as expected. Feel free to add more tests as necessary to cover additional edge cases.