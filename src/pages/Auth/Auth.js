import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";
import {authFormData} from "./data";

function Auth() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Вход',
            formData: authFormData,
        })
    })
}

export {
    Auth,
}