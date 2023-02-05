import {
    SkipOperation,
    InsertOperation,
    RemoveOperation,
    ReplaceOperation,
    UpdateOperation,
    VNode,
    VNodeUpdater,
    VAttributes,
} from './types';

function createSkip(): SkipOperation {
    return {
        type: 'skip',
    };
}

function createReplace(newNode: VNode): ReplaceOperation {
    return {
        type: 'replace',
        node: newNode,
    };
}

function createInsert(node: VNode): InsertOperation {
    return {
        type: 'insert',
        node,
    };
}

function createRemove(): RemoveOperation {
    return {
        type: 'remove',
    };
}

function createUpdate(
    addVAttributes: VAttributes,
    removeAttributeKey: string[],
    children: VNodeUpdater[],
): UpdateOperation {
    return {
        type: 'update',
        addVAttributes,
        removeAttributeKey,
        children,
    };
}

function createDifferent(oldVNode1: VNode, newVNode2: VNode): VNodeUpdater {
    if (oldVNode1.type === 'text'
        && newVNode2.type === 'text'
        && oldVNode1.value === newVNode2.value
    ) {
        return createSkip();
    }

    if (oldVNode1.type === 'text' && newVNode2.type === 'text') {
        return createReplace(newVNode2);
    }

    if (oldVNode1.type === 'element' && newVNode2.type === 'element') {
        const removeAttributeKey = Object.keys(oldVNode1.props)
            .filter((attrKey) => !Object.keys(newVNode2).includes(attrKey));

        const addVAttributes = Object.keys(newVNode2.props)
            .filter((attrKey) => oldVNode1.props[attrKey] !== newVNode2.props[attrKey])
            .reduce((acc, key) => ({ ...acc, [key]: newVNode2.props[key] }), {});

        return createUpdate(addVAttributes, removeAttributeKey, []);
    }

    return createSkip();
}

export {
    createDifferent,
};
