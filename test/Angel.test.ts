import { expect } from "chai";
import { ethers } from "hardhat";

describe("Angel ERC721 Contract", function () {
  let AngelFactory;
  let angel: any;
  const tokenURI = "https://rose-imaginative-lion-87.mypinata.cloud/ipfs/bafkreihbdlxosbk3r4exo4erkk7vyrshnokxcwdvojm6pufjigxnvvqfpe";

  beforeEach(async function () {
    AngelFactory = await ethers.getContractFactory("Angel");
    angel = await AngelFactory.deploy();
  });

  it("Should mint a new NFT and assign it to the caller", async function () {
    const [owner] = await ethers.getSigners();
    const mintTx = await angel.mintNFT(tokenURI);
    const receipt = await mintTx.wait();

    // The tokenId should be 1 for the first mint
    const tokenId = 1;
    expect(await angel.ownerOf(tokenId)).to.equal(owner.address);
  });

  it("Should set the correct token URI", async function () {
    const mintTx = await angel.mintNFT(tokenURI);
    await mintTx.wait();

    const tokenId = 1;
    expect(await angel.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("Should not allow minting more than max supply", async function () {
    const [owner] = await ethers.getSigners();

    // Mint up to max supply
    for (let i = 0; i < 10; i++) {
      const mintTx = await angel.mintNFT(tokenURI);
      await mintTx.wait();
      expect(await angel.ownerOf(i + 1)).to.equal(owner.address);
    }

    // Attempt to mint the 11th NFT and expect revert
    await expect(angel.mintNFT(tokenURI)).to.be.revertedWith("Max supply reached");
  });
});
