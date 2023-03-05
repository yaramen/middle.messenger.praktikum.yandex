import { createComponent, createElement } from '../../modules/vdom/createElement';
import { FormField } from '../../types/form';
import { Button } from '../Button';
import { getLinkPage, goTo } from '../../modules/router';
import { AvatarEdit } from '../AvatarEdit';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { FormEdit } from '../FormEdit';
import { User } from '../../types/model';

interface ProfileFormProps {
    fields: FormField[],
    isEdit: boolean,
    profile: User,
}

function ProfileForm({ fields, isEdit, profile }: ProfileFormProps) {
    return createElement(
        'div',
        {
            key: 'ProfileForm',
        },
        createComponent(
            AvatarEdit,
            {
                key: 'avatar',
                value: {
                    name: 'avatar',
                    value: profile.avatar,
                    label: profile.display_name,
                    type: 'image',
                },
            },
        ),
        createComponent(
            FormEdit,
            {
                key: 'form-edit',
                fields,
                isEdit,
                submit: (data) => store.dispatch(actions.profileUpdate(data)),
                cancel: () => goTo(getLinkPage('settings')),
            },
        ),
        isEdit ? null : createElement(
            'div',
            {
                key: 'action-list',
            },
            createComponent(
                Button,
                {
                    key: 'data',
                    label: 'Изменить данные',
                    style: 'link',
                    click: () => goTo(getLinkPage('settings-edit')),
                },
            ),
            createComponent(
                Button,
                {
                    key: 'password',
                    label: 'Изменить пароль',
                    style: 'link',
                    click: () => goTo(getLinkPage('settings-password-edit')),
                },
            ),
        ),
    );
}

export {
    ProfileForm,
};
