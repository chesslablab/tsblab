import { expect } from "chai";
import UnknownNotationError from "../../../src/error/UnknownNotationError";
import Tag from '../../../src/PGN/Tag';

describe('Tag.validate()', () => {
    const tag = new Tag()
    it ('Foo throws exception', () => {
        expect(() => tag.validate('Foo')).to.throw(UnknownNotationError)
    });
    it ('[Event "Vladimir Dvorkovich Cup"] is valid', () => {
        const tagValid = tag.validate('[Event "Vladimir Dvorkovich Cup"]');
        const example = {
            name: 'Event',
            value: 'Vladimir Dvorkovich Cup'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[Site "Saint Louis USA"] is valid', () => {
        const tagValid = tag.validate('[Site "Saint Louis USA"]');
        const example = {
            name: 'Site',
            value: 'Saint Louis USA'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[Date "2018.05.10"] is valid', () => {
        const tagValid = tag.validate('[Date "2018.05.10"]');
        const example = {
            name: 'Date',
            value: '2018.05.10'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[Round "9.6"] is valid', () => {
        const tagValid = tag.validate('[Round "9.6"]');
        const example = {
            name: 'Round',
            value: '9.6'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[White "Kantor, Gergely"] is valid', () => {
        const tagValid = tag.validate('[White "Kantor, Gergely"]');
        const example = {
            name: 'White',
            value: 'Kantor, Gergely'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[Black "Gelfand, Boris"] is valid', () => {
        const tagValid = tag.validate('[Black "Gelfand, Boris"]');
        const example = {
            name: 'Black',
            value: 'Gelfand, Boris'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[Result "1/2-1/2"] is valid', () => {
        const tagValid = tag.validate('[Result "1/2-1/2"]');
        const example = {
            name: 'Result',
            value: '1/2-1/2'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[WhiteElo "2579"] is valid', () => {
        const tagValid = tag.validate('[WhiteElo "2579"]');
        const example = {
            name: 'WhiteElo',
            value: '2579'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[BlackElo "2474"] is valid', () => {
        const tagValid = tag.validate('[BlackElo "2474"]');
        const example = {
            name: 'BlackElo',
            value: '2474'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[ECO "D35"] is valid', () => {
        const tagValid = tag.validate('[ECO "D35"]');
        const example = {
            name: 'ECO',
            value: 'D35'
        }
        expect(tagValid).to.eql(example)
    });
    it ('[EventDate "2017.12.17"] is valid', () => {
        const tagValid = tag.validate('[EventDate "2017.12.17"]');
        const example = {
            name: 'EventDate',
            value: '2017.12.17'
        }
        expect(tagValid).to.eql(example)
    });
})