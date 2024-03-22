module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const sushi = await ethers.getContract("SushiToken")

  const startBlock = 971851         // 970501 + 1350
  const endBlock = startBlock + (43200 * 14) // 43200 is approx blocks per day
  const { address } = await deploy("MasterChef", {
    from: deployer,
    args: [sushi.address, dev, "100000000000000000000", "0", endBlock],
    log: true,
    deterministicDeployment: false
  })

  const txOptions = {
    gasPrice: 50000000000,
    gasLimit: 5000000,
  }

  if (await sushi.owner() !== address) {
    // Transfer Sushi Ownership to Chef
    console.log("Transfer Sushi Ownership to Chef")
    await (await sushi.transferOwnership(address, txOptions)).wait()
  }

  const masterChef = await ethers.getContract("MasterChef")
  console.log("dev:                ", dev);
  console.log("deployer:           ", deployer);
  console.log("masterChef.owner(): ", (await masterChef.owner()));

  // if (await masterChef.owner() !== dev) {
  if (await masterChef.owner() === deployer) {
    // Transfer ownership of MasterChef to dev
    console.log("Transfer ownership of MasterChef to dev");
    await (await masterChef.transferOwnership(dev, txOptions)).wait()
  }
}

module.exports.tags = ["MasterChef"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "SushiToken"]
