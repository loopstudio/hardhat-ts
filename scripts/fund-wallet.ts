import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, ethers, Wallet } from "ethers";
import hre from "hardhat";

/*
    1. Gets first unlocked account, print balance = 10000 ETH
    2. Create a new account
    3. Send 1 ether from first account to new one
  */
async function main() {
  const { ethers } = hre;

  // Get first unlocked account and print balance
  const firstAccount: SignerWithAddress = (await ethers.getSigners())[0];
  let firstAccountBalance: BigNumber = await ethers.provider.getBalance(
    firstAccount.address
  );

  console.log("First account address:", firstAccount.address);
  console.log(
    "First account balance:",
    ethers.utils.formatEther(firstAccountBalance)
  );

  // Create a new account
  const privateKey = Wallet.createRandom();
  const newAccount: Wallet = new ethers.Wallet(privateKey, ethers.provider);
  console.log("New account address:", newAccount.address);

  // Send 1 ether from first account to new one
  const tx: ethers.providers.TransactionResponse =
    await firstAccount.sendTransaction({
      to: newAccount.address,
      value: ethers.utils.parseEther("1"),
    });
  await ethers.provider.waitForTransaction(tx.hash);

  // Print final balances
  const newAccountBalance: BigNumber = await ethers.provider.getBalance(
    newAccount.address
  );
  firstAccountBalance = await ethers.provider.getBalance(firstAccount.address);

  console.log(
    "New account balance:",
    ethers.utils.formatEther(newAccountBalance)
  );
  console.log(
    "First account balance:",
    ethers.utils.formatEther(firstAccountBalance)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
