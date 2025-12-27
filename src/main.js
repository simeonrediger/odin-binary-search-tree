import { generateRandomIntegers } from './utils.js';
import Tree from './tree.js';

const nums = generateRandomIntegers(0, 30, 1, 100);

const tree = new Tree(nums);
tree.prettyPrint();
