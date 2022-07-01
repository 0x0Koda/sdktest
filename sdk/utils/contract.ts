import { Contract, ethers } from "ethers";

export function createSwapPayload(
    swapPath: string[],
    recipientAddress: string,
    amount: ethers.BigNumberish
  ) {
    const swapRouterAbi = getSwapRouterAbi();
    const swapFunctionName = getSwapFunctionName();
  
    const iface = new ethers.utils.Interface(swapRouterAbi);
    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 20;
    const swapPayload = iface.encodeFunctionData(swapFunctionName, [
      ethers.BigNumber.from(amount),
      0,
      swapPath,
      recipientAddress,
      deadline,
    ]);
  
    return swapPayload;
  }
  
  export function createTradeData(
    swapPath: string[],
    chain: SquidChain,
    recipientAddress: string,
    amount: ethers.BigNumberish
  ) {
    const swapPayload = createSwapPayload(swapPath, recipientAddress, amount);
    return ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "address", "bytes"],
      [swapPath[0], amount, chain.routerAddress, swapPayload]
    );
  }

  const getPath = (address :string, wrappedNativeTokenAddress:string, crosschainTokenAddress:string) => {

    // Check if user selected token is eq to wrappedNativeToken on source
    if (address === wrappedNativeTokenAddress) {
      return [
        address,
        crosschainTokenAddress,
      ]
    }

    // Check if user selected token is eq to wrappedNativeToken on dest
    if (wrappedNativeTokenAddress === crosschainTokenAddress) {
      return [
        address,
        wrappedNativeTokenAddress
      ]
    }

    return [
      address,
      wrappedNativeTokenAddress,
      crosschainTokenAddress,
    ]
  }