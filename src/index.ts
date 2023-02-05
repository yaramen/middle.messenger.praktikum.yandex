import './index.css';
import { createComponent, createElement, createText } from './modules/vdom/createElement';
import { renderDom } from './modules/vdom/render';
import { Component } from './modules/vdom/Component';

const root = document.querySelector('#root');

class Button extends Component<{ onclick: Function }> {
    render() {
        return createElement('button', {
            onclick: this.props.onclick,
        }, createText('Button'));
    }
}

const button1 = createComponent(Button, {
    onclick: () => console.log('test 1'),
}, createText('span 1'));

const button2 = createComponent(Button, {
    onclick: () => console.log('test 2'),
}, createText('span 1'));

const element1 = createElement(
    'div',
    {},
    button1,
    button2,
);

if (root) {
    const element = renderDom(root, element1);
    // applyUpdate(element, diff);
}
