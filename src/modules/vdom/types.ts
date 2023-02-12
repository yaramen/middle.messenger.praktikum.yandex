import { FunctionComponent } from './Component';

type PropsKey = 'className' | 'onclick' | string;
type VAttributes = Record<PropsKey, unknown>;

interface VElement {
    type: 'element',
    key: string
    tagName: string,
    props: VAttributes
    children?: VNode[],
}

export interface VComponent<PROPS> {
    type: 'component'
    props: PROPS
    component: (props:PROPS) => VNode,
    instance?: FunctionComponent<PROPS>,
    key: string
    children?: VNode[],
}

interface VText {
    type: 'text',
    key: string,
    value: string,
}

type VNode = VElement | VComponent<any> | VText;

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
    addVAttributes: VAttributes,
    removeAttributeKey: string[],
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
