// Script to mint an NFT from the deployed Angel contract

const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  // Replace with your deployed Angel contract address
  const angelAddress = "0x2277F0a2Ac33dD835992f73368b7a292fCc4F370";


  const Angel = await hre.ethers.getContractFactory("Angel");
  const angel = Angel.attach(angelAddress);

  console.log("Minting NFT from Angel contract with account:", signer.address);

  // Replace with the tokenURI for the NFT you want to mint
  const tokenURI = "https://rose-imaginative-lion-87.mypinata.cloud/ipfs/bafkreihbdlxosbk3r4exo4erkk7vyrshnokxcwdvojm6pufjigxnvvqfpe/metadata.json";

  const tx = await angel.mintNFT(tokenURI);
  await tx.wait();

  console.log("NFT minted successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
