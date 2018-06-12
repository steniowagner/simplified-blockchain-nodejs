const SHA256 = require('crypto-js/sha256');

const timestamp = Math.floor(Date.now() / 1000);

const generateHash = (data, previousHash, index) =>
  SHA256(JSON.stringify(data) + previousHash + index + timestamp).toString();

const buildBlock = (data, index = 0, previousHash = '0', timestamp = Math.floor(Date.now() / 1000)) => {
  return {
    hash: generateHash(data, previousHash, index),
    previousHash,
    timestamp,
    index,
    data,
  }
}

module.exports = buildBlock;
