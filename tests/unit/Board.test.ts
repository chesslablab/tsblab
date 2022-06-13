import { expect } from 'chai';
import Board from '../../src/Board';

describe('new Board', () => {
  it ('is instantiated', () => {
    let board = new Board();
    expect(32).to.eql(board.size);
  });
});
