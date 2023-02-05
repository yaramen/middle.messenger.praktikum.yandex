// eslint-disable-next-line import/no-cycle
import { store } from './store';
import { actions } from './actions';

function createRouterState(path) {
    const urlParams = new URLSearchParams(path);
    const page = urlParams.get('page');
    const id = urlParams.get('id');

    return {
        path,
        page,
        id,
    };
}

function getActiveRoute() {
    return createRouterState(window.location.search);
}

function getLinkPage(page, id = 0) {
    const idQuery = id ? `&id=${id}` : '';
    return `?page=${page}${idQuery}`;
}

function goTo(path) {
    const newRouterState = createRouterState(path);
    const { page, id } = store.getState();
    const isPageChange = page !== newRouterState.page;
    const isChatChange = id !== newRouterState.id;

    if (isPageChange || isChatChange) {
        window.history.pushState({}, Date.now().toString(), path);
        if (isPageChange) {
            store.dispatch(actions.pageChange(newRouterState.page));
        }
        if (isChatChange) {
            store.dispatch(actions.chatChange(Number(newRouterState.id)));
        }
    }
}

window.addEventListener('popstate', () => {
    goTo(window.location.search);
});

export {
    getActiveRoute,
    getLinkPage,
    goTo,
};