import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import SideToMove from '../../../../src/FEN/field/SideToMove';
import { expect } from 'chai';

describe('SideToMove.validate()', () => {
  const sideToMove = new SideToMove();
  it ('green throws UnknownNotationError', () => {
    expect(() => sideToMove.validate('green')).to.throw(UnknownNotationError);
  });
  it ('w is valid', () => {
    expect(sideToMove.validate('w')).to.equal('w');
  });
  it ('b is valid', () => {
    expect(sideToMove.validate('b')).to.equal('b');
  });
});
