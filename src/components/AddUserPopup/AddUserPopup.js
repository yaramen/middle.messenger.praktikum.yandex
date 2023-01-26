import styles from "./AddUserPopup.css";
import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";

function AddUserPopup() {
    return html`
<div>
    <div class="${styles.field}">
        ${html(TextField, {
            placeholder: 'Имя пользователя'
        })}
    </div>
    ${html(Button, {
        label: 'Добавить',
        click: () => console.log('add user')
    })}
</div>
        `
}

export {
    AddUserPopup,
}