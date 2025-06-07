// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DavaoEthWorksop.sol";

contract DavaoEthGame is Ownable {
    DavaoEthWorksop public davaoToken;
    uint256 public entryFee = 10 * 10 ** 18;

    address[] public players;

    constructor(DavaoEthWorksop _davaoToken, address initialOwner) Ownable(initialOwner) {
        davaoToken = _davaoToken;
    }

    function joinGame() external {
        require(
            davaoToken.transferFrom(msg.sender, address(this), entryFee),
            "Payment failed"
        );
        players.push(msg.sender);
    }

    function getPlayers() external view returns (address[] memory) {
        return players;
    }

    function withdrawFees(address to) external onlyOwner {
        uint256 balance = davaoToken.balanceOf(address(this));
        require(davaoToken.transfer(to, balance), "Transfer failed");
    }
}
