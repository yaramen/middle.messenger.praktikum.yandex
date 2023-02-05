import './index.css';
import { createElement, createText } from './modules/html/createElement';
import { renderDom } from './modules/html/render';
import { createDifferent } from './modules/html/different';

const root = document.querySelector('#root');

const element1 = createElement('button', {
    onclick: () => console.log('test 1'),
}, createElement('span', {}, createText('span 1')));

const element2 = createElement('button', {
    onclick: () => console.log('test 1'),
}, createElement('span', {}, createText('span 1')));

const diff = createDifferent(element1, element2);
console.log(diff);

if (root) {
    renderDom(root, element1);
}
