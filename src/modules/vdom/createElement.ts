import {
    VAttributes, VComponent, VElement, VNode, VText,
} from './types';

let key = 1;
function getKey(props?: any) {
    if (props && 'key' in props && props.key) {
        return props.key;
    }
    return `key-${key++}`;
}

function clearChildren(chs: (VNode | null)[]): VNode[] {
    return chs.filter((v) => !!v) as VNode[];
}

function createElement(tagName: string, props: VAttributes, ...children: (VNode | null)[]): VElement {
    return {
        type: 'element',
        key: getKey(props),
        tagName,
        props,
        children: clearChildren(children),
    };
}

function createComponent<PROPS>(
    component: (props: PROPS) => VNode,
    props: PROPS & { key: string },
    ...children: (VNode | null)[]
): VComponent<PROPS> {
    return {
        type: 'component',
        component,
        props,
        key: getKey(props),
        children: clearChildren(children),
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
    createComponent,
    createText,
};
