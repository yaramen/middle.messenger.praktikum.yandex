import { getLinkPage } from '../../modules/router';
import { FormData } from '../../types/form';

const authFormData: FormData = {
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Login',
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
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
