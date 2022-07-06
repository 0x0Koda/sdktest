import { ethers } from 'ethers';
import { Address } from 'cluster';
import routerAbi from "./utils/router.json";
//import { createTradeData } from "utils/contract"//

async function main() {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8500/2')
    
    const signer = new ethers.Wallet("86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d", provider);
    console.log('------------- signer:', signer)
    
    const squidAddress = '0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7'
    const squidImmutablesAbi = [
        'function tradeSend(string memory destinationChain, string memory destinationAddress, string memory symbol, bytes memory tradeData) external payable'
      ]   
    
    const squidContract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider)
    const squidContractWithSigner = new ethers.Contract(squidAddress, squidImmutablesAbi, signer)

    const contract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider);
    const contractWithSigner = contract.connect(signer);

        
    const destChain:string = "avalanche"
    const recipientAddress:string = "0x5F88eC396607Fc3edb0424E8E6061949e6b624e7"
    const symbol:string = "aUSDC"

    const path = [
      "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41",
      "0x8Ea02b04449d30Ebd47dbd4b4AfB21908743a195"
    ]

    const srcChain = {
      "id": 2502,
      "name": "ethereum",
      "network": "Ethereum Local",
      "icon": "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      "rpcUrls": {
        "default": "http://localhost:8500/2"
      },
      "multicallAddress": "0x559aa47A2214b59fFF6e55Bd43959aEC76679235",
      "gatewayAddress": "0x9c171a0a745B945eca5c386A5e296Aa614264a42",
      "swapExecutorAddress": "0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7",
      "routerAddress": "0x26F1AbdD6F8798C21f72f4B684aDaa2ad21C9FA2",
      "defaultCrosschainToken": "0x8Ea02b04449d30Ebd47dbd4b4AfB21908743a195",
      "wrappedNativeToken": "0x2C2D49edf7f69B0bd722E3298cc652b59878FD41",
      "distributionENSExecutableAddress": "0xb123d4aA48fC5012293cf4BFD3659277468e27Cf",
      "ensRegistryAddress": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      "nativeCurrency": {
        "name": "Ethereum",
        "symbol": "ETH",
        "decimals": 18
      },
      "testnet": true,
      "unsupported": false
    }

    const sendAmount:string = "100000000000000000"


    function getSwapRouterAbi() {
      return routerAbi;
    }

    function createSwapPayload(
      swapPath: string[],
      recipientAddress: string,
      amount: ethers.BigNumberish
    ) {
      const swapRouterAbi = getSwapRouterAbi()
      const swapFunctionName = "swapExactTokensForTokens"
    
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

    function createTradeData(
      swapPath: string[],
      chain:any,
      recipientAddress: string,
      amount: ethers.BigNumberish
    ) {
      const swapPayload = createSwapPayload(swapPath, recipientAddress, amount);
      return ethers.utils.defaultAbiCoder.encode(
        ["address", "uint256", "address", "bytes"],
        [swapPath[0], amount, chain.routerAddress, swapPayload]
      );
    }

    const srcTradeData:string = createTradeData(path,
      srcChain,
      srcChain.swapExecutorAddress,
      sendAmount)
  

    //const srcTradeData:string = "0x0000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd4100000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000026f1abdd6f8798c21f72f4b684adaa2ad21c9fa20000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000010438ed173900000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003c064ab6c35187e3d14d5bd8fb4c477eaa4bace70000000000000000000000000000000000000000000000000000000062be59be00000000000000000000000000000000000000000000000000000000000000020000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd410000000000000000000000008ea02b04449d30ebd47dbd4b4afb21908743a19500000000000000000000000000000000000000000000000000000000"
    const result = await(await squidContractWithSigner.tradeSend(destChain, recipientAddress,
      symbol, srcTradeData)).wait()
    console.log("printing restult of tradeSend:", result)

    const txHash = result.transactionHash
    console.log('transaction hash:', txHash)

}

main()