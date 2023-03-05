import { Button } from '../Button';
import styles from './ConfirmPopup.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

interface RemoveUserPopupProps {
    id: number,
    text?: string,
    closePopup: () => void
    confirm: () => void
}

function ConfirmPopup({
    id,
    text = '',
    closePopup,
    confirm,
}: RemoveUserPopupProps) {
    return createElement(
        'div',
        {
            key: id,
        },
        createElement(
            'div',
            { className: styles.name },
            createText(text),
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
                        confirm();
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
    ConfirmPopup,
};
