import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";
import {checkInFormData} from "./data";
import {actions, store} from "../../modules/store";
import {goTo} from "../../modules/router";

function CheckIn() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Регистрация',
            formData: checkInFormData,
            submit: async (element, button, data) => {
                event.preventDefault()
                if (button.action === 'link') {
                    goTo(button.link)
                } else {
                    store.dispatch(actions.checkIn({
                        link: button.link,
                        ...data
                    }))
                }
            }
        })
    })
}

export {
    CheckIn,
}