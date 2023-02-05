import { VNode } from './types';

function render(root: VNode): HTMLElement | Text {
    if (root.type === 'text') {
        return document.createTextNode(root.value);
    }

    const { tagName, props = {}, children = [] } = root;
    const element = document.createElement(tagName);

    Object.keys(props).forEach((keyProp) => {
        (element as any)[keyProp] = props[keyProp];
    });

    children.forEach((child) => element.appendChild(render(child)));

    return element;
}

function renderDom(rootElement: Element, root: VNode) {
    rootElement.appendChild(render(root));
}

export {
    render,
    renderDom,
};
