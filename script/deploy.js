// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Deploy DavaoEthWorksop token contract
  const initialSupply = 10000000000000000000000000000n; // 10^28
  const DavaoEthWorksopFactory = await hre.ethers.getContractFactory("DavaoEthWorksop");
  const davaoEthWorksop = await DavaoEthWorksopFactory.deploy(initialSupply, deployer.address);
  await davaoEthWorksop.deployed();
  console.log(`DavaoEthWorksop deployed to: ${davaoEthWorksop.address}`);

  // Deploy DavaoEthGame contract with token address and deployer address
  const DavaoEthGameFactory = await hre.ethers.getContractFactory("DavaoEthGame");
  const davaoEthGame = await DavaoEthGameFactory.deploy(davaoEthWorksop.address, deployer.address);
  await davaoEthGame.deployed();
  console.log(`DavaoEthGame deployed to: ${davaoEthGame.address}`);

  // Deploy Lock with unlockTime = current time + 1 day
  const LockFactory = await hre.ethers.getContractFactory("Lock");
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const unlockTime = currentTimestamp + 24 * 60 * 60; // +1 day in seconds
  const lock = await LockFactory.deploy(unlockTime, { value: hre.ethers.utils.parseEther("1") }); // sending 1 ether
  await lock.deployed();
  console.log(`Lock deployed to: ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
