import { expect } from 'chai';
import B from '../../../src/piece/B';

describe('bishop.getMobility()', () => {
  it ('a2', () => {
    const bishop = new B('w', 'a2');
    const mobility = {
      upLeft: [],
      upRight: ['b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
      downLeft: [],
      downRight: ['b1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    const bishop = new B('w', 'd5');
    const mobility = {
      upLeft: ['c6', 'b7', 'a8'],
      upRight: ['e6', 'f7', 'g8'],
      downLeft: ['c4', 'b3', 'a2'],
      downRight: ['e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('a8', () => {
    const bishop = new B('w', 'a8');
    const mobility = {
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: ['b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
});
