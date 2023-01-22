import {html} from "../../modules/html";
import {PopupForm} from "../../layout/PopupForm";
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
    return html(PopupForm, {
        children: html(Form, {
            title: 'Вход',
            formData
        })
    })
}

export {
    Auth,
}