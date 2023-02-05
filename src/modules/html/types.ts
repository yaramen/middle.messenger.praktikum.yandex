type VAttributes = Record<string, Object>;

interface VElement {
    type: 'element',
    key: string
    tagName: string,
    props?: VAttributes
    children?: VNode[],
}

interface VText {
    type: 'text',
    key: string,
    value: string,
}

type VNode = VElement | VText;

interface SkipOperation {
    type: 'skip';
}

interface InsertOperation {
    type: 'insert',
    node: VNode,
}

interface RemoveOperation {
    type: 'remove'
}

interface ReplaceOperation {
    type: 'replace',
    node: VNode,
}

interface UpdateOperation {
    type: 'update',
    add: VAttributes,
    remove: string[],
    children: VNodeUpdater[]
}

type VNodeUpdater = SkipOperation
| InsertOperation
| RemoveOperation
| ReplaceOperation
| UpdateOperation;

export {
    VAttributes,
    VElement,
    VText,
    VNode,

    SkipOperation,
    InsertOperation,
    RemoveOperation,
    ReplaceOperation,
    UpdateOperation,
    VNodeUpdater,
};
