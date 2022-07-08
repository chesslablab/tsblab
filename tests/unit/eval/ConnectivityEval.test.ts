import { expect } from 'chai';
import Board from '../../../src/Board';
import ConnectivityEval from '../../../src/eval/ConnectivityEval';

describe('connectivityEval.eval()', () => {
  it('is started', () => {
    const connEval = (new ConnectivityEval(new Board())).eval();
    const expected = {
      'w': 20,
      'b': 20,
    };
    expect(connEval).to.eql(expected);
  });
  // it('is ruy_lopez_lucena_defense', () => {
  //     const board = (new RuyLopezLucenaDefense(new Board())).play();
  //     const expected = {
  //       'w': 19,
  //       'b': 23,
  //     };
  //     const connEval = (new ConnectivityEval(board)).eval()
  //     expect(connEval).to.eql(expected);
  // });
});
