import {
    InsertOperation,
    RemoveOperation,
    ReplaceOperation,
    SkipOperation,
    UpdateOperation,
    VAttributes,
    VElement,
    VNode,
    VNodeUpdater,
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
    if (!oldVNode1 || !newVNode2) {
        return createSkip();
    }

    if (oldVNode1.type === 'text'
        && newVNode2.type === 'text'
        && oldVNode1.value === newVNode2.value
    ) {
        return createSkip();
    }

    if (oldVNode1.type === 'text' && newVNode2.type === 'text') {
        return createReplace(newVNode2);
    }

    if (oldVNode1.type === 'component'
        && newVNode2.type === 'component'
        && oldVNode1.component === newVNode2.component
        && oldVNode1.instance
    ) {
        const { instance } = oldVNode1;
        const vNodeComponent = instance.getVNode();
        const newRootNode = instance.render(newVNode2.props);
        // eslint-disable-next-line no-param-reassign
        newVNode2.instance = instance;
        instance?.setVNode(newRootNode);

        const diff = createDifferent(vNodeComponent, newRootNode);
        return diff;
    }

    const removeAttributeKey = Object.keys((oldVNode1 as VElement).props)
        .filter((attrKey) => !Object.keys(newVNode2).includes(attrKey));

    const addVAttributes = Object.keys((newVNode2 as VElement).props)
        .filter((attrKey) => (oldVNode1 as VElement).props[attrKey] !== (newVNode2 as VElement).props[attrKey])
        .reduce((acc, key) => ({ ...acc, [key]: (newVNode2 as VElement).props[key] }), {});

    // @ts-ignore
    const children = createDifferentChildren(oldVNode1.children, newVNode2.children);

    return createUpdate(addVAttributes, removeAttributeKey, children);
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
    const remainingOldChilds: [string | number, VNode][] = oldChilds.map((v) => [v.key, v]);
    const remainingNewChilds: [string | number, VNode][] = newChilds.map((v) => [v.key, v]);

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
