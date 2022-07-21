import { expect } from 'chai';
import Movetext from '../../../src/PGN/Movetext';

describe('movetext.validate()', () => {
  it ('Foo throws exception', () => {
    const text = 'Foo';
    const movetext = new Movetext(text);
    expect(() => movetext.validate()).to.throw();
  });
  it ('movetext sample is valid', () => {
    const text = '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7 6.e4 d6 7.Bd3 c5';
    const movetext = new Movetext(text);
    const valid = movetext.validate();
    const sample = '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7 6.e4 d6 7.Bd3 c5';
    expect(valid).to.eql(sample);
  });
});

describe('movetext.sequence()', () => {
  it ('movetext sequence is valid', () => {
    const text = '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7 6.e4 d6 7.Bd3 c5';
    const movetext = new Movetext(text);
    const sequence = movetext.sequence();
    const sample = [
      '1.d4 Nf6',
      '1.d4 Nf6 2.Nf3 e6',
      '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+',
      '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O',
      '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7',
      '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7 6.e4 d6',
      '1.d4 Nf6 2.Nf3 e6 3.c4 Bb4+ 4.Nbd2 O-O 5.a3 Be7 6.e4 d6 7.Bd3 c5'
    ];
    expect(sequence).to.eql(sample);
  });
});

