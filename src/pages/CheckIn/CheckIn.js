import {html} from "../../modules/html";
import {PopupForm} from "../../layout/PopupForm";
import {Form} from "../../components/Form";

const formData = {
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
        },
        {
            type: 'link',
            label: 'Войти',
        }
    ]
}

function CheckIn() {
    return html(PopupForm, {
        children: html(Form, {
            title: 'Регистрация',
            formData
        })
    })
}

export {
    CheckIn,
}