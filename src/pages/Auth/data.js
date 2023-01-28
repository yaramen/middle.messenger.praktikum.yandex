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
            action: 'submit',
            link: getLinkPage('messenger')
        },
        {
            label: 'Нет аккаунта?',
            type: 'secondary',
            action: 'link',
            link: getLinkPage('checkIn')
        }
    ]
}

export {
    authFormData
}