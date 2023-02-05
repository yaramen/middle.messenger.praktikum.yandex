import { VNode, VNodeUpdater } from './types';

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

function applyUpdate(element: HTMLElement | Text, delta: VNodeUpdater): HTMLElement | Text {
    if (delta.type === 'skip') return element;

    if (delta.type === 'replace') {
        const newElement = render(delta.node);
        element.replaceWith(newElement);
        return newElement;
    }

    if (delta.type === 'update') {
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const att in delta.removeAttributeKey) {
            (element as HTMLElement).removeAttribute(att);
        }

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const att in delta.addVAttributes) {
            // eslint-disable-next-line no-param-reassign
            (element as any)[att] = delta.addVAttributes[att];
        }
    }

    return element;
}

function renderDom(rootElement: Element, root: VNode): HTMLElement | Text {
    const renderValue = render(root);
    rootElement.appendChild(renderValue);
    return renderValue;
}

export {
    render,
    renderDom,
    applyUpdate,
};
