import {composeQuery} from '../common';
import {expect} from 'chai';

describe('Test all functions from Common module', () => {
    it('should return empty object', () => {
        const result = composeQuery({query: {}}, {});
        expect(Object.keys(result).length).to.be.equal(0);
    });
});
