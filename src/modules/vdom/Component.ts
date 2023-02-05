import { VNode } from './types';

abstract class Component<PROPS> {
    protected props: PROPS;

    private vNode: VNode;

    constructor(props: PROPS) {
        this.props = props;
        this.vNode = this.render();
    }

    public getVNode() {
        return this.vNode;
    }

    public abstract render(): VNode;
}

export {
    Component,
};
