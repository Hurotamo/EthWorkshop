// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract DavaoEthWorksopBase is ERC20, Ownable {
    event TokenSentToAddress(address indexed sender, address indexed recipient, uint256 amount);
    event AddressFrozen(address indexed addr);
    event AddressUnfrozen(address indexed addr);

    mapping(address => bool) private _frozen;

    constructor(uint256 initialSupply, address ownerAddress) ERC20("DavaoEthWorksop", "DEW") Ownable(ownerAddress) {
         _mint(ownerAddress, initialSupply);
    }

    function generateTokens(address destination, uint256 amount) public {
         _mint(destination, amount);
    }

    function burn(uint256 amount) public {
        require(msg.sender != owner(), "Owner cannot burn tokens");
        _burn(msg.sender, amount);
    }

    function freezeAddress(address addr) external onlyOwner {
        require(balanceOf(addr) > 0, "Address must hold tokens to be frozen");
        require(!_frozen[addr], "Address is already frozen");
        _frozen[addr] = true;
        emit AddressFrozen(addr);
    }

    function unfreezeAddress(address addr) external onlyOwner {
        require(_frozen[addr], "Address is not frozen");
        _frozen[addr] = false;
        emit AddressUnfrozen(addr);
    }

    function isFrozen(address addr) public view returns (bool) {
        return _frozen[addr];
    }

    function _beforeTokenTransfer(address from, address to, uint256 /*amount*/) internal virtual {
        require(!_frozen[from], "Sender address is frozen");
        require(!_frozen[to], "Recipient address is frozen");
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {
        emit TokenSentToAddress(from, to, amount);
    }
}
