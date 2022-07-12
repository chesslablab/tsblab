import { expect } from 'chai';
import DoubledPawnEval from '../../../src/eval/DoubledPawnEval';

// describe('doubledPawnEval.eval()', () => {
//   it('is  kaufman_16', () => {
//     const position = {
//       7 : [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
//       6 : [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
//       5 : [ ' p ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ' ],
//       4 : [ ' . ', ' . ', ' p ', ' P ', ' . ', ' . ', ' . ', ' . ' ],
//       3 : [ ' . ', ' . ', ' P ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
//       2 : [ ' . ', ' P ', ' . ', ' . ', ' . ', ' . ', ' k ', ' . ' ],
//       1 : [ ' . ', ' P ', ' . ', ' K ', ' . ', ' . ', ' . ', ' . ' ],
//       0 : [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
//     };

//     const board = (new AsciiArray(position)).toBoard('w');
//     const expected = {
//       'w': 1,
//       'b': 0
//     };
//     const doubledPawnEval = new DoubledPawnEval(board);
//     expect(doubledPawnEval).to.eql(expected);
//   });
//   it('is  kaufman_17', () => {
//     const position = {
//       7: [ ' . ', ' r ', ' . ', ' q ', ' . ', ' r ', ' k ', ' . ' ],
//       6: [ ' p ', ' . ', ' p ', ' . ', ' . ', ' p ', ' b ', ' p ' ],
//       5: [ ' . ', ' . ', ' p ', ' p ', ' . ', ' k ', ' p ', ' . ' ],
//       4: [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' B ', ' . ' ],
//       3: [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
//       2: [ ' . ', ' . ', ' N ', ' Q ', ' . ', ' . ', ' . ', ' . ' ],
//       1: [ ' P ', ' P ', ' P ', ' . ', ' . ', ' P ', ' P ', ' P ' ],
//       0: [ ' . ', ' . ', ' . ', ' R ', ' . ', ' R ', ' K ', ' . ' ],
//     };

//     const board = (new AsciiArray(position)).toBoard('w');
//     const expected = {
//       'w': 0,
//       'b': 1
//     };
//     const doubledPawnEval = new DoubledPawnEval(board);
//     expect(doubledPawnEval).to.eql(expected);
//   });
// });