import {html} from '../../modules/html';
import {TextFieldLabel} from '../TextFieldLabel';
import {AvatarEdit} from '../AvatarEdit';
import {Button} from '../Button';
import {getLinkPage, goTo} from '../../modules/router';
import styles from './ProfileForm.css'

function ProfileForm(profileForm, isEdit) {
    return html`
<form>
    ${profileForm.map(({type, name, label, value}) => 
        type === 'text'
            ? html(TextFieldLabel, {
                type,
                name,
                label,
                value,
                isEdit,
            })
            : html(AvatarEdit, value, label)
    )}
    ${isEdit 
        ? html`
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
            </div>`
        : html`
            <div>
                ${html(Button, {
                    label: 'Изменить данные',
                    type: 'link',
                    click: () => goTo(getLinkPage('profileEdit'))
                })}
                 ${html(Button, {
                    label: 'Изменить пароль',
                    type: 'link',
                    click: () => goTo(getLinkPage('passwordEdit'))
                })}
            </div>`
    }
</form>
`
}

export {
    ProfileForm
}
