import { expect } from 'chai';
import Piece from '../../src/PGN/AN/Piece';
import Board from '../../src/Board';

describe('new Board', () => {
  it ('is instantiated', () => {
    let board = new Board();
    expect(32).to.eql(board.size);
  });
});

describe('Board.getPieceBySq()', () => {
  it ('a1 is a rook', () => {
    let board = new Board();
    let piece = board.getPieceBySq('a1');
    expect(piece.getId()).to.eql(Piece.R);
  });
  it ('h8 is a rook', () => {
    let board = new Board();
    let piece = board.getPieceBySq('h8');
    expect(piece.getId()).to.eql(Piece.R);
  });
});
