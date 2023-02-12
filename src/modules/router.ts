import { store } from './store';
import { actions } from './actions';

type PageType = 'auth' | 'checkIn' | 'messenger' | 'profile' | 'profileEdit' | 'passwordEdit' | 'error404' | 'error500';

function createRouterState(path: string): { path: string, page:string, id: string } {
    const urlParams = new URLSearchParams(path);
    const page = urlParams.get('page');
    const id = urlParams.get('id');

    return {
        path,
        page: page || '',
        id: id || '',
    };
}

function getActiveRoute() {
    return createRouterState(window.location.search);
}

function getLinkPage(page: PageType, id = 0) {
    const idQuery = id ? `&id=${id}` : '';
    return `?page=${page}${idQuery}`;
}

function goTo(path: string) {
    const newRouterState = createRouterState(path);
    const { page, chatId } = store.getState();
    const isPageChange = page !== newRouterState.page;
    const isChatChange = chatId !== +newRouterState.id;

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
    PageType,
};
