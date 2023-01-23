import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";

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
        },
        {
            type: 'link',
            label: 'Нет аккаунта?',
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