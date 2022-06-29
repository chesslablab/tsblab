import { expect } from 'chai';
import Board from '../../../src/Board';
import ConnectivityEval from '../../../src/eval/ConnectivityEval';

describe('connectivityEval.eval()', () => {
  it('is started', () => {
    let connEval = (new ConnectivityEval(new Board())).eval();
    let expected = {
      'w': 20,
      'b': 20,
    };
    expect(connEval).to.eql(expected);
  });
  // it('is ruy_lopez_lucena_defense', () => {
  //     let board = (new RuyLopezLucenaDefense(new Board())).play();
  //     let expected = {
  //       'w': 19,
  //       'b': 23,
  //     };
  //     let connEval = (new ConnectivityEval(board)).eval()
  //     expect(connEval).to.eql(expected);
  // });
});