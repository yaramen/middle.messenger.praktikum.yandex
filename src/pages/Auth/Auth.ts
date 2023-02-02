import { html } from '../../modules/html';
import { PopupFormLayout } from '../../layout/PopupFormLayout';
import { Form } from '../../components/Form';
import { authFormData } from './data';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { goTo } from '../../modules/router';

function Auth() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Вход',
            formData: authFormData,
            submit: async (element, button, data) => {
                // @ts-ignore
                // eslint-disable-next-line no-restricted-globals
                event.preventDefault();
                if (button.action === 'link') {
                    goTo(button.link);
                } else {
                    store.dispatch(actions.auth({
                        login: data.login,
                        password: data.password,
                        link: button.link,
                    }));
                }
            },
        }),
    });
}

export {
    Auth,
};
