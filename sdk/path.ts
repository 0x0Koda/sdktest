const routes = {
  //env filter
  ["local"]: [
    {
      //chain filter
      ["Avalanche"]: [
        {
          //filter on token address
          tokenAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // to or from token (either source or dest)
          symbol: "WAVAX",
          route: [
            // this array is read forward (for destiontion path) or backwards (for source path) depending on trade direction
            {
              dex: "curve",
              path: ["0xaxlUSDC", "0xUSDC"],
            },
            {
              dex: "pangolin",
              path: [
                "0x0USDC",
                // "0x0", possible 3 swap
                "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", //WAVAX
              ],
            },
          ],
        },
      ],
    },
  ],
};
