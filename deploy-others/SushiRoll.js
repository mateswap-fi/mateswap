const YODESWAP_ROUTER = new Map()
YODESWAP_ROUTER.set("2000", "0xa194133ED572D86fe27796F2feADBAFc062cB9E0")
YODESWAP_ROUTER.set("568", "0x221C2c57B0dAec7aF9A3B03c384c0C99e066b612")

module.exports = async function ({ getNamedAccounts, getChainId, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const chainId = await getChainId()

  if (!YODESWAP_ROUTER.has(chainId)) {
    throw Error("No Uniswap Router")
  }

  const benswapRouterAddress = YODESWAP_ROUTER.get(chainId)

  const sushiswapRouterAddress = (await deployments.get("UniswapV2Router02")).address

  await deploy("SushiRoll", {
    from: deployer,
    args: [benswapRouterAddress, sushiswapRouterAddress],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["SushiRoll"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
