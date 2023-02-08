import { TextFieldLabel } from '../TextFieldLabel';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { FormField } from '../../types/form';
import styles from './ProfileForm.css';
import { Button } from '../Button';
import { getLinkPage, goTo } from '../../modules/router';
import { AvatarEdit } from '../AvatarEdit';

function ProfileForm({ data, isEdit }: { data: FormField[], isEdit: boolean }) {
    return createElement(
        'form',
        {},
        ...data.map((value) => (value.type === 'text'
            ? createComponent(
                TextFieldLabel,
                {
                    ...value,
                    readonly: !isEdit,
                    key: 'text-field',
                },
            )
            : createComponent(AvatarEdit, { key: 'avatar', value })
        )),
        isEdit
            ? createElement(
                'div',
                { className: styles.pair },
                createComponent(
                    Button,
                    {
                        key: 'save',
                        label: 'Сохранить',
                        click: () => goTo(getLinkPage('profile')),
                    },
                ),
                createComponent(
                    Button,
                    {
                        key: 'cansel',
                        label: 'Отмена',
                        click: () => goTo(getLinkPage('profile')),
                    },
                ),
            )
            : createElement(
                'div',
                {},
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
