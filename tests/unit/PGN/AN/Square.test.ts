import Square from '../../../../src/PGN/AN/Square';
import { expect } from 'chai';

describe('Square.validate()', () => {
  it ('foo is not valid', () => {
    expect(Square.validate('foo')).to.be.false;
  });
  it ('e4 is valid', () => {
    expect(Square.validate('e4')).to.be.true;
  });
});
