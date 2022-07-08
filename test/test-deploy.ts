import { assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
	let simpleStorage: SimpleStorage,
		simpleStorageFactory: SimpleStorage__factory;
	this.beforeEach(async function () {
		simpleStorageFactory = (await ethers.getContractFactory(
			"SimpleStorage"
		)) as SimpleStorage__factory;
		simpleStorage = await simpleStorageFactory.deploy();
	});
	it("Should start with favourite number 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";
		assert.equal(currentValue.toString(), expectedValue);
	});

	it("Should update when store is called", async function () {
		const expectedValue = "12";
		const transactionResponse = await simpleStorage.store(expectedValue);
		transactionResponse.wait(1);
		const newValue = await simpleStorage.retrieve();
		assert.equal(newValue.toString(), expectedValue);
	});
});
