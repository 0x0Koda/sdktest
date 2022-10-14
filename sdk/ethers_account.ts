import { ethers } from "ethers";

const main = () => {
  let randomWallet = ethers.Wallet.createRandom();
  //console.log(randomWallet);
  console.log(randomWallet.address);
  console.log(randomWallet.privateKey);
};

main();
