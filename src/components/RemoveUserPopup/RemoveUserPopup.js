import styles from "./RemoveUserPopup.css";
import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";
import {actions, store} from "../../modules/store";

function RemoveUserPopup({
    id,
    name,
    closePopup
}) {
    return html`
<div>
    <div class="${styles.name}">${name}</div>
    <div class="${styles.pair}">
        ${html(Button, {
            label: 'Да',
            click: () => {
                store.dispatchEvent(actions.removeUser(id))
                closePopup()
            }
        })}
        ${html(Button, {
            label: 'Нет',
            click: closePopup
        })}
    </div>
</div>
        `
}

export {
    RemoveUserPopup,
}