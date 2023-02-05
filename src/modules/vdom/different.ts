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

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const children = createDifferentChildren(oldVNode1.children, newVNode2.children);

        return createUpdate(addVAttributes, removeAttributeKey, children);
    }

    return createSkip();
}

const removeUntilkey = (
    operations: VNodeUpdater[],
    elems: [string | number, VNode][],
    key: string | number,
) => {
    while (elems[0] && elems[0][0] !== key) {
        operations.push(createRemove());
        elems.shift();
    }
};

const insertUntilKey = (
    operations: VNodeUpdater[],
    elems: [string | number, VNode][],
    key: string | number,
) => {
    while (elems[0] && elems[0][0] !== key) {
        // @ts-ignore
        operations.push(createInsert(elems.shift()[1]));
    }
};

function createDifferentChildren(oldChilds: VNode[], newChilds: VNode[]): VNodeUpdater[] {
    const remainingOldChilds: [string | number, VNode][] = oldChilds.map((c) => [c.key, c]);
    const remainingNewChilds: [string | number, VNode][] = newChilds.map((c) => [c.key, c]);

    const operations: VNodeUpdater[] = [];

    let [nextUpdateKey] = remainingOldChilds.find(
        (k) => remainingNewChilds.map((v) => v[0]).indexOf(k[0]) !== -1,
    ) || [null];

    while (nextUpdateKey) {
        removeUntilkey(operations, remainingOldChilds, nextUpdateKey);
        insertUntilKey(operations, remainingNewChilds, nextUpdateKey);

        operations.push(
            // @ts-ignore
            createDifferent(remainingOldChilds.shift()[1], remainingNewChilds.shift()[1]),
        );

        [nextUpdateKey] = remainingOldChilds
            .find((k) => remainingNewChilds.map((v) => v[0]).indexOf(k[0]) !== -1) || [null];
    }

    // @ts-ignore
    removeUntilkey(operations, remainingOldChilds, undefined);
    // @ts-ignore
    insertUntilKey(operations, remainingNewChilds, undefined);

    return operations;
}

export {
    createDifferent,
};
