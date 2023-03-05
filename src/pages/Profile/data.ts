import { FormField } from '../../types/form';
import { User } from '../../types/model';

function createProfileFormData(profile: User, isEdit: boolean): FormField[] {
    return [{
        name: 'email',
        value: profile.email,
        label: 'Email',
        type: 'text',
        validation: isEdit ? {
            pattern: {
                reg: /[a-zA-Z\-_0-9]+@[a-zA-Z\-_0-9]+.[a-zA-Z\-_0-9]+/,
                message: 'Не правильный email',
            },
        } : {},
    }, {
        name: 'login',
        value: profile.login,
        label: 'Логин',
        type: 'text',
        validation: isEdit ? {
            length: {
                min: 3,
                max: 20,
            },
            pattern: {
                reg: /^[a-zA-Z_-][a-zA-Z_\-0-9]+/,
                message: 'Ошибка логина',
            },
        } : {},
    }, {
        name: 'first_name',
        value: profile.first_name,
        label: 'Имя',
        type: 'text',
        validation: isEdit ? {
            pattern: {
                reg: /^[A-ZА-Я][a-zA-Zа-яА-Я\-]+/,
                message: 'Первая буква должна быть заглавной',
            },
        } : {},
    }, {
        name: 'second_name',
        value: profile.second_name,
        label: 'Фамилия',
        type: 'text',
        validation: isEdit ? {
            pattern: {
                reg: /^[A-ZА-Я][a-zA-Zа-яА-Я\-]+/,
                message: 'Первая буква должна быть заглавной',
            },
        } : {},
    }, {
        name: 'display_name',
        value: profile.display_name,
        label: 'Имя в чате',
        type: 'text',
        validation: isEdit ? {
            length: {
                min: 3,
                max: 20,
            },
        } : {},
    }, {
        name: 'phone',
        value: profile.phone,
        label: 'Телефон',
        type: 'text',
        validation: isEdit ? {
            length: {
                min: 10,
                max: 15,
            },
            pattern: {
                reg: /^\+?[0-9]+/,
                message: 'Только из цифр',
            },
        } : {},
    }];
}

export {
    createProfileFormData,
};
