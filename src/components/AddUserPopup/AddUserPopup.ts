import { html } from '../../modules/html';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './AddUserPopup.css';

function AddUserPopup({
    closePopup,
}) {
    let userName = '';

    return html`
<div>
    <div class="${styles.field}">
        ${html(TextField, {
            placeholder: 'Имя пользователя',
            onChange: (value) => {
                userName = value;
            },
        })}
    </div>
    ${html(Button, {
        label: 'Добавить',
        click: () => {
            store.dispatch(actions.removeUser(userName));
            closePopup();
        },
    })}
</div>
        `;
}

export {
    AddUserPopup,
};
