import { FormField } from '../../types/form';

const passwordFormData: FormField[] = [
    {
        type: 'password',
        name: 'password',
        label: 'Старый пароль',
    },
    {
        type: 'password',
        name: 'newPassword',
        label: 'Новый пароль',
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
        name: 'newPasswordConfirm',
        label: 'Повторите пароль',
        validation: {
            equal: 'newPassword',
        },
    },
];

export {
    passwordFormData,
};
