import { expect } from 'chai';
import Q from '../../../src/piece/Q';

describe('queen.getMobility()', () => {
  it ('a2', () => {
    let queen = new Q('w', 'a2');
    let mobility = {
      up: ['a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
      down: ['a1'],
      left: [],
      right: ['b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
      upLeft: [],
      upRight: ['b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
      downLeft: [],
      downRight: ['b1']
    };
    expect(queen.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    let queen = new Q('w', 'd5');
    let mobility = {
      up: ['d6', 'd7', 'd8'],
      down: ['d4', 'd3', 'd2', 'd1'],
      left: ['c5', 'b5', 'a5'],
      right: ['e5', 'f5', 'g5', 'h5'],
      upLeft: ['c6', 'b7', 'a8'],
      upRight: ['e6', 'f7', 'g8'],
      downLeft: ['c4', 'b3', 'a2'],
      downRight: ['e4', 'f3', 'g2', 'h1']
    };
    expect(queen.getMobility()).to.eql(mobility);
  });
});

describe('queen.sqs()', () => {
  // let board = new BenoniFianchettoVariation(new Board()).play();
  // let queen = board.getPieceBySq('d1');
  // let expected = ['e1', 'c2', 'b3'];
  // expect(queen.sqs()).to.eql(expected);
});
