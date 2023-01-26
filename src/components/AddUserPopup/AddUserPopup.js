import styles from "./AddUserPopup.css";
import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";
import {actions, store} from "../../modules/store";

function AddUserPopup({
    closePopup
}) {
    let userName = '';

    return html`
<div>
    <div class="${styles.field}">
        ${html(TextField, {
            placeholder: 'Имя пользователя',
            onChange: (value) => {
                userName = value
            }
        })}
    </div>
    ${html(Button, {
        label: 'Добавить',
        click: () => {
            store.dispatchEvent(actions.removeUser(userName))
            closePopup()
        }
    })}
</div>
        `
}

export {
    AddUserPopup,
}