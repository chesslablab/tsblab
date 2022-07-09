import { expect } from 'chai';
import P from '../../../src/piece/P';

describe('pawn.getMobility()', () => {
  it ('a2', () => {
    const pawn = new P('w', 'a2');
    const position = 'a2';
    const mobility = ['a3', 'a4'];
    const captureSquares = ['b3'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('d5', () => {
    const pawn = new P('w', 'd5');
    const position = 'd5';
    const mobility = ['d6'];
    const captureSquares = ['c6', 'e6'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('f7', () => {
    const pawn = new P('w', 'f7');
    const position = 'f7';
    const mobility = ['f8'];
    const captureSquares = ['e8', 'g8'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('f8', () => {
    const pawn = new P('w', 'f8');
    const position = 'f8';
    const mobility = [];
    const captureSquares = [];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('a2', () => {
    const pawn = new P('b', 'a2');
    const position = 'a2';
    const mobility = ['a1'];
    const captureSquares = ['b1'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('d5', () => {
    const pawn = new P('b', 'd5');
    const position = 'd5';
    const mobility = ['d4'];
    const captureSquares = ['c4', 'e4'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
});
