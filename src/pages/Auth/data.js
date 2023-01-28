import {getLinkPage} from "../../router";

const authFormData = {
    fields: [
        {
            type: "text",
            name: 'login',
            placeholder: 'Login',
        },
        {
            type: "password",
            name: 'password',
            placeholder: 'Password',
        }
    ],
    buttons: [
        {
            label: 'Авторизоваться',
            link: getLinkPage('messenger')
        },
        {
            type: 'secondary',
            label: 'Нет аккаунта?',
            link: getLinkPage('checkIn')
        }
    ]
}

export {
    authFormData
}