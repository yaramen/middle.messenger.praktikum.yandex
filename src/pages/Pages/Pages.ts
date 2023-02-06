import { Auth } from '../Auth';
import { getActiveRoute, PageType } from '../../modules/router';
import styles from './Pages.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

const pages = {
    auth: createComponent(Auth, { key: 'auth' }),
    checkIn: createElement('div', {}, createText('checkIn')),
    messenger: createElement('div', {}, createText('messenger')),
    profile: createElement('div', {}, createText('profile')),
    profileEdit: createElement('div', {}, createText('profileEdit')),
    passwordEdit: createElement('div', {}, createText('passwordEdit')),
    error404: createElement('div', {}, createText('error404')),
    error500: createElement('div', {}, createText('error500')),
};

function Pages() {
    const activePage = getActiveRoute().page ? getActiveRoute().page : 'auth';
    const componentPage = pages[activePage as PageType] ?? pages.error404;

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
