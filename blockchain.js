const buildBlock = require('./build-block');

let chain = [];

exports.addBlock = data => {
  chain.length === 0 ? createGenesisBlock(data) : createDefaultBlock(data);
}

exports.validateChain = () => {
  const chainValidation =
    chain.slice(1, chain.length)
      .map(block => {
        const isPreviousHashValid = verifyPreviousHash(block);
        const isBlockIncorrupt = verifyBlockIntegrity(block);

        return isBlockIncorrupt && isPreviousHashValid;
      });

  const isChainValid = chainValidation.findIndex(value => value === false) < 0;

  if (isChainValid) {
    console.log('\n>> The Chain is Valid!\n');
  } else {
    console.log('>> The Chain is Invalid!');
    console.log('\n- Invalid Blocks: ');
    getInvalidBlocks(chainValidation);
  }
}

exports.showChain = () => {
  chain.map((block, index) => blockToString(block, index));
}

exports.modifyRandomBlock = () => {
  const randomBlockIndex = Math.floor(Math.random() * chain.length - 1) + 1

  chain[randomBlockIndex].data.receiver = 'Mark Zuckerberg';
}

const createGenesisBlock = data => {
  const genesisBlock = buildBlock(data)
  chain.push(genesisBlock);
}

const createDefaultBlock = data => {
  const index = chain.length;
  const previousHash = chain[index - 1].hash;

  const newBlock = buildBlock(data, index, previousHash);

  chain.push(newBlock);
}

const verifyPreviousHash = block => {
  const previousBlock = chain[block.index - 1];

  return block.previousHash === previousBlock.hash;
}

const verifyBlockIntegrity = block => {
  const {
    previousHash,
    timestamp,
    index,
    data,
  } = block;

  const comparisonBlock = buildBlock(data, index, previousHash, timestamp);

  return block.hash === comparisonBlock.hash;
}

const getInvalidBlocks = chainValidation => {
  const invalidBlocks = chainValidation
    .map((isBlockValid, index) => !isBlockValid ? chain[index] : undefined)
    .filter(block => block !== undefined);

  invalidBlocks.map(block => blockToString(block, block.index));
}

const blockToString = (block, index) => {
  console.log(
    `\n${index === 0 ? 'Genesis Block' : `Index: ${block.index}`}
  Timestamp: ${block.timestamp}
  Data: 
    Sender: ${block.data.sender}
    Receiver: ${block.data.receiver}
    Amount: ${block.data.amount}
  Hash: ${block.hash}
  Previous Hash: ${block.previousHash}`);
}
