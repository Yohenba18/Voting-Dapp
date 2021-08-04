// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Hello {
    address public owner = msg.sender;
    uint256 public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function getowner() public view returns (address) {
        return owner;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }
}
