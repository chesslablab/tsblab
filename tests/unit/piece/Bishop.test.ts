import { expect } from 'chai';
import Bishop from '../../../src/piece/Bishop';

describe('bishop.getMobility()', () => {
  it ('a2', () => {
    let bishop = new Bishop('w', 'a2');
    let mobility = {
      upLeft: [],
      upRight: ['b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
      downLeft: [],
      downRight: ['b1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    let bishop = new Bishop('w', 'd5');
    let mobility = {
      upLeft: ['c6', 'b7', 'a8'],
      upRight: ['e6', 'f7', 'g8'],
      downLeft: ['c4', 'b3', 'a2'],
      downRight: ['e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('a8', () => {
    let bishop = new Bishop('w', 'a8');
    let mobility = {
      upLeft: [],
      upRight: [],
      downLeft: [],
      downRight: ['b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
});
