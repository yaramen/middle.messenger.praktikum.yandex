import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";
import {checkInFormData} from "./data";

function CheckIn() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Регистрация',
            formData: checkInFormData
        })
    })
}

export {
    CheckIn,
}