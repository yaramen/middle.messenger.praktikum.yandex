import { store } from './store';
import { actions } from './actions';
import { createRouterState, goTo, PageType } from './router';

function goToHistory(path: string, skipHistory: boolean = false) {
    const { page } = store.getState();

    const isPageChange = goTo(path, page as PageType, skipHistory);

    if (isPageChange) {
        store.dispatch(actions.pageChange(createRouterState(path).page));
    }
}

window.addEventListener('popstate', (event) => {
    if (event.currentTarget && 'location' in event.currentTarget) {
        goToHistory((event.currentTarget.location as Location).pathname, true);
    }
});

export {
    goToHistory,
};
