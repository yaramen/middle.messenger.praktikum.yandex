import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { createElement, createText } from './createElement';
import { FunctionComponent } from './Component';
import { VElement, VText } from './types';

chai.use(spies);

describe('component', () => {
    it('should equal props text', () => {
        const funcComponent = new FunctionComponent({ text: 'text' });
        funcComponent.render = ({ text }: { text: string }) => createElement('div', {}, createText(text));
        funcComponent.init();

        const vDom = funcComponent.getVNode();
        expect(funcComponent.getProps().text).to.equal('text');
        expect(((vDom as VElement).children![0] as VText).value).to.equal('text');
    });

    it('should change state', () => {
        // @ts-ignore
        const funcComponent: FunctionComponent<void> & { increment: () => void } = new FunctionComponent();
        // eslint-disable-next-line func-names
        funcComponent.render = function () {
            const [getIndex, setIndex] = this.useState(0);
            this.increment = () => setIndex(getIndex() + 1);
            return createElement('div', {}, createText(getIndex()));
        };
        funcComponent.init();

        funcComponent.increment();
        funcComponent.increment();

        expect(funcComponent.getState()[0][2]).to.equal(2);
    });

    it('should useEffect once', () => {
        // @ts-ignore
        const funcComponent: FunctionComponent<void> & { increment: () => void } = new FunctionComponent();
        const callback = () => ({});
        const spyCallback = chai.spy(callback);
        // eslint-disable-next-line func-names
        funcComponent.render = function () {
            const [getIndex, setIndex] = this.useState(0);
            this.increment = () => setIndex(getIndex() + 1);
            this.useEffectOnce(spyCallback);
            return createElement('div', {}, createText(getIndex()));
        };
        funcComponent.init();

        funcComponent.increment();
        funcComponent.increment();

        expect(spyCallback).to.have.been.called.once;
    });
});
