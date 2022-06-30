import { ethers } from 'ethers'
import { Address } from 'cluster'


async function main() {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8500/2')
    //console.log(provider)
    
    //const signer = provider.getSigner();
    //console.log(process.env.PRIVATE_KEY)
    
    const signer = new ethers.Wallet("86e04a5bc443e94b64883f5ba70f7dd4d083606ce49a43e171d2bde4d39be36d", provider);
    console.log('------------- signer:', signer)
    
    const squidAddress = '0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7'
    //console.log(squidAddress)
    
    const squidImmutablesAbi = [
        'function greet() public view returns(string)',
        'function setGreeting(string memory _greeting) public',
        'function tradeSend(string memory destinationChain, string memory destinationAddress, string memory symbol, bytes memory tradeData) external payable'
      ]
    //console.log(squidImmutablesAbi)
    
    
    const squidContract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider)
    const squidContractWithSigner = new ethers.Contract(squidAddress, squidImmutablesAbi, signer)

    const contract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider);
    const contractWithSigner = contract.connect(signer);
    //console.log('squid contract is:', squidContract)


  /*   //console.log('about to send transaction')
    const txsGreet = await squidContract.greet()
    console.log('greet txs:', txsGreet)


    const txsUpdateGreet = await squidContractWithSigner.setGreeting('ffff')
    console.log('greet txs:', txsUpdateGreet)
    //console.log('about to send transaction')
    const txsGreetUpdate = await squidContract.greet()
    console.log('greet txs:', txsGreetUpdate) */

    
    const destChain:string = "avalanche"
    const recipientAddress:string = "0x5F88eC396607Fc3edb0424E8E6061949e6b624e7"
    const symbol:string = "aUSDC"
    const srcTradeData:string = "0x0000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd410000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000026f1abdd6f8798c21f72f4b684adaa2ad21c9fa20000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000010438ed17390000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003c064ab6c35187e3d14d5bd8fb4c477eaa4bace70000000000000000000000000000000000000000000000000000000062bd6a5d00000000000000000000000000000000000000000000000000000000000000020000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd410000000000000000000000008ea02b04449d30ebd47dbd4b4afb21908743a19500000000000000000000000000000000000000000000000000000000"
    //const blah = ethers.utils.formatBytes32String("0000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd410000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000026f1abdd6f8798c21f72f4b684adaa2ad21c9fa20000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000010438ed17390000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003c064ab6c35187e3d14d5bd8fb4c477eaa4bace70000000000000000000000000000000000000000000000000000000062bd274000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002c2d49edf7f69b0bd722e3298cc652b59878fd410000000000000000000000008ea02b04449d30ebd47dbd4b4afb21908743a19500000000000000000000000000000000000000000000000000000000")
    //const result = await(await squidContractWithSigner.tradeSend(destChain, recipientAddress,
    //  symbol, srcTradeData)).wait()
    //console.log("printing restult of tradeSend:", result)


    const tx = contractWithSigner.tradeSend(destChain, recipientAddress,
      symbol, srcTradeData);
    //console.log('------------- signer:', signer.getAddress())
    //console.log('about to send transaction')

}

main()