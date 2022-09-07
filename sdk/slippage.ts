import uniAbi from "./utils/router.json";
import { ethers } from "ethers";

// example script showing how much price impact swapping a small amount to dai (with no impact) compared to large amount

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/f88f2fdd3e1b40b18a48f3d3cf9b063e"
  );
  const uniRouterAdress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const multiplier = 200000; // used to compare a swap without price impact with a swap with price impact
  const amountSmall = ethers.utils.parseEther("1"); //this can be set to the smallest amount possible as to no cause any price impact, using 1 cause i'm lazy
  const amountLarge = ethers.utils.parseEther(multiplier.toString());

  const uniPath = [dai, weth];
  const uniContract = new ethers.Contract(uniRouterAdress, uniAbi, provider);

  const exchageRate = (
    await uniContract.getAmountsOut(amountSmall, uniPath)
  )[1]; //this will get the exchange rate without price impact, use the smallest amount possible
  const swapResult = (await uniContract.getAmountsOut(amountLarge, uniPath))[1]; //the actuall amount you are getting a quote for

  const exchangeRateDecimals = ethers.utils.formatEther(exchageRate); // exchange rate in decimal format
  const swapWithoutPriceImpace = parseFloat(exchangeRateDecimals) * multiplier; // what the swap out amount would be if there was no price impact.. this is key

  const swapResultDecimals = parseFloat(ethers.utils.formatEther(swapResult));

  const percDiff =
    ((swapWithoutPriceImpace - swapResultDecimals) / swapWithoutPriceImpace) *
    100; // price impact as a percentage

  console.log("exchange rate: ", exchangeRateDecimals.toString());
  console.log("swap without price impact: ", swapWithoutPriceImpace.toString());
  console.log("actual swap estimate: ", swapResultDecimals.toString());
  console.log("price impact (percent diff): ", percDiff);
}

main();
