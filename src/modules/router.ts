import { store } from './store';
import { actions } from './actions';

type PageType =
    'auth'
    | 'sign-up'
    | 'messenger'
    | 'settings'
    | 'settings-edit'
    | 'settings-password-edit'
    | 'error404'
    | 'error500';

function createRouterState(path: string): { path: string, page:string, id: string } {
    const [page, id] = path.slice(1).split('/');

    return {
        path,
        page: page || '',
        id: id || '',
    };
}

function getActiveRoute() {
    return createRouterState(window.location.pathname);
}

function getLinkPage(page: PageType, id = 0) {
    const idQuery = id ? `/${id}` : '';
    return `/${page}${idQuery}`;
}

function goTo(path: string, skipHistory: boolean = false) {
    const { page, chatId } = store.getState();
    const newRouterState = createRouterState(path);
    const isPageChange = page !== newRouterState.page;
    const isChatChange = chatId !== +newRouterState.id;

    if (isPageChange || isChatChange) {
        if (!skipHistory) {
            window.history.pushState({ ...newRouterState }, Date.now().toString(), path);
        }
        if (isPageChange) {
            store.dispatch(actions.pageChange(newRouterState.page));
        }
        if (isChatChange) {
            // store.dispatch(actions.chatChange(Number(newRouterState.id)));
        }
    }
}

window.addEventListener('popstate', (event) => {
    if (event.currentTarget && 'location' in event.currentTarget) {
        goTo((event.currentTarget.location as Location).pathname, true);
    }
});

export {
    getActiveRoute,
    getLinkPage,
    goTo,
    PageType,
};
