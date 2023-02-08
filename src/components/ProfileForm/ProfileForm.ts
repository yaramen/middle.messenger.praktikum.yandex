import { createComponent, createElement } from '../../modules/vdom/createElement';
import { FormField } from '../../types/form';
import { Button } from '../Button';
import { getLinkPage, goTo } from '../../modules/router';
import { AvatarEdit } from '../AvatarEdit';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { FormEdit } from '../FormEdit';
import { Profile } from '../../types/model';

interface ProfileFormProps {
    fields: FormField[],
    isEdit: boolean,
    profile: Profile,
}

function ProfileForm({ fields, isEdit, profile }: ProfileFormProps) {
    return createElement(
        'div',
        {},
        createComponent(
            AvatarEdit,
            {
                key: 'avatar',
                value: {
                    name: 'avatar',
                    value: profile.avatar,
                    label: profile.nickName,
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
                cancel: () => goTo(getLinkPage('profile')),
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
                    type: 'link',
                    click: () => goTo(getLinkPage('profileEdit')),
                },
            ),
            createComponent(
                Button,
                {
                    key: 'password',
                    label: 'Изменить пароль',
                    type: 'link',
                    click: () => goTo(getLinkPage('passwordEdit')),
                },
            ),
        ),
    );
}

export {
    ProfileForm,
};
