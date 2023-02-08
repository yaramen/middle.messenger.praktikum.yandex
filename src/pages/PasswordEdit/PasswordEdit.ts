import { ProfileLayout } from '../../layout/ProfileLayout';
import { PasswordForm } from '../../components/PasswordForm';
import { createComponent } from '../../modules/vdom/createElement';

function PasswordEdit() {
    return createComponent(
        ProfileLayout,
        {
            key: 'password',
            content: createComponent(
                PasswordForm,
                {
                    key: 'form',
                },
            ),
        },
    );
}

export {
    PasswordEdit,
};
