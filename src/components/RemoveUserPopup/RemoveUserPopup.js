import styles from "./RemoveUserPopup.css";
import {html} from "../../modules/html";
import {TextField} from "../TextField";
import {Button} from "../Button";

function RemoveUserPopup(name) {
    return html`
<div>
    <div class="${styles.name}">${name}</div>
    <div class="${styles.pair}">
        ${html(Button, {
            label: 'Да',
            click: () => console.log('remove Yes')
        })}
        ${html(Button, {
            label: 'Нет',
            click: () => console.log('remove No')
        })}
    </div>
</div>
        `
}

export {
    RemoveUserPopup,
}