import { expect } from 'chai';
import UnknownNotationError from '../../../../src/error/UnknownNotationError';
import PiecePlacement from '../../../../src/FEN/field/PiecePlacement';

describe('PiecePlacement.validate()', () => {
    const piecePlacement=new PiecePlacement();
    it ('- throws UnknownNotationError', () => {
        expect(() => piecePlacement.validate('-')).to.throw(UnknownNotationError);
    });
    it ('/////// is valid', () =>{
        expect(piecePlacement.validate('///////')).to.equal('///////');
    });

})