import { getLinkPage } from '../../modules/router';
import { FormData } from '../../types/form';

const authFormData: FormData = {
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            validation: {
                length: {
                    min: 3,
                    max: 20,
                },
                pattern: {
                    reg: /^[a-zA-Z_-][a-zA-Z_\-0-9]+/,
                    message: 'Ошибка логина',
                },
            },
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            validation: {
                length: {
                    min: 8,
                    max: 40,
                },
            },
        },
    ],
    buttons: [
        {
            key: 'in',
            label: 'Вход',
            action: 'submit',
            link: getLinkPage('messenger'),
        },
        {
            key: 'reg',
            label: 'Нет аккаунта?',
            type: 'secondary',
            action: 'link',
            link: getLinkPage('checkIn'),
        },
    ],
};

export {
    authFormData,
};
