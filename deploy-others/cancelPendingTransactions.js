// // scripts/cancel-pending-transactions.js
// const hre = require("hardhat");

// async function cancelPendingTransactions(startingNonce, gasPrice) {
//   const { ethers } = hre;

//   // Obtén los named accounts usando el entorno de Hardhat
//   const { deployer } = await hre.getNamedAccounts();
//   const signer = await ethers.getSigner(deployer);

//   let nonce = startingNonce;
//   const txGasPrice = ethers.utils.parseUnits(gasPrice, 'gwei');

//   while (true) {
//     console.log(`Cancelando transacción con nonce: ${nonce}`);
//     try {
//       const tx = await signer.sendTransaction({
//         to: deployer,
//         value: ethers.utils.parseEther("0"),
//         gasPrice: txGasPrice,
//         nonce: nonce,
//       });

//       await tx.wait();
//       console.log(`Transacción cancelada: ${tx.hash}`);
//     } catch (error) {
//       console.error(`Error cancelando transacción con nonce ${nonce}: ${error}`);
//       // Si el nonce es demasiado alto o cualquier otro error, detén el bucle.
//       break;
//     }

//     nonce++;
//   }
// }

// async function main() {
//   const startingNonce = 2; // Ajusta a tu primer nonce pendiente
//   const recommendedGasPrice = "10"; // Ajusta basado en el estado actual de la red

//   await cancelPendingTransactions(startingNonce, recommendedGasPrice);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
