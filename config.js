// config.js
module.exports = {
  RAW_PRIVATE_KEY: "YOUR_PRIVATE_KEY",
  FULLNODE_URL: "https://full.mainnet.movementinfra.xyz/v1",
  MOSIAC_ROUTER_ADDRESS:
    "0x3f7399a0d3d646ce94ee0badf16c4c3f3c656fe3a5e142e83b5ebc011aa8b3d",
  FREE_ARGS:
    "0x3f7399a0d3d646ce94ee0badf16c4c3f3c656fe3a5e142e83b5ebc011aa8b3d::router::Null",

  PATHS: {
    USDT: {
      steps: ["1", "7", "1", "0", "0"],
      tokenIns: [
        "0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d"
      ],
      tokenOuts: [
        "0x02e5656461c6c9728e887dea8041928f37d41a08057f78a61b2a446d91dd4ebd"
      ]
    },
    USDC: {
      steps: [
        "1",
        "7",
        "1",
        "0",
        "0",
        "18446744073709551614",
        "3",
        "9",
        "0",
        "1",
        "1"
      ],
      tokenIns: [
        "0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d",
        "0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39"
      ],
      tokenOuts: [
        "0x2e5656461c6c9728e887dea8041928f37d41a08057f78a61b2a446d91dd4ebd",
        "0x54c89a961dd60e30f1c03ba2c6f5a052e7ed0ba36fcca3c1153f06449199b285"
      ]
    }
  }
};
