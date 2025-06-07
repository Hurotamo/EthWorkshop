// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying Angel contract with the account:", deployer.address);

  const AngelFactory = await hre.ethers.getContractFactory("Angel");
  const angel = await AngelFactory.deploy();

  // Wait for the deployment to be mined
  await angel.deployTransaction?.wait();

  console.log("Angel deployed to:", angel.target ? angel.target : angel.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
