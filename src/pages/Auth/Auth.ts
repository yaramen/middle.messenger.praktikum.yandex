import { PopupFormLayout } from '../../layout/PopupFormLayout';
import { Form } from '../../components/Form';
import { authFormData } from './data';
import { createComponent } from '../../modules/vdom/createElement';
import { goTo } from '../../modules/router';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function Auth() {
    return createComponent(
        PopupFormLayout,
        {
            key: 'form',
        },
        createComponent(
            Form,
            {
                key: 'form',
                title: 'Вход',
                formData: authFormData,
                submit: (e, button, data) => {
                    e.preventDefault();
                    if (button.type === 'submit') {
                        store.dispatch(actions.auth({
                            ...data,
                            link: button.link,
                        }));
                    } else {
                        goTo(button.link);
                    }
                },
            },
        ),
    );
}

export {
    Auth,
};
