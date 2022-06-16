import hre from "hardhat";

async function main() {
  const { ethers } = hre;
  console.log(await ethers.provider.getBlockNumber());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
