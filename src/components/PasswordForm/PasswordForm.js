import {html} from "../../modules/html";
import {TextFieldLabel} from "../TextFieldLabel";
import {Button} from "../Button";
import {getLinkPage, goTo} from "../../modules/router";
import styles from './PasswordForm.css'

function PasswordForm() {
    return html`
<form>
    ${html(TextFieldLabel, {
        type: 'password',
        name: 'old-password',
        label: 'Старый пароль',
    })}
     ${html(TextFieldLabel, {
        type: 'password',
        name: 'old-password',
        label: 'Новый пароль',
    })}
    ${html(TextFieldLabel, {
        type: 'password',
        name: 'old-password',
        label: 'Повторите пароль',
    })}
    <div class="${styles.pair}">
        ${html(Button, {
            label: 'Сохранить',
            click: () => {
                goTo(getLinkPage('profile'))
            }
        })}
         ${html(Button, {
            label: 'Отмена',
            click: () => goTo(getLinkPage('profile'))
        })}
    </div>
</form>
`
}

export {
    PasswordForm
}
