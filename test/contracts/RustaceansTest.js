const fs = require("fs");
const { cwd } = require("process");
const { expect } = require("chai");
const { beforeEach } = require("mocha");

describe("Rustaceans", function () {
  let contract;
  let cranes;
  let owner;
  let wallet1;
  let wallet2;

  beforeEach(async function () {
    // ** Deploy the Colors Contract **
    const ColorsContract = await hre.ethers.getContractFactory("Colors");
    const colors = await ColorsContract.deploy();

    // ** Deploy the Cranes Contract **
    const CranesContract = await hre.ethers.getContractFactory("Cranes", {
      libraries: { Colors: colors.address },
    });
    cranes = await CranesContract.deploy();

    // ** Deploy the Rustaceans Contract **
    const RustaceansContract = await hre.ethers.getContractFactory("Rustaceans", {
      libraries: { Colors: colors.address },
    });
    contract = await RustaceansContract.deploy();

    // ** Set Cranes Deployed Address in Rustaceans **
    await contract.setCranes(cranes.address);

    [owner, wallet1, wallet2] = await hre.ethers.getSigners();
  });

  it("has name and symbol", async function () {
    expect(await contract.name()).to.equal("Rustaceans");
    expect(await contract.symbol()).to.equal("RUST");
  });

  it("has a grand total and a yearly total", async function () {
    // ** First we need to mint a Crane
    await cranes.mint(wallet1.address);
    expect(await contract.totalSupply()).to.equal(0);
    expect(await contract.currentYearTotalSupply()).to.equal(0);
    await contract.mint(owner.address);
    expect(await contract.totalSupply()).to.equal(1);
    expect(await contract.currentYearTotalSupply()).to.equal(1);
  });

  it("can be minted by owner", async function () {
    // ** First we need to mint a Crane
    await cranes.mint(wallet1.address);
    // ** Then we can mint a Rustacean
    await contract.mint(owner.address);
    expect(await contract.balanceOf(owner.address)).to.equal(1);
  });

  it("throws when a enough cranes aren't minted", async function () {
    const contractAsWallet = await contract.connect(wallet1);
    expect(
      contractAsWallet.craftForSelf({
        value: ethers.utils.parseEther("1"),
      })
    ).to.be.revertedWith("ERC721: owner query for nonexistent token");
  });

  it("can be crafted by anyone for themselves", async function () {
    // ** First let's mint cranes
    await cranes.mint(wallet2.address);
    await cranes.mint(wallet2.address);
    const contractAsWallet = await contract.connect(wallet1);
    await contractAsWallet.craftForSelf({
      value: ethers.utils.parseEther("0.02"),
    });
    expect(await contract.balanceOf(owner.address)).to.equal(0);
    expect(await contract.balanceOf(wallet1.address)).to.equal(1);
  });

  it("throws when price is too low", async function () {
    // ** First we need to mint a Crane
    await cranes.mint(wallet1.address);
    const contractAsWallet = await contract.connect(wallet1);
    expect(
      contractAsWallet.craftForSelf({
        value: ethers.utils.parseEther("0.0002"),
      })
    ).to.be.revertedWith("PRICE_NOT_MET");

    expect(
      contractAsWallet.craftForFriend(wallet2.address, {
        value: ethers.utils.parseEther("0.0002"),
      })
    ).to.be.revertedWith("PRICE_NOT_MET");
  });

  it("can be crafted by anyone for someone else", async function () {
    // ** First let's mint cranes
    await cranes.mint(wallet2.address);
    await cranes.mint(wallet2.address);
    const contractAsWallet = await contract.connect(wallet1);
    const token = await contractAsWallet.craftForFriend(wallet2.address, {
      value: ethers.utils.parseEther("0.02"),
    });
    expect(await contract.balanceOf(owner.address)).to.equal(0);
    expect(await contract.balanceOf(wallet1.address)).to.equal(0);
    expect(await contract.balanceOf(wallet2.address)).to.equal(1);
  });

  it("has a tokenUri", async function () {
    // ** First let's mint cranes
    await cranes.mint(wallet2.address);
    await cranes.mint(wallet2.address);

    const i = 0;
    const token = await contract.mint(owner.address);
    const uri = await contract.tokenURI(i);
    expect(uri).to.match(/^data:/);

    const [pre, base64] = uri.split(",");
    const json = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    expect(json["image"]).to.match(/^data:image\/svg/);

    const svg = Buffer.from(json["image"].split(",")[1], "base64").toString(
      "utf-8"
    );
    fs.writeFileSync(`./tmp/last-${i}.svg`, svg);
    console.log(cwd() + `/tmp/last-${i}.svg`);
  });

  it("can update its price", async function () {
    // ** First let's mint cranes
    await cranes.mint(wallet2.address);
    await cranes.mint(wallet2.address);

    const contractAsWallet = await contract.connect(wallet1);
    await contractAsWallet.craftForSelf({
      value: ethers.utils.parseEther("0.02"),
    });

    contract.setPrice(ethers.utils.parseEther("0.1"));

    expect(
      contractAsWallet.craftForSelf({
        value: ethers.utils.parseEther("0.002"),
      })
    ).to.be.revertedWith("PRICE_NOT_MET");
  });

  it("can update its developmentFee", async function () {
    // ** First let's mint cranes
    await cranes.mint(wallet1.address);
    await cranes.mint(wallet1.address);
    const contractAsWallet = await contract.connect(wallet1);
    await contractAsWallet.craftForSelf({
      value: ethers.utils.parseEther("0.02"),
    });

    contract.setDevelopmentFee(ethers.utils.parseEther("0.003"));

    // price of 0.018 + new 0.003 = 0.021
    // so this should fail
    expect(
      contractAsWallet.craftForSelf({
        value: ethers.utils.parseEther("0.02"),
      })
    ).to.be.revertedWith("PRICE_NOT_MET");
  });
});
