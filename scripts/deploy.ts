// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { isAddress } from "@ethersproject/address";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LoopToken = await ethers.getContractFactory("LoopToken");
  const loopToken = await LoopToken.deploy("LoopToken", "LT", '1000000000000000000000');

  await loopToken.deployed();
  console.log("LoopToken deployed to:", loopToken.address);
  console.log("Name:", await loopToken.name());
  console.log("Symbol:", await loopToken.symbol());
  console.log("Supply:", await (await loopToken.totalSupply()).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
