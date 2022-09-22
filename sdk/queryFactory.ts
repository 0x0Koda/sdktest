import uniFactoryAbi from "./utils/uniFactory.json";
import { ethers } from "ethers";

// example script showing how much price impact swapping a small amount to dai (with no impact) compared to large amount

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/f88f2fdd3e1b40b18a48f3d3cf9b063e"
  );


  const uniFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const uniContract = new ethers.Contract(uniFactoryAddress, uniFactoryAbi, provider);

  const pairsLength = await uniContract.allPairsLength()
  console.log(pairsLength.toString())

  const pair = await uniContract.allPairs(2)

  console.log(pair)

}

main()