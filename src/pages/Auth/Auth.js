import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";
import {getLinkPage} from "../../router";

const formData = {
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

function Auth() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Вход',
            formData
        })
    })
}

export {
    Auth,
}