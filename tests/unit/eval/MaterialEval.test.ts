import { expect } from 'chai';
import Board from '../../../src/Board';
import MaterialEval from '../../../src/eval/MaterialEval';

describe('materialEval.eval()', () => {
  it('is starting position', () => {
    const board = new Board()
    const mtlEval = (new MaterialEval(board)).eval();
    const expected = {
      'w': 40.06,
      'b': 40.06,
    };
    expect(mtlEval).to.eql(expected);
  });
  // it('is ruy_lopez_lucena_defense', () => {
  //   const board = (new RuyLopezLucenaDefense(new Board())).play();
  //   const mtlEval = (new MaterialEval(board)).eval();
  //   const expected = {
  //     'w': 40.06,
  //     'b': 40.06,
  //   };
  //   expect(mtlEval).to.eql(expected);
  // });
  // it('play w_e4_b_Nf6', () => {
  //   const board = new Board();
  //   board.play('w', 'e4');
  //   board.play('b', 'Nf6');
  //   const mtlEval = (new MaterialEval(board)).eval();
  //   const expected = {
  //     'w': 40.06,
  //     'b': 40.06,
  //   };
  //   expect(mtlEval).to.eql(expected);
  // });
});
