import {html} from "../../modules/html";
import styles from "./Form.css";
import {TextField} from "../TextField";
import {Button} from "../Button";
import {goTo} from "../../modules/router";

function Form({
    title,
    formData,
    submit
}) {
    const formState = formData.fields.reduce((acc, curr) => {
        acc[curr.name] = ''
        return acc
    }, {})

    function updateFormState(value) {
        formState[event.target.name] = value
    }

    return html`
<form class="${styles.form}">
    <h1 class="${styles.title}">${title}</h1>
    ${formData.fields.map((field) => html`
        <div class="${styles.item}">
            ${html(TextField, {
                ...field,
                onChange: updateFormState
            })}
        </div>
    `)}
    ${formData.buttons.map((button) => {
        return html`
            <div class="${styles.item}" onclick="${submit.bind(this, this, button, formState)}">
                ${html(Button, button)}
            </div>
    `
    })}
</form>
`
}

export {
    Form,
}