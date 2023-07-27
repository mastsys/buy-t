async function main() {
  const deployedContract = await ethers.deployContract("PropertyToken");

  await deployedContract.waitForDeployment();

  console.log("Property Token Contract Address:", await deployedContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  