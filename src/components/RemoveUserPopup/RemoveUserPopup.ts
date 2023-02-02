import { html } from '../../modules/html';
import { Button } from '../Button';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './RemoveUserPopup.css';

function RemoveUserPopup({
    id,
    name,
    closePopup,
}) {
    return html`
<div>
    <div class="${styles.name}">${name}</div>
    <div class="${styles.pair}">
        ${html(Button, {
            label: 'Да',
            click: () => {
                store.dispatch(actions.removeUser(id));
                closePopup();
            },
        })}
        ${html(Button, {
            label: 'Нет',
            click: closePopup,
        })}
    </div>
</div>
        `;
}

export {
    RemoveUserPopup,
};
