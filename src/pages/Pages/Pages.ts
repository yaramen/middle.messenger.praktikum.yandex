import { Auth } from '../Auth';
import { getActiveRoute, PageType } from '../../modules/router';
import styles from './Pages.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { ErrorLayout } from '../../layout/ErrorLayout';
import { store } from '../../modules/store';
import { CheckIn } from '../CheckIn';
import { Messenger } from '../Messenger';
import { Profile } from '../Profile';
import { PasswordEdit } from '../PasswordEdit';

const pages = {
    auth: createComponent(Auth, { key: 'auth' }),
    checkIn: createComponent(CheckIn, { key: 'CheckIn' }),
    messenger: createComponent(Messenger, { key: 'messenger' }),
    profile: createComponent(Profile, { key: 'profile', isEdit: false }),
    profileEdit: createComponent(Profile, { key: 'profile', isEdit: true }),
    passwordEdit: createComponent(PasswordEdit, { key: 'passwordEdit' }),
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

    this.useEffectOnce(() => {
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
