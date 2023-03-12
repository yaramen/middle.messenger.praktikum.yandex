import { expect } from 'chai';
import { createComponent, createElement, createText } from './createElement';

describe('vDom create element', () => {
    it('should be element', () => {
        const { type } = createElement('div', {}, null);

        expect(type).to.equal('element');
    });

    it('should return tag div', () => {
        const { tagName } = createElement('div', {}, null);

        expect(tagName).to.equal('div');
    });

    it('should add attributes on tag', () => {
        const { props } = createElement('div', { className: 'className' }, null);

        expect(props.className).to.equal('className');
    });

    it('should add children', () => {
        const elements = [
            createElement('h1', {}, null),
            createElement('p', {}, null),
        ];

        const { children } = createElement('div', {}, ...elements);

        expect(children).to.deep.equal(elements);
    });
});

describe('vDom create component', () => {
    const Title = ({ title }: { title: string }) => createElement('h1', {}, createText(title));
    const childrenText = createText('children text');
    const component = createComponent(Title, {
        key: 'key',
        title: 'title',
    }, childrenText);

    it('should be component', () => {
        expect(component.type).to.equal('component');
    });

    it('should be have link on Component', () => {
        expect(component.component).to.equal(Title);
    });

    it('should apply props', () => {
        expect(component.props.title).to.equal('title');
    });

    it('should apply props', () => {
        expect(component.children![0]).to.deep.equal(childrenText);
    });
});

describe('vDom create text nodes', () => {
    it('should be text', () => {
        const { type } = createText('Text value');

        expect(type).to.equal('text');
    });

    it('should be text value', () => {
        const { value } = createText('Text value');

        expect(value).to.equal('Text value');
    });
});
