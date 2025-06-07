// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./erc20.sol";

contract DavaoEthWorksop is DavaoEthWorksopBase {
    constructor(uint256 initialSupply, address ownerAddress) DavaoEthWorksopBase(initialSupply, ownerAddress) {
    }

    // Override _beforeTokenTransfer and _afterTokenTransfer with override keyword
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        // Add custom logic here
        super._beforeTokenTransfer(from, to, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        // Add custom logic here
        super._afterTokenTransfer(from, to, amount);
    }
}
