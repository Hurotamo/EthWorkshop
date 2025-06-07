// SPDX-License-Identifier: MIT


pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Angel is ERC721URIStorage {

    uint private _tokenIds;
    uint public constant maxSupply = 10;

    constructor() ERC721("Angel", "Angel") {}

    function mintNFT(string memory tokenURI) public returns (uint256) {
        require(_tokenIds < maxSupply, "Max supply reached");
        _tokenIds++;
        uint newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}


