import { Button } from '../Button';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './RemoveUserPopup.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

function RemoveUserPopup({
    id,
    name,
    closePopup,
}) {
    return createElement(
        'div',
        {},
        createElement(
            'div',
            { className: styles.name },
            createText(name),
        ),
        createElement(
            'div',
            { className: styles.pair },
            createComponent(
                Button,
                {
                    key: 'yes',
                    label: 'Да',
                    click: () => {
                        store.dispatch(actions.removeUser(id));
                        closePopup();
                    },
                },
            ),
            createComponent(
                Button,
                {
                    key: 'no',
                    label: 'Нет',
                    click: closePopup,
                },
            ),
        ),
    );
}

export {
    RemoveUserPopup,
};
