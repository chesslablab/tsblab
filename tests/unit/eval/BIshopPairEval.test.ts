import { expect } from 'chai';
import Board from '../../../src/Board';

import BishopPairEval from '../../../src/eval/BishopPairEval';

describe('bishopPairEval.eval()', () => {
  // it('is player B25', () => {
  //   const B25 = file_read(self.DATA_FOLDER + '/sample/B25.pgn');
  //   const board = (new Player(B25)).play().getBoard();
  //   const bishopPairEval = (new BishopPairEval(board)).eval();
  //   let expected = {
  //     'w': 0,
  //     'b': 0
  //   };
  //   expect(bishopPairEval).to.eql(expected);
  // });
  // it('is player C68', () => {
  //   const C68 = file_read(self.DATA_FOLDER + '/sample/C68.pgn');
  //   const board = (new Player(C68)).play().getBoard();
  //   const bishopPairEval = (new BishopPairEval(board)).eval();
  //   let expected = {
  //     'w': 0,
  //     'b': 1,
  //   };
  //   expect(bishopPairEval).to.eql(expected);
  // });
  // it('is B_B_vs_b_b', () => {
  //   const board = (new StrToBoard('8/5b2/4k3/4b3/8/8/1KBB4/8 w - -')).create();
  //   const absForkEval = (new BishopPairEval(board)).eval();
  //   let expected = {
  //     'w': 0,
  //     'b': 0
  //   };
  //   expect(absForkEval).to.eql(expected);
  // });
  // it('is B_B_vs_n_b', () => {
  //   const board = (new StrToBoard('8/5n2/4k3/4b3/8/8/1KBB4/8 w - -')).create();
  //   const absForkEval = (new BishopPairEval(board)).eval();
  //   let expected = {
  //     'w': 1,
  //     'b': 0
  //   };
  //   expect(absForkEval).to.eql(expected);
  // });
  // it('is N_B_vs_b_b', () => {
  //   const board = (new StrToBoard('8/3k4/2bb4/8/8/4BN2/4K3/8 w - -')).create();
  //   const absForkEval = (new BishopPairEval(board)).eval();
  //   let expected = {
  //     'w': 0,
  //     'b': 1
  //   };
  //   expect(absForkEval).to.eql(expected);
  // });
});