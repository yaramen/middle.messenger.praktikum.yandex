import {
    VAttributes,
    VElement,
    VNode,
    VText,
} from './types';

let key = 1;
function getKey() {
    return `key-${key++}`;
}

function createElement(tagName: string, props: VAttributes, ...children: VNode[]): VElement {
    return {
        type: 'element',
        key: getKey(),
        tagName,
        props,
        children,
    };
}

function createText(value: string): VText {
    return {
        type: 'text',
        key: getKey(),
        value,
    };
}

export {
    createElement,
    createText,
};
