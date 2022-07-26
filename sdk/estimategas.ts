import {
    AxelarQueryAPI,
    EvmChain,
    GasToken,
    Environment
} from "@axelar-network/axelarjs-sdk";
import { mainModule } from "process";
import { BigNumber, ethers } from "ethers";

const sdk = new AxelarQueryAPI({
    environment: Environment.TESTNET,
});

async function getGasEstimate() {
    // (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which sufficients for most transaction.
    const estimateGasUsed = 400000;

    // Returns avax amount to pay gas
    const gasFee = await sdk.estimateGasFee(
        EvmChain.ETHEREUM,
        EvmChain.AVALANCHE,
        GasToken.ETH,
        estimateGasUsed
    );
    console.log(gasFee)
}

getGasEstimate()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });