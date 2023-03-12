import { expect } from 'chai';
import {
    getActiveRoute, getLinkPage, goTo, PageType,
} from './router';

describe('router', () => {
    it('init router tobe empty', () => {
        const activeRouter = getActiveRoute();

        expect(activeRouter.path).to.equal('/');
        expect(activeRouter.page).to.equal('');
    });

    it('should be history length 2', () => {
        const activeRouter = getActiveRoute();

        goTo(getLinkPage('auth'), activeRouter.page as PageType);

        expect(window.history.length).to.eq(2);
        expect(window.history.state.page).to.eq('auth');
    });

    it('should be history length 3', () => {
        const activeRouter = getActiveRoute();

        goTo(getLinkPage('auth'), activeRouter.page as PageType);
        goTo(getLinkPage('messenger'), activeRouter.page as PageType);

        expect(window.history.length).to.eq(3);
        expect(window.history.state.page).to.eq('messenger');
    });
});
