// import the hardhat library to interact with ethereum network
const { ethers, waffle } = require('hardhat')
// import the chai library for assertion
const { expect } = require('chai')
// import the ethers library for working with smart contracts and big numbers
const { BigNumber, utils } = require('ethers')

describe('Attack', function () {
  it('Should be able to guess the exact number', async function () {
    // Deploy the Game contract
    // get the contract factory for the Game contract
    const Game = await ethers.getContractFactory('Game')
    // deploy the Game contract with an initial value of 0.1 ether
    const game = await Game.deploy({ value: utils.parseEther('0.1') })
    // wait for the contract to be deployed
    await game.deployed()
    // log the address of the deployed Game contract
    console.log('Game contract address', game.address)

    // Deploy the attack contract
    // get the contract factory for the Attack contract
    const Attack = await ethers.getContractFactory('Attack')
    // deploy the Attack contract with the address of the Game contract as an argument
    const attack = await Attack.deploy(game.address)

    // log the address of the deployed Attack contract
    console.log('Attack contract address', attack.address)

    // Attack the Game contract
    // call the attack function on the Attack contract
    const tx = await attack.attack()
    // wait for the attack transaction to be mined
    await tx.wait()

    // get the balance of the Game contract
    const balanceGame = await game.getBalance()
    // Balance of the Game contract should be 0
    // assert that the balance of the Game contract is 0
    expect(balanceGame).to.equal(BigNumber.from('0'))
  })
})
