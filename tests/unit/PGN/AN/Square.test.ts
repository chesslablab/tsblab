import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import Square from '../../../../src/PGN/AN/Square';
import { expect } from 'chai';

describe('Square.validate()', () => {
  const square = new Square();
  it ('a9 throws UnknownNotationError', () => {
    expect(() => square.validate('a9')).to.throw(UnknownNotationError);
  });
  it ('foo throws UnknownNotationError', () => {
    expect(() => square.validate('foo')).to.throw(UnknownNotationError);
  });
  it ('e4 is valid', () => {
    expect(square.validate('e4')).to.equal('e4');
  });
});
