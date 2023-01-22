import {html} from "../../modules/html";
import styles from "./Form.css";
import {TextField} from "../TextField";
import {Button} from "../Button";

function Form({
    title,
    formData,
}) {
    return html`
<form class="${styles.form}">
    <h1 class="${styles.title}">${title}</h1>
    ${formData.fields.map((field) => html`
        <div class="${styles.item}">
            ${html(TextField, field)}
        </div>
    `)}
    ${formData.buttons.map((button) => html`
        <div class="${styles.item}">
            ${html(Button, button)}
        </div>
    `)}
</form>
`
}

export {
    Form,
}