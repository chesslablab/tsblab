import { expect } from 'chai';
import Board from '../../../src/Board';
import SqEvaluation from '../../../src/evaluation/SqEvaluation';

describe('SqEvaluation.eval()', () => {
  it('start', () => {
    let board = new Board();
    let sqEval = new SqEvaluation(board).eval(SqEvaluation.TYPE_FREE);

    let expected = [
      'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
      'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
      'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
      'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
      'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
      'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
      'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
      'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
    ];
    expect(sqEval).to.eql(expected);
  });
});