import styles from "./UploadAvatarPopup.css";
import {html} from "../../modules/html";

import {Button} from "../Button";
import {actions, store} from "../../modules/store";
import {File} from "../File/File";

function UploadAvatarPopup({
    closePopup
}) {

    return html`
<div>
    <div class="${styles.field}">
        ${html(File)}
    </div>
    ${html(Button, {
        label: 'Поменять',
        click: () => {
            store.dispatch(actions.avatarUpdate())
            closePopup()
        }
    })}
</div>
        `
}

export {
    UploadAvatarPopup,
}