import {html} from "../../modules/html";
import styles from "./Form.css";
import {TextField} from "../TextField";
import {Button} from "../Button";
import {goTo} from "../../router";

function Form({
    title,
    formData,
}) {
    function click(element, link) {
        goTo(link)
    }

    return html`
<form class="${styles.form}">
    <h1 class="${styles.title}">${title}</h1>
    ${formData.fields.map((field) => html`
        <div class="${styles.item}">
            ${html(TextField, field)}
        </div>
    `)}
    ${formData.buttons.map((button) => html`
        <div class="${styles.item}" onclick="${click.bind(this, this, button.link)}">
            ${html(Button, button)}
        </div>
    `)}
</form>
`
}

export {
    Form,
}