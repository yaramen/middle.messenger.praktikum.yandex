import {html} from "../../modules/html";
import {Popover} from "../Popover";
import {Button} from "../Button";
import {ActionList} from "../ActionList/ActionList";
import {TextField} from "../TextField";
import attachIcon from '../../icons/attach.svg';
import photoIcon from '../../icons/photo.svg';
import fileIcon from '../../icons/file.svg';
import locationIcon from '../../icons/location.svg';
import sendIcon from '../../icons/send.svg';
import styles from "./NewMessage.css"

function NewMessage() {
    return html`
 <div class="${styles.form}">
    <div class="${styles.attach}">
         ${html(Popover, {
            target: html(Button, {
                type: 'action',
                icon: attachIcon
            }),
            content: html(ActionList, [{
                icon: photoIcon,
                label: 'Фото или Видео',
                click: () => {
                }
            }, {
                icon: fileIcon,
                label: 'Файл',
                click: () => {
                }
            }, {
                icon: locationIcon,
                label: 'Локация',
                click: () => {
                }
            }]),
            type: 'top',
        })}
    </div>
    <div class="${styles.field}">
        ${html(TextField, {
            name: "message",
            placeholder: "Сообщение",
        })}
    </div>
    <div class="${styles.send}">
        ${html(Button, {
            icon: sendIcon
        })}
    </div>
</div>    
`
}

export {
    NewMessage,
}