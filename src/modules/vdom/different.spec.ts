import { expect } from 'chai';
import { createDifferent } from './different';
import {
    InsertOperation, RemoveOperation,
    ReplaceOperation, UpdateOperation, VElement, VText,
} from './types';
import { createElement, createText } from './createElement';

describe('vDom diff elements', () => {
    const vDom1: VElement = createElement('div', {
        className: 'class1',
    }, null);

    it('should be skip', () => {
        const diff = createDifferent(createText('text'), createText('text'));

        expect(diff.type).to.equal('skip');
    });

    it('should be replace', () => {
        const diff = createDifferent(createText('text'), createText('new text'));

        expect(diff.type).to.equal('replace');
        expect(((diff as ReplaceOperation).node as VText).value).to.equal('new text');
    });

    it('should be insert', () => {
        const vDom2: VElement = {
            ...vDom1,
            children: [createText('text')],
        };
        const diff = createDifferent(vDom1, vDom2);
        const insert = (diff as UpdateOperation).children[0] as InsertOperation;

        expect(diff.type).to.equal('update');
        expect(insert.type).to.equal('insert');
        expect(insert.node.type).to.equal('text');
        expect((insert.node as VText).value).to.equal('text');
    });

    it('should be remove', () => {
        const vDom2: VElement = {
            ...vDom1,
            children: [createText('text')],
        };
        const diff = createDifferent(vDom2, vDom1);
        const remove = (diff as UpdateOperation).children[0] as RemoveOperation;

        expect(diff.type).to.equal('update');
        expect(remove.type).to.equal('remove');
    });

    it('should be update props', () => {
        const vDom2: VElement = {
            ...vDom1,
            props: {
                className: 'class2',
            },
        };

        const diff = createDifferent(vDom1, vDom2);

        expect(diff.type).to.equal('update');
        expect((diff as UpdateOperation).removeAttributeKey).to.deep.equal(['className']);
        expect((diff as UpdateOperation).addVAttributes).to.deep.equal({ className: 'class2' });
    });
});
