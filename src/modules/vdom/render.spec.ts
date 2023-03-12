import { expect } from 'chai';
import { createComponent, createElement, createText } from './createElement';
import { applyUpdate, render, renderDom } from './render';
import { createDifferent } from './different';

describe('render text value', () => {
    it('should be node text equal', () => {
        const textNode = render(createText('text'));
        expect(textNode.nodeValue).to.equal('text');
    });
});

describe('render element', () => {
    it('should be added css class', () => {
        const element = render(createElement('div', { className: 'class1' }, null));

        expect((element as HTMLElement).className).to.equal('class1');
    });

    it('should be contain text', () => {
        const element = render(createElement('div', { className: 'class1' }, createText('text')));

        expect((element as HTMLElement).innerHTML).to.equal('text');
    });
});

describe('render component', () => {
    const Title = ({ title }: { title: string }) => createElement('h1', {}, createText(title));
    const vDom1 = createComponent(Title, {
        key: 'key',
        title: 'test title',
    }, null);
    const dom = render(vDom1) as HTMLElement;

    it('should be apply props', () => {
        expect(dom.innerHTML).to.equal('test title');
    });

    it('should be apply update', () => {
        const vDom2 = { ...vDom1, props: { key: 'key', title: 'test title2' } };
        const diff = createDifferent(vDom1, vDom2);
        applyUpdate(dom, diff);

        expect(dom.innerHTML).to.equal('test title2');
    });
});

describe('render in dom', () => {
    it('should be apply props', () => {
        const root = document.querySelector('#root') as HTMLElement;

        renderDom(root, createElement('h1', {}, createText('title')));
        const title = (root.querySelector('h1') as HTMLElement).innerHTML;

        expect(title).to.equal('title');
    });
});
