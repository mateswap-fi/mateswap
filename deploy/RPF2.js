 module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("RPF", {
    from: deployer,
    args: ["RPF2", "RPF2", "1"],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["RPF2"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
