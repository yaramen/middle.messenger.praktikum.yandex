import {html} from "../../modules/html";
import {PopupFormLayout} from "../../layout/PopupFormLayout";
import {Form} from "../../components/Form";
import {authFormData} from "./data";
import {actions, store} from "../../modules/store";
import {goTo} from "../../router";

function Auth() {
    return html(PopupFormLayout, {
        children: html(Form, {
            title: 'Вход',
            formData: authFormData,
            submit: async (element, button, data) => {
                event.preventDefault()
                if (button.action === 'link') {
                    goTo(button.link)
                } else {
                    store.dispatch(actions.auth({
                        login: data.login,
                        password: data.password,
                        link: button.link,
                    }))
                }
            }
        })
    })
}

export {
    Auth,
}