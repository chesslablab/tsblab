import { expect } from 'chai';
import Board from '../../../src/Board';
import KingSafetyEval from '../../../src/eval/KingSafetyEval';

describe('kingSafetyEval.eval()', () => {
  it('is started', () => {
    const kSafetyEval = (new KingSafetyEval(new Board())).eval();
    const expected = {
      'w': 1,
      'b': 1,
    };
    expect(kSafetyEval).to.eql(expected);
  });
  // it('is A00', () => {
  //   const A00 = file_get_contents(this.DATA_FOLDER + '/sample/A00.pgn');

  //   const board = (new Player(A00)).play().getBoard();

  //   const kSafetyEval = (new KingSafetyEval(board)).eval();
  //   const expected = {
  //     'w': 0,
  //     'b': 1,
  //   };
  //   expect(kSafetyEval).to.eql(expected);
  // });
  // it('is B25', () => {
  //   const B25 = file_get_contents(this.DATA_FOLDER + '/sample/B25.pgn');

  //   const board = (new Player(B25)).play().getBoard();

  //   const kSafetyEval = (new KingSafetyEval(board)).eval();
  //   const expected = {
  //     'w': 1,
  //     'b': 1,
  //   };
  //   expect(kSafetyEval).to.eql(expected);
  // });
});
