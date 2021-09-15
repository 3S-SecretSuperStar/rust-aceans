async function main() {
  const Colors = await ethers.getContractFactory("Colors");
  const colors = await Colors.deploy();
  console.log("Colors deployed:", colors.address);

  const Rustaceans = await ethers.getContractFactory("Rustaceans", {
    libraries: { Colors: colors.address },
  });
  const rustaceans = await Rustaceans.deploy();
  console.log("Rustaceans deployed:", rustaceans.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
