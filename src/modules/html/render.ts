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

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        applyChildrenDiff(element, delta.children);
    }

    return element;
}

const applyChildrenDiff = (elem: HTMLElement | Text, operations: VNodeUpdater[]) => {
    let offset = 0;
    for (let i = 0; i < operations.length; i++) {
        const childUpdater = operations[i];

        if (childUpdater.type === 'skip') {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (childUpdater.type === 'insert') {
            if (elem.childNodes[i + offset - 1]) {
                elem.childNodes[i + offset - 1].after(render(childUpdater.node));
            } else {
                elem.appendChild(render(childUpdater.node));
            }
            // eslint-disable-next-line no-continue
            continue;
        }

        const childElem = elem.childNodes[i + offset];

        if (childUpdater.type === 'remove') {
            childElem.remove();
            offset -= 1;
            // eslint-disable-next-line no-continue
            continue;
        }

        applyUpdate(childElem as HTMLElement, childUpdater);
    }
};

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
