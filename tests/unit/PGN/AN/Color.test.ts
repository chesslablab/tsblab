import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import Color from '../../../../src/PGN/AN/Color';
import { expect } from 'chai';

describe('color.validate()', () => {
  const color = new Color();
  it ('green throws UnknownNotationError', () => {
    expect(() => color.validate('green')).to.throw(UnknownNotationError);
  });
  it ('w is valid', () => {
    expect(color.validate('w')).to.equal('w');
  });
  it ('b is valid', () => {
    expect(color.validate('b')).to.equal('b');
  });
});

describe('color.opp()', () => {
  const color = new Color();
  it ('w returns b', () => {
    expect(color.opp('w')).to.eql('b');
  });
});

describe('Color.values()', () => {
  const color = new Color();
  it ('Returns the constant values', () => {
    const expected = ['w', 'b'];
    expect(color.values()).to.eql(expected);
  });
});
