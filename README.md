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
This project is a decentralized application (dApp) for **crowdfunding** that allows the creation and management of fundraising campaigns on the Ethereum blockchain. The application is developed using **Solidity** and uses [**Hardhat**](https://hardhat.org/) with Node.js (TypeScript) for managing smart contracts, as well as for testing and deployment.

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

### Key aspects
- **Creator**: The address of the project creator.
- **Goal**: The funding goal in wei.
- **Deadline**: The time limit for reaching the goal.
- **Total Funds**: The total amount of funds raised.
- **Refund Mechanism**: Allows contributors to get refunds if the goal is not met.

## Deployment

### Local network
We aimed to use the Sepolia Testnet, however the cost to deploy on the contract was way too expensive for us to gather enough SepoliaETH in time, therefore we chose to use the hardhat local network for testing our contract.

To start the local node on which we will deploy the contract, run the following command:
```bash
npx hardhat node
```
20 accounts will be created and we will be able to use them for testing.

### Sepolia Testnet
We were able to collect approximatively 1.00 SepoliaETH, but to simply deploy our contract on the Testnet it costs 0.7 SepoliaETH, therefore within the time constraints we are able to test the contract only once. If you own more than this amount you can run every command presented in this documents with the additional flag `--network sepolia`. To do that you need to run the script in a session where the `PRIVATE_KEY` environment variable is set to yours.

## Smart contract functions
The contract is structured to allow the creator to withdraw funds if a funding goal is met, or issue refunds to contributors if the goal is not reached by a set deadline.

### State Variables:
Variables are used to store data that can be accessed and modified throughout the contract. They are stored permanently on the blockchain. They maintain the state of the contract, and any changes to them will affect the contract’s behavior or outcome.

- **creator**: The address of the project creator.
- **goal**: The funding goal to be reached (in wei).
- **deadline**: The time limit for reaching the funding goal.
- **totalFunds**: The total amount of funds raised by the project.
- **goalReached**: A flag indicating whether the funding goal has been reached.
- **refunded**: A flag indicating whether refunds have been processed.
- **title**: The title of the project.
- **description**: The description of the project.
- **image**: A URL or reference to the image of the project.
- **contributions**: A mapping of addresses to the amount contributed by each backer.
- **contributors**: An array of addresses that tracks the list of contributors.

### Events:
Events allow contracts to communicate with the outside world by logging certain actions. When an event is emitted, it gets recorded in the blockchain transaction logs, and external applications (like decentralized apps or front-end interfaces) can listen to these events and react accordingly.
- **ContributionReceived**: Triggered when a contributor makes a contribution.
- **GoalReached**: Triggered when the total contributions meet or exceed the funding goal.
- **FundsWithdrawn**: Triggered when the project creator withdraws funds after the goal is reached.
- **RefundIssued**: Triggered when refunds are issued to contributors if the goal is not met.

### Modifiers:
Modifiers are used to change the behavior of functions. They act as conditions or checks that must be met before the function executes. If the conditions in the modifier are not met, the function call will be reverted (meaning it won’t proceed). Modifiers help reduce redundant code by allowing you to reuse conditions across multiple functions.

- **onlyCreator**: Ensures that only the creator of the project can call certain functions.
- **stillActive**: Ensures that the crowdfunding campaign is still active (before the deadline and before the goal is reached).
- **afterDeadline**: Ensures that the function can only be called after the deadline and if the goal has not been reached.

### Functions:
The functions can be public, private, external or internal:
- **Public Functions**: Can be called both internally within the contract and externally by users or other contracts.
- **Private Functions**: Can only be called internally, from within the same contract.
- **External Functions**: Can only be called externally by users or other contracts.
- **Internal Functions**: Can be called only within the contract or from derived contracts (used in inheritance).

Here are the functions we implemented:

- **constructor**: Initializes the crowdfunding project with a goal, deadline, title, description, and image. The creator of the project is set to the account that deploys the contract.
- **contribute**: Allows users to contribute funds to the project. If a contribution is made, the contributor’s address is stored in the contributors array. If the total contributions meet or exceed the goal, the goalReached flag is set to true and the GoalReached event is emitted.
- **withdrawFunds**: Allows the creator to withdraw the funds if the funding goal has been reached. The funds are transferred to the creator’s address and the FundsWithdrawn event is emitted.
- **claimRefund**: Allows contributors to claim refunds if the funding goal is not met by the deadline. The refund is issued based on the contributor’s contribution, and the RefundIssued event is emitted.
- **refundAll**: Allows for the mass refunding of all contributors in one transaction if the funding goal is not met by the deadline and refunds have not yet been processed.
- **getContributors**: Returns the list of all contributors to the project.
- **getContributorAmount**: Returns the contribution amount of a specific contributor.
- **getContractBalance**: Returns the current balance of the contract.


### Example Workflow:
1. **Creating the Project**: The project creator initializes the contract with a funding goal, duration (in minutes), title, description, and image.
2. **Contributing**: Contributors can send funds to the project using the contribute function. Each contribution is tracked in the contributions mapping, and the contributor’s address is stored in the contributors array.
3. **Reaching the Goal**: If the total contributions reach or exceed the goal, the goalReached flag is set to true, and the project creator can withdraw the funds using the withdrawFunds() function.
4. **Refund Process**: If the deadline is reached and the goal has not been met, contributors can individually claim refunds using the claimRefund() function, or the creator can issue refunds to all contributors using the refundAll() function.

## Tasks

In addition to writing and deploying the Crowdfunding contract, we provide Hardhat scripts that allow users to interact with the contract after deployment. Below, we explain the purpose of key functions in the provided scripts and give additional details on the configuration necessary to execute them properly.

Open a new terminal to run the different scripts

### Available Tasks

1.	`Create Contract`

	It facilitates the deployment of a Crowdfunding smart contract on the Ethereum blockchain. The user provides the contract parameters, such as the funding goal, duration, title, description, and image, which are then used to deploy a new instance of the contract.

    #### Process Explanation

    1. Interface Definition:
        - The `CreateContractArgs` interface defines the parameters required for deploying the contract:
        - `goal`: The funding goal for the campaign, specified in wei.
        - `duration`: The duration of the campaign, in seconds.
        - `title`: A short title for the campaign.
        - `description`: A detailed description of the campaign.
        - `image`: A URL or identifier for the campaign's image.

    2. Getting Signer Accounts:
        - The script retrieves the signer accounts via `hre.ethers.getSigners()`. These accounts are the ones configured in the Hardhat environment and have the capability to deploy the contract.
        - The deployment transaction is signed and sent by the first account in the list of available signers, i.e., `accounts[0]`.

    3. Deploying the Crowdfunding Contract:
        - The script uses `hre.ethers.getContractFactory("Crowdfunding")` to create an instance of the contract factory.
        - It then prepares the deployment transaction by passing the campaign parameters (goal, duration, title, description, image) and an optional gas limit of 2,000,000.
        - The script estimates the gas required for the transaction using `hre.ethers.provider.estimateGas()` and prints the estimated gas to the console.

    4. Confirming the Deployment:
        - The transaction is sent to the network, and once confirmed, the contract is deployed.
        - The address of the deployed contract is logged to the console, allowing the user to interact with it in the future.
	
    #### Example Usage

    ```bash
    npx hardhat createContract --goal <goal_in_wei> --duration <duration_in_minutes> --title "<title>" --description "<description>" --image "<image_url>"
    ```

    Example:
    ```bash
    npx hardhat createContract --goal 10 --duration 1 --title "Test" --description "" --image ""
    ```
2.	`useContract`
    This script allows a user to make a contribution to an existing Crowdfunding contract deployed on the Ethereum blockchain. The user specifies the contract address, the amount to contribute, and the account making the contribution.

    #### Process Explanation

    1. Interface Definition:
        - The `UseContractArgs` interface defines the parameters required to make a contribution:
        - `contractAddress`: The address of the deployed Crowdfunding contract.
        - `bidNumber`: The amount of the contribution, in wei.
        - `accountNumber`: The index of the signer account (in the list of available Hardhat accounts) that will make the contribution.

    2. Getting Signer Accounts:
        - The script retrieves all available signer accounts via `hre.ethers.getSigners()`. These accounts represent the addresses configured in the Hardhat environment.
        - The `accountNumber` argument is used to select which account from the list of signers will make the contribution. For example, `accounts[0]` refers to the first signer account.

    3. Connecting to the Deployed Contract:
        - The script connects to an existing deployed Crowdfunding contract using the provided `contractAddress`.
        - The `hre.ethers.getContractFactory("Crowdfunding")` function is used to get the contract factory for the Crowdfunding contract. The `attach()` method connects the script to the specified contract address.

    4. Making a Contribution:
        - The `contribute` function of the Crowdfunding contract is called by the selected signer account, transferring the specified amount (`bid`) to the contract.
        - The contribution is made using `crowdfunding.connect(account).contribute({ value: bid })`, where `bid` is the amount contributed in wei.

    5. Logging the Contribution:
        - Once the transaction is completed, the script logs the contribution details to the console, including the amount contributed, the contract address, and the contributor's account address.

    #### Example Usage
    
    ```bash
    npx hardhat useContract --contractAddress <contract_address> --bidNumber <amount_in_wei> --accountNumber <account_index>
    ```

    Example:
    ```bash
    npx hardhat useContract --contract-address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --bid-number 5 --account-number 1
    ```
3.	`getContractInfos`
	It retrieves and displays key information about an existing Crowdfunding contract already deployed. The user specifies the contract address, and the script fetches details such as the campaign goal, title, description, image, total funds, and whether the campaign deadline has been reached or not.

    #### Process Explanation

    1. Interface Definition:
        - The `UseContractArgs` interface defines the parameter required to query the contract:
        - `contractAddress`: The address of the deployed Crowdfunding contract from which information will be retrieved.

    2. Getting Signer Accounts:
        - The script retrieves the available signer accounts via `hre.ethers.getSigners()`. These accounts represent the addresses configured in the Hardhat environment, though they are not actively used for interacting in this script.

    3. Connecting to the Deployed Contract:
        - The script uses `hre.ethers.getContractFactory("Crowdfunding")` to get the contract factory for the Crowdfunding contract.
        - It then connects to the deployed contract at the specified `contractAddress` using the `attach()` method, allowing interaction with the Crowdfunding contract.

    4. Retrieving Contract Information:
        The script fetches the following details from the Crowdfunding contract:
        - **Goal**: The total amount of funds needed for the campaign.
        - **Deadline**: The timestamp indicating when the campaign ends.
        - **Title**: The title of the crowdfunding campaign.
        - **Description**: The description of the campaign.
        - **Image**: The URL of the campaign image (if available).
        - **Total Funds**: The current balance of funds raised in the campaign.
        - **Is Deadline Reached**: A boolean indicating whether the campaign deadline has been reached.

    5. Logging the Information:

        The retrieved information is printed to the console for easy reference. The deadline is displayed as the number of seconds remaining until the campaign ends.

    #### Example Usage

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

5. `estimateGasPrice`
    This script estimates the gas price required to deploy a Crowdfunding contract on the Ethereum blockchain using Hardhat. It creates a mock transaction for deploying the contract and calculates the estimated gas needed for the deployment.

    #### Process Explanation

    1. Getting Signer Accounts:
        - The script retrieves the available signer accounts using `hre.ethers.getSigners()`. These accounts are configured in the Hardhat environment, but they are not directly involved in the gas estimation process.

    2. Creating a Mock Contract Deployment:
        - The script uses `hre.ethers.getContractFactory("Crowdfunding")` to retrieve the contract factory for the Crowdfunding contract.
        - A mock deployment transaction is prepared with placeholder values for the contract parameters:
            - **goal**: Set to 1 wei.
            - **duration**: Set to 1 second.
            - **title**: Placeholder string "title".
            - **description**: Placeholder string "description".
            - **image**: Placeholder string "image".

    3. Estimating the Gas:
        - The gas estimation is performed using `hre.ethers.provider.estimateGas(transac)`, which simulates the deployment transaction and calculates the amount of gas that would be required for it.
        - The estimated gas price is printed to the console in wei.

    #### Example Usage

    To estimate the gas required for deploying a Crowdfunding contract, run the following command:

    ```bash
    npx hardhat estimateGasPrice
    ```

## Automated Testing
We provide a set of tests to ensure that the contract behaves correctly. Below are examples of unit tests written using Hardhat, TypeScript, and Chai for the Crowdfunding contract, covering essential functionalities like contributions, withdrawals, refunds, and deadlines.

### Test Setup

1. The tests are written in TypeScript and use the [Chai](https://www.chaijs.com/) assertion library.
2. The `Crowdfunding` contract is deployed before each test, and the signers (creator, contributors) are initialized.
3. The tests simulate real-world scenarios like contributing funds, reaching or missing the goal, and ensuring that all contract functions behave as expected.

### Tests
Below are some example tests included in the `test/Crowdfunding.ts` file. This ensures that the smart contracts acts as expected and to verify the eventual corner cases which can occur.

#### 1. Accepting Contributions and Tracking Contributors
This test checks if the contract accepts contributions, adds them to the total, and tracks unique contributors.

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
This test ensures that if the goal is reached, the creator can withdraw the accumulated funds.

```typescript
it("should reach the goal and allow the creator to withdraw funds", async function () {
  // Contributors exceed the goal with 11 ether total
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("6") });
  await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("5") });

  // Check if the goal has been reached
  const goalReached = await crowdfunding.goalReached();
  expect(goalReached).to.equal(true);

  // Creator withdraws the total amount
  await expect(() =>
    crowdfunding.connect(creator).withdrawFunds()
  ).to.changeEtherBalances([creator, crowdfunding], [hre.ethers.parseEther("11"), hre.ethers.parseEther("-11")]);
});
```

#### 3. Should refund contributors if the goal is not reached
This test ensures that if the campaign doesn’t reach the goal, contributors can get a refund.

```typescript
it("should refund contributors if the goal is not reached", async function () {
  // Contributor 1 contributes 4 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("4") });

  // Fast forward past the campaign duration
  await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
  await hre.ethers.provider.send("evm_mine", []);

  // Process the refund
  await crowdfunding.connect(contributor1).refundAll();

  // Verify that the contribution amount has been reset to 0
  expect(await crowdfunding.contributions(await contributor1.getAddress())).to.equal(0);
});
```

#### 4. Should prevent refunds if the goal is reached
If the goal is met, contributors shouldn’t be able to request a refund.
```js
it("should prevent refunds if the goal is reached", async function () {
  // Contributors meet the goal with 11 ether total
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("6") });
  await crowdfunding.connect(contributor2).contribute({ value: hre.ethers.parseEther("5") });

  // Fast forward past the campaign duration
  await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
  await hre.ethers.provider.send("evm_mine", []);

  // Attempt to refund (should fail)
  await expect(crowdfunding.connect(contributor1).refundAll()).to.be.revertedWith("Goal was reached, no refunds available");
});
```

#### 5. Should prevent contributions after the deadline
After the campaign ends, no more contributions should be accepted.
```js
it("should prevent contributions after the deadline", async function () {
  // Fast forward past the campaign duration
  await hre.ethers.provider.send("evm_increaseTime", [duration * 60 + 1]);
  await hre.ethers.provider.send("evm_mine", []);

  // Attempt to contribute after the deadline (should fail)
  await expect(crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("1") }))
    .to.be.revertedWith("Crowdfunding campaign has ended");
});
```

#### 6. Should prevent withdrawals before the deadline
The creator should not be able to withdraw funds until the campaign ends, even if contributions have been made.
```js
it("should prevent withdrawals before the deadline", async function () {
  // Contributor 1 contributes 5 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

  // Attempt to withdraw before the deadline (should fail)
  await expect(crowdfunding.connect(creator).withdrawFunds()).to.be.revertedWith("Funding goal has not been reached");
});
```

#### 7. Should prevent refunds before the deadline
Refunds should not be available until the campaign ends.
```js
it("should prevent refunds before the deadline", async function () {
  // Contributor 1 contributes 5 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

  // Attempt to refund before the campaign ends (should fail)
  await expect(crowdfunding.connect(contributor1).refundAll()).to.be.revertedWith("Campaign is still ongoing");
});
```

#### 8. Should accept multiple contributions from the same contributor
This test checks that a single contributor can make multiple contributions, and their total contribution is correctly tracked.
```js
it("should accept multiple contributions from the same contributor", async function () {
  // Contributor 1 contributes 5 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("5") });

  // Contributor 1 contributes an additional 3 ether
  await crowdfunding.connect(contributor1).contribute({ value: hre.ethers.parseEther("3") });

  // Total contribution for contributor 1 should be 8 ether
  expect(await crowdfunding.getContributorAmount(await contributor1.getAddress())).to.equal(hre.ethers.parseEther("8"));
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