import { expect } from 'chai';
import Castle from '../../../src/PGN/AN/Castle';
import Color from '../../../src/PGN/AN/Color';
import Piece from '../../../src/PGN/AN/Piece';
import King from '../../../src/piece/King';

describe('King.CASTLING_RULE', () => {
  it ('w Castle.LONG sqs', () => {
    expect(King.CASTLING_RULE[Color.W][Piece.K][Castle.LONG].sqs)
      .to.eql([ 'b1', 'c1', 'd1' ]);
  });
  it ('b Castle.LONG sqs', () => {
    expect(King.CASTLING_RULE[Color.B][Piece.K][Castle.LONG].sqs)
      .to.eql([ 'b8', 'c8', 'd8' ]);
  });
  it ('w Castle.SHORT sqs', () => {
    expect(King.CASTLING_RULE[Color.W][Piece.K][Castle.SHORT].sqs)
      .to.eql([ 'f1', 'g1' ]);
  });
  it ('b Castle.SHORT sqs', () => {
    expect(King.CASTLING_RULE[Color.B][Piece.K][Castle.SHORT].sqs)
      .to.eql([ 'f8', 'g8' ]);
  });
});
