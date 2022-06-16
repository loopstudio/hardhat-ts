import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "ethers";
import hre from "hardhat";

async function main() {
  const { ethers } = hre;
  const unlockedSigner: SignerWithAddress = (await ethers.getSigners())[0];

  console.log("Unlocked signer address:", unlockedSigner.address);
  console.log(
    "Unlocked signer balance:",
    (await unlockedSigner.getBalance()).toString()
  );

  const wallet: Wallet = Wallet.createRandom();
  const newSigner = new ethers.Wallet(wallet, ethers.provider);

  console.log("New signer address:", newSigner.address);
  const tx = await unlockedSigner.sendTransaction({
    to: newSigner.address,
    value: ethers.utils.parseEther("1"),
  });

  await ethers.provider.waitForTransaction(tx.hash);

  const newSignerBalance = await ethers.provider.getBalance(newSigner.address);
  console.log("New signer balance:", newSignerBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
