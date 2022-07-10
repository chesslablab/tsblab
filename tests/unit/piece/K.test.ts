import { expect } from 'chai';
import Castle from '../../../src/PGN/AN/Castle';
import Color from '../../../src/PGN/AN/Color';
import Piece from '../../../src/PGN/AN/Piece';
import K from '../../../src/piece/K';

describe('K.CASTLING_RULE', () => {
  it ('w Castle.LONG sqs', () => {
    expect(K.CASTLING_RULE[Color.W][Piece.K][Castle.LONG].sqs)
      .to.eql([ 'b1', 'c1', 'd1' ]);
  });
  it ('b Castle.LONG sqs', () => {
    expect(K.CASTLING_RULE[Color.B][Piece.K][Castle.LONG].sqs)
      .to.eql([ 'b8', 'c8', 'd8' ]);
  });
  it ('w Castle.SHORT sqs', () => {
    expect(K.CASTLING_RULE[Color.W][Piece.K][Castle.SHORT].sqs)
      .to.eql([ 'f1', 'g1' ]);
  });
  it ('b Castle.SHORT sqs', () => {
    expect(K.CASTLING_RULE[Color.B][Piece.K][Castle.SHORT].sqs)
      .to.eql([ 'f8', 'g8' ]);
  });
});

describe('king.getMobility()', () => {
  it ('a2', () => {
    const king = new K('w', 'a2');
    const mobility = {
      up: 'a3',
      down: 'a1',
      right: 'b2',
      upRight: 'b3',
      downRight: 'b1'
    };
    expect(king.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    const king = new K('w', 'd5');
    const mobility = {
      up: 'd6',
      down: 'd4',
      left: 'c5',
      right: 'e5',
      upLeft: 'c6',
      upRight: 'e6',
      downLeft: 'c4',
      downRight: 'e4',
    };
    expect(king.getMobility()).to.eql(mobility);
  });
});
