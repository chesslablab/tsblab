import { expect } from 'chai';
import Board from '../../../src/Board';
import SqEval from '../../../src/eval/SqEval';

describe('sqEval.eval()', () => {
  it('is started', () => {
    let board = new Board();
    let sqEval = new SqEval(board).eval(SqEval.TYPE_FREE);
    let expected = [
      'a3', 'a4', 'a5', 'a6', 'b3',
      'b4', 'b5', 'b6', 'c3', 'c4',
      'c5', 'c6', 'd3', 'd4', 'd5',
      'd6', 'e3', 'e4', 'e5', 'e6',
      'f3', 'f4', 'f5', 'f6', 'g3',
      'g4', 'g5', 'g6', 'h3', 'h4',
      'h5', 'h6'
    ];
    expect(sqEval).to.eql(expected);
  });
});
