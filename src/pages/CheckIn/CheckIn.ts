import { html } from '../../modules/html';
import { PopupFormLayout } from '../../layout/PopupFormLayout';
import { Form } from '../../components/Form';
import { goTo } from '../../modules/router';
import { checkInFormData } from './data';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function CheckIn() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Регистрация',
            formData: checkInFormData,
            submit: async (element, button, data) => {
                // @ts-ignore
                // eslint-disable-next-line no-restricted-globals
                event.preventDefault();
                if (button.action === 'link') {
                    goTo(button.link);
                } else {
                    store.dispatch(actions.checkIn({
                        link: button.link,
                        ...data,
                    }));
                }
            },
        }),
    });
}

export {
    CheckIn,
};
