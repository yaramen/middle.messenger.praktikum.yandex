import {Auth} from "./pages/Auth";
import {CheckIn} from "./pages/CheckIn";
import {Messenger} from "./pages/Messenger";
import {html} from "./modules/html";
import {ErrorLayout} from "./layout/ErrorLayout";
import {EventEmit} from "./modules/event/EventEmit";

const event = new EventEmit();

const pages = {
    auth: Auth,
    checkIn: CheckIn,
    messenger: Messenger,
    error404: html(ErrorLayout, {
        title: 'Страница не найдена',
        code: 404,
    }),
    error500: html(ErrorLayout, {
        title: 'Ошибка сервера',
        code: 500,
    }),
};

let routerState = {
    path: '',
    page: null,
    id: null
}

window.addEventListener('popstate', () => {
    goTo(window.location.search)
})

function createRouterState(path) {
    const urlParams  = new URLSearchParams(path)
    const page = urlParams.get('page')
    const id = urlParams.get('id')

    return {
        path,
        page,
        id,
    }
}

function equalRoute(route1, route2) {
    return route1.page === route2.page && route1.id === route2.id
}

function getActiveRoute() {
    return createRouterState(window.location.search)
}

function getLinkPage(page, id = 0) {
    const idQuery = id ? `&id=${id}` :''
    return `?page=${page}${idQuery}`
}

function goTo(path) {
    const newRouterState = createRouterState(path)
    if (!equalRoute(routerState, newRouterState)) {
        window.history.pushState({}, Date.now().toString(), path)
        if (routerState.page !== newRouterState.page) {
            event.pageChange()
        }
        if (routerState.id !== newRouterState.id) {
            event.idChange()
        }
        routerState = newRouterState;
    }
}

export {
    pages,
    getActiveRoute,
    getLinkPage,
    goTo,
    event,
}