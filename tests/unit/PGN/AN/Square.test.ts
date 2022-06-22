import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import Square from '../../../../src/PGN/AN/Square';
import { expect } from 'chai';

describe('square.validate()', () => {
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

describe('square.values()', () => {
  const square = new Square();
  it ('Returns the constant values', () => {
    expect(square.values()).to.eql(['[a-h]{1}[1-8]{1}']);
  });
});
