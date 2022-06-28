import { ethers } from 'ethers'
import { Address } from 'cluster'


async function main() {
    console.log('--------- Enter main function')
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    console.log(provider)
    
    const signer = provider.getSigner();
    
    
    const squidAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
    console.log(squidAddress)
    
    console.log('trying to get abi')
    const squidImmutablesAbi = [
        "function greet() public view returns (string memory)", 
        'function setGreeting(string memory _greeting) public'
      ]
    console.log('abi is:', squidImmutablesAbi)
    
    console.log('--- trying to get contract')
    const squidContract = new ethers.Contract(squidAddress, squidImmutablesAbi, provider)
    console.log('squid contract is:', squidContract)
    
    console.log('about to send transaction')
    const txsGreet = await squidContract.greet()
    console.log('greet txs:', txsGreet)
    
    const squidContractWithSigner = new ethers.Contract(squidAddress, squidImmutablesAbi, signer)
    const txsUpdateGreet = await squidContractWithSigner.setGreeting('ffff')
    console.log('greet txs:', txsUpdateGreet)
    console.log('about to send transaction')
    const txsGreetUpdate = await squidContract.greet()
    console.log('greet txs:', txsGreetUpdate)
    
}

main()