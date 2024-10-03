// SPDX-License-Identifier: UNLICENSED
// 21586
pragma solidity ^0.8.27;
import "hardhat/console.sol";

contract Crowdfunding {
    address public creator;     // The project creator
    uint public goal;           // The funding goal (in wei)
    uint public deadline;       // The time limit for reaching the goal
    uint public totalFunds;     // The total amount of funds raised
    bool public goalReached;    // Flag to track if the goal is reached
    bool public refunded;      // Flag to track if refunds have been processed
    string public title;         // title of the project
    string public description;  // Description of the project
    string public image;        // Image of the project

    mapping(address => uint) public contributions; // Tracks contributions per backer
    address[] public contributors;                 // List of contributors

    event ContributionReceived(address contributor, uint amount);
    event GoalReached(uint totalAmount);
    event FundsWithdrawn(address recipient, uint amount);
    event RefundIssued(address contributor, uint amount);

    // Modifier to ensure that only the creator can call certain functions
    modifier onlyCreator() {
        require(msg.sender == creator, "Only the creator can call this function");
        _;
    }

    // Modifier to ensure that the contract is still active (not expired or goal met)
    modifier stillActive() {
        require(block.timestamp <= deadline, "Crowdfunding campaign has ended");
        require(!goalReached, "Funding goal has been reached");
        _;
    }
    
    // Modifier to check if the campaign has failed
    modifier afterDeadline() {
        require(block.timestamp > deadline, "Campaign is still ongoing");
        require(!goalReached, "Goal was reached, no refunds available");
        _;
    }

    // Constructor to initialize contract parameters
    constructor(uint _goal, uint _durationInMinutes, string memory _title, string memory _description, string memory _image) {
        creator = msg.sender;
        title = _title;
        description = _description;
        image = _image;
        goal = _goal;
        deadline = block.timestamp + (_durationInMinutes * 1 minutes);
        goalReached = false;
    }

    // Function to contribute to the project
    function contribute() external payable stillActive {
        require(msg.value > 0, "Contribution must be greater than 0");
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }

        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;

        emit ContributionReceived(msg.sender, msg.value);

        // Check if the funding goal is reached
        if (totalFunds >= goal) {
            goalReached = true;
            emit GoalReached(totalFunds);
        }
    }

    // Function for the creator to withdraw funds if the goal is reached
    function withdrawFunds() external onlyCreator {
        require(goalReached, "Funding goal has not been reached");
        require(address(this).balance > 0, "No funds to withdraw");

        uint amount = address(this).balance;
        payable(creator).transfer(amount);

        emit FundsWithdrawn(creator, amount);
    }

    // Function for contributors to get a refund if the funding goal is not met by the deadline
    function claimRefund() external {
        require(block.timestamp > deadline, "Campaign is still ongoing");
        require(!goalReached, "Goal was reached, no refunds available");
        require(contributions[msg.sender] > 0, "No contributions found for this address");

        uint refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        payable(msg.sender).transfer(refundAmount);
        emit RefundIssued(msg.sender, refundAmount);
    }

    function refundAll() external afterDeadline {
        require(!refunded, "Refunds have already been processed");
    
        refunded = true; // Mark refunds as processed

        // Refund each contributor based on their contribution
        for (uint i = 0; i < contributors.length; i++) {
            address contributor = contributors[i];
            uint amount = contributions[contributor];

            if (amount > 0) {
                contributions[contributor] = 0;
                payable(contributor).transfer(amount);
                emit RefundIssued(contributor, amount);
            }
        }
    }
    
    function getContributors() external view returns (address[] memory) {
        return contributors;
    }

    function getContributorAmount(address contributor) external view returns (uint) {
        return contributions[contributor];
    }

    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }
}
