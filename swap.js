const inquirer = require("inquirer");
const { setTimeout } = require("timers/promises");
const {
  Account,
  Aptos,
  AptosConfig,
  Network,
  Ed25519PrivateKey,
  PrivateKey,
} = require("@aptos-labs/ts-sdk");
const {
  RAW_PRIVATE_KEY,
  FULLNODE_URL,
  MOSIAC_ROUTER_ADDRESS,
  FREE_ARGS,
  PATHS
} = require("./config");

const formattedKey = PrivateKey.formatPrivateKey(RAW_PRIVATE_KEY, "ed25519");
const privateKey = new Ed25519PrivateKey(formattedKey);
const account = Account.fromPrivateKey({ privateKey });

const config = new AptosConfig({ network: Network.CUSTOM, fullnode: FULLNODE_URL });
const aptos = new Aptos(config);

async function swap({ toToken, amount }) {
  const route = PATHS[toToken];

  const txn = await aptos.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      function: `${MOSIAC_ROUTER_ADDRESS}::router::swap`,
      typeArguments: Array(15).fill(FREE_ARGS).map((x, i) => (i === 0 ? "0x1::aptos_coin::AptosCoin" : x)),
      functionArguments: [
        account.accountAddress,
        true, // is_exact_output
        [amount.toString()],
        route.steps,
        [],
        route.tokenIns,
        route.tokenOuts,
        "0x0", // receiver
        "0", // min_output
        false, // use_fungible_asset
        "0",
        "0",
        "mosaic-ui",
        "{\"cliSwap\":true}",
      ],
    },
  });

  const committedTxn = await aptos.signAndSubmitTransaction({
    signer: account,
    transaction: txn,
  });

  console.log(`🟡 Submitted TX: ${committedTxn.hash}`);
  await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
  console.log(`✅ Confirmed TX: ${committedTxn.hash}`);
}

async function main() {
  console.clear();
  console.log("🔁 MOVE → [USDT.e / USDC.e] Swap Tool (Movement Network)\n");

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "token",
      message: "Choose token to swap MOVE to:",
      choices: [
        { name: "USDT.e", value: "USDT" },
        { name: "USDC.e", value: "USDC" },
      ],
    },
    {
      type: "input",
      name: "amount",
      message: "Enter MOVE amount per swap (e.g., 0.1):",
      validate: (val) => (!isNaN(parseFloat(val)) && parseFloat(val) > 0) || "Enter a valid number.",
    },
    {
      type: "input",
      name: "repeat",
      message: "How many times do you want to swap?",
      validate: (val) => Number.isInteger(parseFloat(val)) && parseInt(val) > 0 || "Enter a valid number.",
    },
  ]);

  const times = parseInt(answers.repeat);
  const amount = Math.floor(parseFloat(answers.amount) * 1e8); // 8 decimals

  for (let i = 0; i < times; i++) {
    console.log(`\n🔁 Swapping ${answers.amount} MOVE → ${answers.token} [#${i + 1}]...`);
    await swap({ toToken: answers.token, amount });

    if (times > 1 && i < times - 1) {
      // 20s -> 45s
      const delay = Math.floor(Math.random() * 25000) + 20000;
      console.log(`⏳ Waiting ${Math.floor(delay / 1000)}s before next swap...\n`);
      await setTimeout(delay);
    }
  }

  console.log("\n🎉 Done all swaps.");
}

main().catch((e) => {
  console.error("❌ Error:", e);
});
