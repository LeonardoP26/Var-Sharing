// migrations/3_deploy_upgradeable_box.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const VarSharingV2 = artifacts.require("VarSharingV2");

module.exports = async function (deployer) {
  await deployProxy(VarSharingV2, { deployer });
};