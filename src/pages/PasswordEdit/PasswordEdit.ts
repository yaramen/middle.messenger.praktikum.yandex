import { ProfileLayout } from '../../layout/ProfileLayout';
import { createComponent } from '../../modules/vdom/createElement';
import { passwordFormData } from './data';
import { getLinkPage, goTo } from '../../modules/router';
import { FormEdit } from '../../components/FormEdit';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function PasswordEdit() {
    return createComponent(
        ProfileLayout,
        {
            key: 'password',
            content: createComponent(
                FormEdit,
                {
                    fields: passwordFormData,
                    key: 'form',
                    submit: (data) => store.dispatch(actions.passwordUpdate(data)),
                    cancel: () => goTo(getLinkPage('settings')),
                },
            ),
        },
    );
}

export {
    PasswordEdit,
};
