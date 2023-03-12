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

function goTo(path: string, page: PageType, skipHistory: boolean = false) {
    const newRouterState = createRouterState(path);
    const isPageChange = page !== newRouterState.page;

    if (isPageChange && !skipHistory) {
        window.history.pushState({ ...newRouterState }, Date.now().toString(), path);
    }
    return isPageChange;
}

export {
    getActiveRoute,
    getLinkPage,
    createRouterState,
    goTo,
    PageType,
};
