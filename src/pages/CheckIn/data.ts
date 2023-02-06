import { getLinkPage } from '../../modules/router';
import { FormData } from '../../types/form';

const checkInFormData: FormData = {
    fields: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
        },
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
        },
        {
            type: 'text',
            name: 'first_name',
            placeholder: 'Имя',
        },
        {
            type: 'text',
            name: 'second_name',
            placeholder: 'Фамилия',
        },
        {
            type: 'text',
            name: 'phone',
            placeholder: 'Телефон',
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
        },
        {
            type: 'password',
            name: 'passwordRetry',
            placeholder: 'Пароль (еще раз)',
        },
    ],
    buttons: [
        {
            key: 'reg',
            label: 'Зарегистрироваться',
            action: 'submit',
            link: getLinkPage('auth'),
        },
        {
            key: 'login',
            label: 'Войти',
            type: 'secondary',
            action: 'link',
            link: getLinkPage('auth'),
        },
    ],
};

export {
    checkInFormData,
};
