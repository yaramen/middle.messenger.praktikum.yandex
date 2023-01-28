import {getLinkPage} from "../../modules/router";

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
            label: 'Вход',
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