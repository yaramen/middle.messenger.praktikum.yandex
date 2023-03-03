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
import { actions } from '../../modules/actions';
import { Loading } from '../../components/Loading';

const pages = {
    auth: createComponent(Auth, { key: 'auth' }),
    'sign-up': createComponent(CheckIn, { key: 'sign-up' }),
    messenger: createComponent(Messenger, { key: 'messenger' }),
    settings: createComponent(Profile, { key: 'settings ', isEdit: false }),
    'settings-edit': createComponent(Profile, { key: 'settings-edit', isEdit: true }),
    'settings-password-edit': createComponent(PasswordEdit, { key: 'settings-password-edit' }),
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

const defaultPage: PageType = 'auth';

function Pages() {
    const [page, setPage] = this.useState(getActiveRoute().page ? getActiveRoute().page : defaultPage);
    const [isInit, setIsInit] = this.useState(false);
    const componentPage = pages[page() as PageType] ?? pages.error404;

    this.useEffectOnce(() => {
        store.dispatch(actions.initAction({}));
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.page !== newState.page) {
                setPage(newState.page);
            } else if (oldState.isInit !== newState.isInit) {
                setIsInit(newState.isInit);
            } else if (page() && oldState.force !== newState.force) {
                setPage(page());
            }
        });
        return unsubscribe;
    });

    return createElement(
        'div',
        { className: styles.page },
        isInit() ? componentPage : createComponent(Loading, { key: 'loading' }),
        createElement(
            'div',
            {
                className: styles.overlay,
                'data-ref': 'overlay',
            },
        ),
        createElement(
            'div',
            {
                className: styles.messages,
            },
        ),
    );
}

export {
    Pages,
};
