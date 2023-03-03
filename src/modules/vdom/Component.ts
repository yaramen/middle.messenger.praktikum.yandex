// eslint-disable-next-line max-classes-per-file
import { VNode } from './types';
import { createDifferent, unmountChildren } from './different';
import { applyUpdate } from './render';

abstract class Component<PROPS> {
    protected props: PROPS;

    protected state: Array<any> = [];

    protected hookIndex: number = 0;

    protected isInit: boolean = false;

    protected vNode: VNode;

    protected mountFn: () => void;

    protected element: HTMLElement | null = null;

    constructor(props: PROPS) {
        this.props = props;
    }

    public setElement(element: HTMLElement) {
        this.element = element;
        this.mountFn && setTimeout(() => this.mountFn(), 0);
    }

    public onMount(func: () => void) {
        this.mountFn = func;
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

    public unmount() {
        if ('children' in this.vNode) {
            unmountChildren(this.vNode.children);
        }

        this.element = null;
        this.state.forEach((v) => {
            if (typeof v === 'function') {
                v();
            }
        });
    }

    public useState<T>(initValue: T | null): [(v: T) => void, (v: T) => void] {
        if (!this.isInit) {
            const setValue = (index: number) => (v: unknown) => {
                this.state[index][2] = v;
                this._render(this.props);
            };
            const index = this.hookIndex;
            const stateValue = [() => this.state[index][2], setValue(this.hookIndex++), initValue];
            this.state.push(stateValue);
            // @ts-ignore
            return stateValue;
        }
        const value = this.state[this.hookIndex++];
        return value;
    }

    public useEffectOnce(func: () => void) {
        if (!this.isInit) {
            this.state.push(func());
            this.hookIndex++;
        }

        this.hookIndex++;
    }

    getProps() {
        return this.props;
    }

    public forceUpdate() {
        this.render(this.getProps());
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
        this.hookIndex = 0;
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
