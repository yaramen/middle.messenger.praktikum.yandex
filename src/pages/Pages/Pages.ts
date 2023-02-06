import { Auth } from '../Auth';
import { getActiveRoute, PageType } from '../../modules/router';
import styles from './Pages.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { ErrorLayout } from '../../layout/ErrorLayout';
import { store } from '../../modules/store';

const pages = {
    auth: createComponent(Auth, { key: 'auth' }),
    checkIn: createElement('div', {}, createText('checkIn')),
    messenger: createElement('div', {}, createText('messenger')),
    profile: createElement('div', {}, createText('profile')),
    profileEdit: createElement('div', {}, createText('profileEdit')),
    passwordEdit: createElement('div', {}, createText('passwordEdit')),
    error404: createComponent(ErrorLayout, {
        key: 'error404',
        title: 'Страница не найдена',
        code: 404,
    }),
    error500: createComponent(ErrorLayout, {
        key: 'error500',
        title: 'Ошибка сервера',
        code: 500,
    }),
};

function Pages() {
    const [page, setPage] = this.useState(getActiveRoute().page ? getActiveRoute().page : 'auth');
    const componentPage = pages[page as PageType] ?? pages.error404;

    this.useEffect(() => {
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.page !== newState.page) {
                setPage(newState.page);
            }
        });

        return unsubscribe;
    });

    return createElement(
        'div',
        { className: styles.page },
        componentPage,
        createElement(
            'div',
            {
                className: styles.overlay,
                'data-ref': 'overlay',
            },
        ),
    );
}

export {
    Pages,
};
