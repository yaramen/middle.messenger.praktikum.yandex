import { getLinkPage } from '../../modules/router';
import { FormData } from '../../types/form';

const checkInFormData: FormData = {
    fields: [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            validation: {
                pattern: {
                    reg: /[a-zA-Z\-_0-9]+@[a-zA-Z\-_0-9]+.[a-zA-Z\-_0-9]+/,
                    message: 'Не правильный email',
                },
            },
        },
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
            type: 'text',
            name: 'first_name',
            placeholder: 'Имя',
            validation: {
                pattern: {
                    reg: /^[A-ZА-Я][a-zA-Zа-яА-Я\-]+/,
                    message: 'Первая буква должна быть заглавной',
                },
            },
        },
        {
            type: 'text',
            name: 'second_name',
            placeholder: 'Фамилия',
            validation: {
                pattern: {
                    reg: /^[A-ZА-Я][a-zA-Zа-яА-Я\-]+/,
                    message: 'Первая буква должна быть заглавной',
                },
            },
        },
        {
            type: 'tel',
            name: 'phone',
            placeholder: 'Телефон',
            validation: {
                length: {
                    min: 10,
                    max: 15,
                },
                pattern: {
                    reg: /^\+?[0-9]+/,
                    message: 'Только из цифр',
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
                pattern: {
                    reg: /^.*[A-Z]+.*$/,
                    message: 'Должна быть хотя бы отдна заглавная буква',
                },
            },
        },
        {
            type: 'password',
            name: 'passwordRetry',
            placeholder: 'Пароль (еще раз)',
            validation: {
                equal: 'password',
            },
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
