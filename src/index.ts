import './index.css';
import { createComponent, createElement, createText } from './modules/vdom/createElement';
import { renderDom } from './modules/vdom/render';

const root = document.querySelector('#root');
function Button() {
    return createElement('button', {
        onclick: this.props.onclick,
    }, createText(this.props.text));
}

const button1 = createComponent(Button, {
    onclick: () => console.log('test 1'),
    text: 'button 1',
}, createText('span 1'));

const button2 = createComponent(Button, {
    onclick: () => console.log('test 2'),
    text: 'button 2',
}, createText('span 1'));

const element1 = createElement(
    'div',
    {},
    button1,
    button2,
);

if (root) {
    const element = renderDom(root, element1);
}
