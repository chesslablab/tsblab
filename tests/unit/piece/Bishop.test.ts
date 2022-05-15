import { expect } from 'chai';
import Bishop from '../../../src/piece/Bishop';

describe('Bishop.getMobility()', () => {
  it ('a2', () => {
    let bishop = new Bishop('w', 'a2');
    let mobility = {
      upLeft: [],
      upRight: ['b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
      bottomLeft: [],
      bottomRight: ['b1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('d5', () => {
    let bishop = new Bishop('w', 'd5');
    let mobility = {
      upLeft: ['c6', 'b7', 'a8'],
      upRight: ['e6', 'f7', 'g8'],
      bottomLeft: ['c4', 'b3', 'a2'],
      bottomRight: ['e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
  it ('a8', () => {
    let bishop = new Bishop('w', 'a8');
    let mobility = {
      upLeft: [],
      upRight: [],
      bottomLeft: [],
      bottomRight: ['b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1']
    };
    expect(bishop.getMobility()).to.eql(mobility);
  });
});