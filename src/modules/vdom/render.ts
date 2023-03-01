import { VNode, VNodeUpdater } from './types';
import { FunctionComponent } from './Component';

function render(root: VNode): HTMLElement | Text {
    if (root.type === 'text') {
        return document.createTextNode(root.value);
    }

    if (root.type === 'component') {
        let element: HTMLElement | Text;
        if (!root.instance) {
            root.instance = new FunctionComponent(root.props);
            root.instance.render = root.component;
            root.instance.init();
            element = render(root.instance._render(root.props));
            root.instance.setElement(element as HTMLElement);
        } else {
            element = render(root.instance._render(root.instance.getProps()));
        }

        if (root.children) {
            root.children.forEach((child: any) => (element as HTMLElement).appendChild(render(child)));
        }

        return element;
    }

    const { tagName, props = {}, children = [] } = root;
    const element = document.createElement(tagName);
    element.dataset.key = root.key;

    Object.keys(props).forEach((keyProp) => {
        if (keyProp === 'className') {
            element.className = props.className instanceof Array
                ? props.className.join(' ')
                : props.className as string;
            return;
        }
        (element as any)[keyProp] = props[keyProp];
    });

    children.forEach((child: any) => child && element.appendChild(render(child)));

    return element;
}

function applyUpdate(element: HTMLElement | Text, delta: VNodeUpdater): HTMLElement | Text {
    if (delta.type === 'replace') {
        const newElement = render(delta.node);
        element.replaceWith(newElement);
        return newElement;
    }

    if (delta.type === 'update' && element instanceof HTMLElement) {
        for (const att in delta.removeAttributeKey) {
            (element as HTMLElement).removeAttribute(att);
        }

        for (const att in delta.addVAttributes) {
            if (att === 'className') {
                (element as any)[att] = delta.addVAttributes.className instanceof Array
                    ? delta.addVAttributes.className.join(' ')
                    : delta.addVAttributes.className;
                continue;
            }
            (element as any)[att] = delta.addVAttributes[att];
        }

        applyChildrenDiff(element, delta.children);
    }

    return element;
}

const applyChildrenDiff = (elem: HTMLElement | Text, operations: VNodeUpdater[]) => {
    let offset = 0;
    for (let i = 0; i < operations.length; i++) {
        const childUpdater = operations[i];

        if (childUpdater.type === 'skip') {
            continue;
        }

        if (childUpdater.type === 'insert') {
            if (elem.childNodes[i + offset - 1]) {
                elem.childNodes[i + offset - 1].after(render(childUpdater.node));
            } else {
                elem.appendChild(render(childUpdater.node));
            }
            continue;
        }

        const childElem = elem.childNodes[i + offset];

        if (childUpdater.type === 'remove') {
            childElem && childElem.remove();
            offset--;
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
