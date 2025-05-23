// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AbstractCalculator.sol";

contract Calculator is AbstractCalculator {
    struct LastResult {
        uint256 a;
        uint256 b;
        uint256 result;
        string operation;
    }
    mapping(address => LastResult[]) public history;

    event Calculate(uint256 result);

    function calculate(uint a, uint b, string memory operation) public {
        uint256 cal_result;
        if (
            keccak256(abi.encodePacked(operation)) ==
            keccak256(abi.encodePacked("add"))
        ) {
            emit Calculate(add(a, b));
            cal_result = add(a, b);
        } else if (
            keccak256(abi.encodePacked(operation)) ==
            keccak256(abi.encodePacked("subtract"))
        ) {
            emit Calculate(subtract(a, b));
            cal_result = subtract(a, b);
        } else if (
            keccak256(abi.encodePacked(operation)) ==
            keccak256(abi.encodePacked("multiply"))
        ) {
            emit Calculate(multiply(a, b));
            cal_result = multiply(a, b);
        } else if (
            keccak256(abi.encodePacked(operation)) ==
            keccak256(abi.encodePacked("divide"))
        ) {
            emit Calculate(divide(a, b));
            cal_result = divide(a, b);
        } else {
            revert("Invalid operation");
        }

        history[msg.sender].push(
            LastResult({a: a, b: b, result: cal_result, operation: operation})
        );

        emit Calculate(cal_result);
    }

    function getLastResult(
        address user
    ) public view returns (LastResult memory) {
        require(history[user].length > 0, "No calculation history");
        return history[user][history[user].length - 1];
    }

    function getHistoryLength(address user) public view returns (uint256) {
        return history[user].length;
    }

    function getHistoryItem(
        address user
    ) public view returns (LastResult[] memory) {
        require(history[user].length > 0, "No calculation history");
        return history[user];
    }
}
