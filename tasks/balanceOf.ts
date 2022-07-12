import { task } from "hardhat/config";

task("balanceOf", "Displays an account's balance")
  .addParam("ca", "The contract's address")
  .addParam("aa", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const LoopToken = await hre.ethers.getContractFactory(
      "LoopToken"
    );
    const loopToken = LoopToken.attach(taskArgs.ca);
    const balance = await loopToken.balanceOf(taskArgs.aa);
    const balanceToShow = Number(balance)/1000000000000000000;
    console.log("Account's balance:", balanceToShow.toString(), "LT");
  });
