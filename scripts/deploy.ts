import { Bytes } from "ethers";
import { ethers, run, network } from "hardhat";

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);
	console.log("Deploying contract...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log("Deployed contract to: ", simpleStorage.address);

	// console.log(network.config.chainId);
	// console.log(process.env.ETHERSCAN_API_KEY);
	//check if the contract is deployed on local/hardhat network or actual online testnet/mainet
	if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
		console.log("Waiting for block confirmations");
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	const currentValue = await simpleStorage.retrieve();
	console.log("Current value: ", currentValue);
	const transactionResponse = await simpleStorage.store(32);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log("Updated value: ", updatedValue);
}

async function verify(contractAddress: string | Bytes, args: any) {
	console.log("Verifying contract...");
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e: any) {
		if (e.message.includes("already verified")) {
			console.log("Contract already verified");
		} else {
			console.log(e);
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
