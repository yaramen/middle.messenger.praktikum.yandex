import { VNode } from './types';
import { createDifferent } from './different';
import { applyUpdate } from './render';

abstract class Component<PROPS> {
    protected props: PROPS;

    protected state: Array<any> = [];

    protected stateIndex: number = 0;

    protected isInit: boolean = false;

    protected vNode: VNode;

    protected element: HTMLElement | null = null;

    constructor(props: PROPS) {
        this.props = props;
    }

    public setElement(element: HTMLElement) {
        this.element = element;
    }

    public getElement() {
        return this.element;
    }

    public getVNode(): VNode {
        return this.vNode;
    }

    public setVNode(value: VNode) {
        this.vNode = value;
    }

    public init() {
        this._render(this.props);
        this.isInit = true;
    }

    public useState(initValue: unknown) {
        if (!this.isInit) {
            const value = initValue;
            const setValue = (index: number) => (v: unknown) => {
                this.state[index][0] = v;
                this._render(this.props);
            };
            const stateValue = [value, setValue(this.stateIndex++)];
            this.state.push(stateValue);
            return stateValue;
        }
        const value = this.state[this.stateIndex++];
        return value;
    }

    getProps() {
        return this.props;
    }

    public abstract render(props: PROPS): VNode;

    public _render(props: PROPS): VNode {
        this.props = props;
        const oldVNode = this.vNode;
        const newVNode = this.render(this.props);
        this.vNode = newVNode;
        if (oldVNode && newVNode && this.element) {
            const diff = createDifferent(oldVNode, newVNode);
            applyUpdate(this.element, diff);
        }
        this.stateIndex = 0;
        return this.vNode;
    }
}

// @ts-ignore
// eslint-disable-next-line react/prefer-stateless-function
class FunctionComponent<T> extends Component<T> {
}

export {
    Component,
    FunctionComponent,
};
