const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { expect } = require("chai")

describe("FundMe", async function() {
  let fundMe
  let mockV3Aggregator
  let deployer
  beforeEach(async function() {
    // deploy fundMe using hh-deploy => Mocks available
    // await deployments.fixture(["all"]) // ~ module.exports.tags = ["all", "fundme"]
    await deployments.fixture(["all"]) // => deploy all contracts in our local network by running our entire deploy folder with as many tags as we want
    // const accounts = await ethers.getSigners()
    // const accountZero = accounts[0] // here, the deployer
    // const { deployer } = await getNamedAccounts()
    deployer = (await getNamedAccounts()).deployer
    // get the most recent MockV3Aggregator contract from all deployed contracts,
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    // get the most recent fundMe contract from all deployed contracts, and connect the deployer account to it => every time we ll call fundMe, deployer account will be the one who calls by default
    fundMe = await ethers.getContract("FundMe", deployer)
  })

  describe("constructor", async function() {
    it("sets the aggregator address correctly", async function() {
      const response = await fundMe.priceFeed()
      expect(response).to.equal(mockV3Aggregator.address)
    })
  })
})
