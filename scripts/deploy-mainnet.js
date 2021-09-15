async function main() {
  // TODO: get deployed colors address
  const DEPLOYED_COLORS_ADDRESS = 0x0;
  const DEPLOYED_CRANES_ADDRESS = 0xc3F5E8A98B3d97f19938E4673Fd97C7cfd155577;

  const Rustaceans = await ethers.getContractFactory("Rustaceans", {
    libraries: { Colors: DEPLOYED_COLORS_ADDRESS },
  });
  const rustaceans = await Rustaceans.deploy();
  console.log("Rustaceans deployed:", rustaceans.address);

  // ** Set Cranes Deployed Address in Rustaceans **
  await rustaceans.setCranes(DEPLOYED_CRANES_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
