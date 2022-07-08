import axios from "axios";

//const srcTxsId:string = "0xb82859a08dced28c77ae70ac5a302888fc92e3e90d492ee678fc428f0b1b17cc"
async function main(srcTxsId: string) {
  axios({
    method: "get",
    url: `https://testnet.api.gmp.axelarscan.io/?method=searchGMP&txHash=${srcTxsId}`,
  }).then((apiResponse) => {
    // process the response
    const data = apiResponse.data;
    console.log(data.data[0]);
  });
}

main("0x940acb9584a434360530ba95d4fecbdd65392a0f86a0deed43c9ae4b95868960");
