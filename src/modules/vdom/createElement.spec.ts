import { expect } from 'chai';
import { createText } from './createElement';

describe('vDom create text nodes', () => {
    it('should return string correctly', () => {
        const textNode = createText('Text');
        expect(textNode.type, 'text');
        expect(textNode.value, 'Text');
    });
});
