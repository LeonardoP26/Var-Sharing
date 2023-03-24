// migrations/4_upgrade_box.js
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const VarSharingV2 = artifacts.require('VarSharingV2');
const VarSharingV3 = artifacts.require('VarSharingV3');

module.exports = async function (deployer) {
  const existing = await VarSharingV2.deployed();
  await upgradeProxy(existing.address, VarSharingV3, { deployer });
};