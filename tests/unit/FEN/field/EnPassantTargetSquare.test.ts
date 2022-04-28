import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import EnPassantTargetSquare from '../../../../src/FEN/field/EnPassantTargetSquare';
import { expect } from 'chai';

describe('EnPassantTargetSquare.validate()', () => {
  const enPassantTargetSquare = new EnPassantTargetSquare();
  it ('a9 throws UnknownNotationError', () => {
    expect(() => enPassantTargetSquare.validate('a9')).to.throw(UnknownNotationError);
  });
  it ('foo throws UnknownNotationError', () => {
    expect(() => enPassantTargetSquare.validate('foo')).to.throw(UnknownNotationError);
  });
  it ('e4 is valid', () => {
    expect(enPassantTargetSquare.validate('e4')).to.equal('e4');
  });
});
