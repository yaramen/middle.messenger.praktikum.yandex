import { ProfileLayout } from '../../layout/ProfileLayout';
import { createComponent } from '../../modules/vdom/createElement';
import { passwordFormData } from './data';
import { getLinkPage, goTo } from '../../modules/router';
import { FormEdit } from '../../components/FormEdit';

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
                    submit: () => goTo(getLinkPage('profile')),
                    cancel: () => goTo(getLinkPage('profile')),
                },
            ),
        },
    );
}

export {
    PasswordEdit,
};
