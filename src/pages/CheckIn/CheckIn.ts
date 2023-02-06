import { PopupFormLayout } from '../../layout/PopupFormLayout';
import { Form } from '../../components/Form';
import { goTo } from '../../modules/router';
import { checkInFormData } from './data';
import { createComponent } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function CheckIn() {
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
                formData: checkInFormData,
                submit: (e, button, data) => {
                    e.preventDefault();
                    if (button.action === 'link') {
                        goTo(button.link);
                    } else {
                        store.dispatch(actions.checkIn({
                            link: button.link,
                            ...data,
                        }));
                    }
                },
            },
        ),
    );
}

export {
    CheckIn,
};
