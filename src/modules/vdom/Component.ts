import { VNode } from './types';

abstract class Component<PROPS> {
    protected props: PROPS;

    constructor(props: PROPS) {
        this.props = props;
    }

    // @ts-ignore
    public render(): VNode;
}

// eslint-disable-next-line react/prefer-stateless-function
class FunctionComponent<T> extends Component<T> {
}

export {
    Component,
    FunctionComponent,
};
