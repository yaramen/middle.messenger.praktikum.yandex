import {getLinkPage} from "../../router";

const checkInFormData = {
    fields: [
        {
            type: "email",
            name: 'email',
            placeholder: 'Email',
        },
        {
            type: "text",
            name: 'login',
            placeholder: 'Login',
        },
        {
            type: "text",
            name: 'lastName',
            placeholder: 'Last Name',
        },
        {
            type: "text",
            name: 'secondName',
            placeholder: 'Second Name',
        },
        {
            type: "text",
            name: 'phone',
            placeholder: 'Phone',
        },
        {
            type: "password",
            name: 'password',
            placeholder: 'Password',
        },
        {
            type: "password",
            name: 'passwordRetry',
            placeholder: 'Password (retry)',
        }
    ],
    buttons: [
        {
            label: 'Зарегистрироваться',
            link: getLinkPage('messenger')
        },
        {
            type: 'secondary',
            label: 'Войти',
            link: getLinkPage('auth')
        }
    ]
}

export {
    checkInFormData
}