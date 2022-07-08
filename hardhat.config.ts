import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";
import "./tasks/block-number";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@typechain/hardhat";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
// 	const accounts = await hre.ethers.getSigners();

// 	for (const account of accounts) {
// 		console.log(await account.address);
// 	}
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEDBY_RPC_URL = process.env.RINKEDBY_RPC_URL || "https://eth-rinkedby";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";
export default {
	defaultNetwork: "hardhat",
	networks: {
		rinkedby: {
			url: RINKEDBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4,
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			// accounts are placed by hardhat
			chainId: 31337,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		token: "ETH",
	},
	solidity: "0.8.7",
};
