const BlockChain = require('./blockchain');

BlockChain.addBlock({ sender: 'Alan Turing', receiver: 'Alonzo Church', amount: 2330 });
BlockChain.addBlock({ sender: 'Richard Stallman', receiver: 'Linus Torvalds', amount: 1750 });
BlockChain.addBlock({ sender: 'Dennis Ritchie', receiver: 'Ken Thompson', amount: 1220 });
BlockChain.addBlock({ sender: 'James Gosling', receiver: 'Bjarne Stroustrup', amount: 3100 });
BlockChain.addBlock({ sender: 'Donald Knuth', receiver: 'Edsger Dijkstra', amount: 2330 });

BlockChain.showChain();

BlockChain.validateChain();

console.log('>>> Modifying Chain >>> \n');

BlockChain.modifyRandomBlock(); // You can add more invalidation here. Just copy this line as you wish.

BlockChain.validateChain();
