import { expect } from 'chai';
import R from '../../../src/piece/R';
import RType from '../../../src/piece/RType';

describe('rook.getMobility()', () => {
  it ('a2', () => {
    let rook = new R('w', 'a2', RType.PROMOTED);
    let mobility = {
      up: ['a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
      down: ['a1'],
      left: [],
      right: ['b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
    };
    expect(rook.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    let rook = new R('w', 'd5', RType.PROMOTED);
    let mobility = {
      up: ['d6', 'd7', 'd8'],
      down: ['d4', 'd3', 'd2', 'd1'],
      left: ['c5', 'b5', 'a5'],
      right: ['e5', 'f5', 'g5', 'h5']
    };
    expect(rook.getMobility()).to.eql(mobility);
  });
});
