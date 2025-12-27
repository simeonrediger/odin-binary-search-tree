import { generateRandomIntegers, printNodeValues } from './utils.js';
import Tree from './tree.js';

console.clear();
const nums = generateRandomIntegers(1, 6, 1, 100);

const tree = new Tree(nums);
tree.prettyPrint();
console.log();

console.log(tree.balanced ? 'Balanced' : 'Not balanced');
console.log();

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.prettyPrint();
console.log();

console.log(tree.balanced ? 'Balanced' : 'Not balanced');
console.log();

tree.rebalance();

tree.prettyPrint();
console.log();

console.log(tree.balanced ? 'Balanced' : 'Not balanced');

console.log('\nLevel-order:');
printNodeValues(tree.levelOrderForEach.bind(tree));

console.log('\nIn-order:');
printNodeValues(tree.inOrderForEach.bind(tree));

console.log('\nPre-order:');
printNodeValues(tree.preOrderForEach.bind(tree));

console.log('\nPost-order');
printNodeValues(tree.postOrderForEach.bind(tree));
