import { expect } from 'chai';
import Castle from '../../../src/PGN/AN/Castle';
import Color from '../../../src/PGN/AN/Color';
import Piece from '../../../src/PGN/AN/Piece';
import King from '../../../src/piece/King';

describe('King.CASTLING_RULE', () => {
  const rule = King.CASTLING_RULE[Color.W];
  it ('w Castle.LONG sqs', () => {
    expect(rule[Piece.K][Castle.LONG].sqs).to.eql([ 'b1', 'c1', 'd1' ]);
  });
  it ('w Castle.SHORT sqs', () => {
    expect(rule[Piece.K][Castle.SHORT].sqs).to.eql([ 'f1', 'g1' ]);
  });
});
