async function main() {
  // ** Deploy Colors **
  const Colors = await ethers.getContractFactory("Colors");
  const colors = await Colors.deploy();
  console.log("Colors deployed:", colors.address);

  // ** Deploy Cranes **
  const Cranes = await ethers.getContractFactory("Cranes");
  const cranes = await Cranes.deploy();
  console.log("Cranes deployed:", cranes.address);


  // ** Deploy Rustaceans **
  const Rustaceans = await ethers.getContractFactory("Rustaceans", {
    libraries: { Colors: colors.address },
  });
  const rustaceans = await Rustaceans.deploy();
  console.log("Rustaceans deployed:", rustaceans.address);

  // ** Set Cranes Deployed Address in Rustaceans **
  await rustaceans.setCranes(cranes.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
