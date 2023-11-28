const fs = require("fs")
const { ethers, run, network } = require("hardhat")

const scripts = `scripts/launch/launch.json`
const data = fs.readFileSync(scripts, "utf8")
const jsonContent = JSON.parse(data)

let contractAddress
let blockNumber
let Verified = false

async function VirtueQuestDeploy() {
    const constructorParam = jsonContent.constructorParams

    const VirtueQuestFactory = await hre.ethers.getContractFactory("VirtueQuest")
    const VirtueQuest = await VirtueQuestFactory.deploy(
        constructorParam.param1,
        constructorParam.param2,
        constructorParam.param3,
    )

    await VirtueQuest.deployed()
    console.log("VirtueQuest Deployed to: ", VirtueQuest.address)

    contractAddress = VirtueQuest.address
    blockNumber = VirtueQuest.provider._maxInternalBlockNumber
    
    /// VERIFY
    if (hre.network.name != "hardhat") {
        await VirtueQuest.deployTransaction.wait(6)
        await verify(VirtueQuest.address, [
            constructorParam.param1,
            constructorParam.param2,
            constructorParam.param3
        ])
    }
}

async function VirtueQuestNFTDeploy() {
    const constructorParam = jsonContent.constructorParams
    const VirtueQuestNFTFactory = await hre.ethers.getContractFactory("VirtueQuestNFT")
    const VirtueQuestNFT = await VirtueQuestNFTFactory.deploy(
        constructorParam.param1,
        constructorParam.param2,
        constructorParam.param3,
        constructorParam.param4,
    )
    await VirtueQuestNFT.deployed()
    console.log("VirtueQuestNFT Deployed to:", VirtueQuestNFT.address)
    contractAddress = VirtueQuestNFT.address
    blockNumber = VirtueQuestNFT.provider._maxInternalBlockNumber
    /// VERIFY
    if (hre.network.name != "hardhat") {
        await VirtueQuestNFT.deployTransaction.wait(6)
        await verify(VirtueQuestNFT.address, [
            constructorParam.param1,
            constructorParam.param2,
            constructorParam.param3,
            constructorParam.param4
        ])
    }
}

async function main() {
    //VirtueQuest
    if (jsonContent.contractName == "VirtueQuest") {
        await VirtueQuestDeploy()
    }
    /// VirtueQuestNFT CONTRACT
    if (jsonContent.contractName == "VirtueQuestNFT") {
        await VirtueQuestNFTDeploy()
    }

    let chainId

    if (network.config.chainId != undefined) {
        chainId = network.config.chainId
    } else {
        chainId = network.config.networkId
    }

    console.log(`The chainId is ${chainId}`)
    const data = { chainId, contractAddress, Verified, blockNumber }
    const jsonString = JSON.stringify(data)
    // Log the JSON string
    console.log(jsonString)
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        Verified = true
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })