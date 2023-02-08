import { TextFieldLabel } from '../TextFieldLabel';
import { Button } from '../Button';
import { getLinkPage, goTo } from '../../modules/router';
import styles from './PasswordForm.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function PasswordForm() {
    return createElement(
        'form',
        {},
        createComponent(
            TextFieldLabel,
            {
                key: 'password',
                type: 'password',
                name: 'oldPassword',
                label: 'Старый пароль',
            },
        ),
        createComponent(
            TextFieldLabel,
            {
                key: 'newPassword',
                type: 'password',
                name: 'newPassword',
                label: 'Новый пароль',
            },
        ),
        createComponent(
            TextFieldLabel,
            {
                key: 'confirm',
                type: 'password',
                name: 'newPassword',
                label: 'Повторите пароль',
            },
        ),
        createElement(
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
                    key: 'save',
                    label: 'Отмена',
                    click: () => goTo(getLinkPage('profile')),
                },
            ),
        ),
    );
}

export {
    PasswordForm,
};
