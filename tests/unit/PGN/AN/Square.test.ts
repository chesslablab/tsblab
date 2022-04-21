import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import Square from '../../../../src/PGN/AN/Square';
import { expect } from 'chai';

describe('Square.validate()', () => {
  it ('foo throws UnknownNotationError', () => {
    expect(() => Square.validate('foo')).to.throw(UnknownNotationError);
  });
  it ('e4 is valid', () => {
    expect(Square.validate('e4')).to.equal('e4');
  });
});
