import { expect } from 'chai';
import Pawn from '../../../src/piece/Pawn';

describe('Pawn.getMobility()', () => {
  it ('a2', () => {
    let pawn = new Pawn('w', 'a2');
    let position = 'a2';
    let mobility = ['a3', 'a4'];
    let captureSquares = ['b3'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('d5', () => {
    let pawn = new Pawn('w', 'd5');
    let position = 'd5';
    let mobility = ['d6'];
    let captureSquares = ['c6', 'e6'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('f7', () => {
    let pawn = new Pawn('w', 'f7');
    let position = 'f7';
    let mobility = ['f8'];
    let captureSquares = ['e8', 'g8'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('f8', () => {
    let pawn = new Pawn('w', 'f8');
    let position = 'f8';
    let mobility = [];
    let captureSquares = [];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('a2', () => {
    let pawn = new Pawn('b', 'a2');
    let position = 'a2';
    let mobility = ['a1'];
    let captureSquares = ['b1'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
  it ('d5', () => {
    let pawn = new Pawn('b', 'd5');
    let position = 'd5';
    let mobility = ['d4'];
    let captureSquares = ['c4', 'e4'];
    expect(pawn.getMobility()).to.eql(mobility);
    expect(pawn.getSq()).to.eql(position);
    expect(pawn.getCaptureSqs()).to.eql(captureSquares);
  });
});
