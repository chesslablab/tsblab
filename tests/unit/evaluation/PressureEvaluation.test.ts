import { expect } from 'chai';
import Board from '../../../src/Board';
import PressureEvaluation from '../../../src/evaluation/PressureEvaluation';

describe('PressureEvaluation.eval()', () => {
  it('is started', () => {
    let pressEval = (new PressureEvaluation(new Board())).eval();
    let expected = {
      'w': [],
      'b': [],
    };
    expect(pressEval).to.eql(expected);
  });
  // it('is Open Sicilian', () => {
  //   let board = new OpenSicilian(new Board()).play();
  //   let pressEval = (new PressureEvaluation(board)).eval();
  //   let expected = {
  //     'w': [],
  //     'b': ['e4'],
  //   };
  //   expect(pressEval).to.eql(expected);
  // });
  // it('is Closed Sicilian', () => {
  //   let board = new ClosedSicilian(new Board()).play();
  //   let pressEval = (new PressureEvaluation(board)).eval();
  //   let expected = {
  //     'w': [],
  //     'b': ['c3'],
  //   };
  //   expect(pressEval).to.eql(expected);
  // });
  // it('play e4_e5_Nf3_Nc6_Bb5_a6_Nxe5', () => {
  //   let board = new Board();
  //   board.play('w', 'e4');
  //   board.play('b', 'e5');
  //   board.play('w', 'Nf3');
  //   board.play('b', 'Nc6');
  //   board.play('w', 'Bb5');
  //   board.play('b', 'a6');
  //   board.play('w', 'Nxe5');
  //   let pressEval = (new PressureEvaluation(board)).eval();
  //   let expected = {
  //     'w': ['a6', 'c6', 'c6', 'd7', 'f7'],
  //     'b': ['b5', 'e5'],
  //   };
  //   expect(pressEval).to.eql(expected);
  // });
  
});