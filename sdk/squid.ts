import { ethers } from 'ethers'
import { Address } from 'cluster'


async function main() {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8500/2')
    console.log(provider)
    
    const signer = provider.getSigner();
    
    
    const squidAddress = '0x3C064aB6c35187e3D14D5bD8FB4c477EAA4bace7'
    console.log(squidAddress)
    
    const squidImmutablesAbi = [
        //'function greet() public view returns(string)',
        'function tradeSend() external payable'
      ]
    console.log(squidImmutablesAbi)
    
    
    const squidContract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider)
    console.log('squid contract is:', squidContract)


    //console.log('about to send transaction')
    //const txsGreet = await squidContract.greet()
    //console.log('greet txs:', txsGreet)
    
    const squidContractWithSigner = new ethers.Contract(squidAddress, squidImmutablesAbi, signer)
    const result = await(await squidContractWithSigner.tradeSend()).wait()
    console.log(result)
    
    //console.log('about to send transaction')

}

main()