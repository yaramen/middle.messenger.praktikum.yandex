import {html} from '../../modules/html';
import {Button} from '../Button';
import {File} from '../File';
import {actions, store} from '../../modules/store';
import styles from './UploadAvatarPopup.css';

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