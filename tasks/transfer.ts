import { task } from "hardhat/config";

task("transfer", "Transfers a given amount to a specific address")
  .addParam("ca", "The contract's address")
  .addParam("aa", "The account's address")
  .addParam("a", "The given amount")
  .setAction(async (taskArgs, hre) => {
    const LoopToken = await hre.ethers.getContractFactory(
      "LoopToken"
    );
    const loopToken = LoopToken.attach(taskArgs.ca);
    const amount = (taskArgs.a*1000000000000000000).toString();
    const transfer = await loopToken.transfer(taskArgs.aa, amount);
    if (transfer) {
      console.log("Transaction completed:");
      console.log("Transferred:", taskArgs.a, "LT to:", taskArgs.aa);
    };
  });
